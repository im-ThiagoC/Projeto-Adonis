import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import UserService from 'App/Services/UserService'

export default class UsersController {
  public async index({ view }: HttpContextContract) {
    const users = await User.all()

    return view.render('user/index', { users: users })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('user/create')
  }

  public async destroy({ view, params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user.delete()

    return view.render('index')
  }

  public async update({ request, params, view }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    const username = request.input('username')
    const password = request.input('password')

    user.password = password ? password : user.password
    user.username = username ? username : user.username

    await user.save()

    return view.render('user/update', { user: user })
  }

  public async store({ request, response, view }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const username = request.input('username')

    if (!email || !password || !username) {
      response.status(400)
      return response
    }

    const userService = new UserService()
    const user = await userService.create(email, username, password)

    return view.render('user/show', { user: user })
  }

  public async show({ params, view }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    return view.render('user/show', { user: user })
  }

  public async patch({ request, params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    const username = request.input('username')
    const password = request.input('password')

    user.password = password ? password : user.password
    user.username = username ? username : user.username

    await user.save()

    return response.redirect().toRoute('users.show', { id: user.id })
  }
}