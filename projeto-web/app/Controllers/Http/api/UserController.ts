import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class UsersController {
    public async create({ view }: HttpContextContract) {
        return view.render('users/create')
      }
      
    public async index({}: HttpContextContract) {
        const users = await User.all()
        return users
    }

    public async destroy({ params }: HttpContextContract) {
        const user = await User.findOrFail(params.id)
        await user.delete()

        return null
    }


    public async update({ request, params }: HttpContextContract) {
        const user = await User.findOrFail(params.id)

        const email = request.input('email')
        const username = request.input('username')  
        const password = request.input('password')

        user.email = email ? email : user.email
        user.password = password ? password : user.password
        user.username = username ? username : user.username

        await user.save()

        return user
    }

    public async store({ request, response }: HttpContextContract) {
        const email = request.input('email')
        const username = request.input('username')
        const password = request.input('password')

        if(!email || !password || !username) {
            response.status(400)
            return response
        }

        const user = await User.create({
            password,
            username,
            email,
        })

        return user
    }

    public async show({ params }: HttpContextContract) {
        const user = await User.findOrFail(params.id)

        return user
    }
}