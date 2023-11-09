
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import User from 'App/Models/User'
import PostService from 'App/Services/PostService'
import Application from '@ioc:Adonis/Core/Application'

import { v4 as uuidv4 } from 'uuid'
import CreatePostValidator from 'App/Validators/CreatePostValidator'

export default class PostsController {
    private validationOptions = {
        types: ["image"],
        size: "4mb"
    }

    public async index ({ view }: HttpContextContract) {
        const posts = await Post.all()

        return view.render('posts/index', { posts: posts})
    }

    public async show({ params, view }: HttpContextContract) {
        const post = await Post.findOrFail(params.id)
    
        return view.render('posts/show', { post: post })
      }

    public async create ({ view }: HttpContextContract) {
        return view.render('posts/create')
    }

    public async store ({ request, response, auth }: HttpContextContract) {
        const payload = await request.validate(CreatePostValidator)

        const image = request.file('image', this.validationOptions)
        let imageName = ''
        if (image) {
            imageName = `${uuidv4()}.${image.extname}`
            await image.move(Application.tmpPath('uploads'), {
                name: imageName
            })
        }

        const postService = new PostService()
        const post = await postService.create(auth.user!, 
        {
            title: payload.title,
            description: payload.description,
            image: `uploads/${imageName}`
        })

        post.save()
        response.status(201)

        return response.redirect().toRoute('posts.show', { id: post.id })
    }

    public async update ({ params, request, response, auth }: HttpContextContract) {
        const post = await Post.findOrFail(params.id)
        const author = await User.findOrFail(post.authorId)
        const data = request.only(['title', 'description'])

        if (author.id !== auth.user?.id) {
            response.status(401)
            return response
        }

        post.merge(data)

        await post.save()

        return response.redirect().toRoute('posts/show', { id: post.id })
    }

    public async destroy ({ params, response }: HttpContextContract) {
        const post = await Post.findOrFail(params.id)

        await post.delete()

        return response.redirect().toRoute('posts/index')
    }
}
