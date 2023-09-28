import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'

export default class CommentsController {

    public async store({request, params, response}: HttpContextContract) {
        const body = request.body()
        const postId = params.postId
        

        body.postId = postId

        const comment = await Comment.create(body)

        response.status(201)

        return {
            message: "Comentário adicionado!",
            data: comment
        }
    }
    
    public async index() {

        const comment = await Comment.query().preload('subComments')

        return {
            data: comment
        }

    }

    public async show({ params }: HttpContextContract) {

        const comment = await Comment.findOrFail(params.id)
        await comment.load('subComments')
        return {
            data: comment
        }

    }

    

    public async destroy( { params }: HttpContextContract) {

        const comment = await Comment.findOrFail(params.id)
        await comment.delete()

        return {
            message: 'Comentario excluido com sucesso!',
            data: comment
        }
    }


}
