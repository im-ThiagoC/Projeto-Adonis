import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SubComment from 'App/Models/SubComment'

export default class SubCommentController {

    public async store({request, params, response}: HttpContextContract) {
        const body = request.body()
        const postId = params.postId
        const commentId = params.commentId
        
        body.commentId = commentId
        body.postId = postId

        const subComment = await SubComment.create(body)

        response.status(201)

        return {
            message: "Comentário adicionado!",
            data: subComment
        }
    }
    
    public async show({ params }: HttpContextContract) {

        const subComment = await SubComment.findOrFail(params.id)
        
        return {
            data: subComment
        }

    }

    public async index() {

        const subComment = await SubComment.all()

        return {
            data: subComment
        }

    }

    public async destroy( { params }: HttpContextContract) {

        const subComment = await SubComment.findOrFail(params.id)
        await subComment.delete()

        return {
            message: 'Comentario excluido com sucesso!',
            data: subComment
        }
    }


}
