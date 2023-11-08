
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
    
        await post.load('user')
    
        return view.render('posts/show', { post: post })
      }

    public async create ({ view }: HttpContextContract) {
        return view.render('posts/create')
    }

    public async store ({ request, response }: HttpContextContract) {
        const payload = await request.validate(CreatePostValidator)
        const user = await User.findOrFail(1)

        const image = request.file('image', this.validationOptions)

        const postService = new PostService()
        let imageName = ''
        if (image) {
            imageName = `${uuidv4()}.${image.extname}`
            await image.move(Application.tmpPath('uploads'), {
                name: imageName
            })
        }
        const post = await postService.create(user, {
            title: payload.title,
            description: payload.description,
            image: imageName
        })

        response.status(201)

        return response.redirect().toRoute('posts.show', { id: post.id })
    }

    public async update ({ params, request, response }: HttpContextContract) {
        const post = await Post.findOrFail(params.id)

        const data = request.only(['title', 'description'])

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
