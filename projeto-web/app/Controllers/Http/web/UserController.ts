import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import UserService from 'App/Services/UserService'

export default class UsersController {
  /*public async index({}: HttpContextContract) {
    const users = await User.all()

    return users
  }*/

  public async index({ view }: HttpContextContract) {
    return view.render('user/create')
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user.delete()

    return null
  }

  public async update({ request, params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    const email = request.input('email', undefined)
    const username = request.input('username', undefined)
    const password = request.input('password', undefined)

    user.email = email ? email : user.email
    user.password = password ? password : user.password
    user.username = username ? username : user.username

    await user.save()

    return user
  }

  public async store({ request, response }: HttpContextContract) {
    const email = request.input('email', undefined)
    const password = request.input('password', undefined)
    const username = request.input('username', undefined)

    if (!email || !password || !username) {
      response.status(400)
      return response
    }

    const userService = new UserService()
    const user = await userService.create(email, username, password)

    return user
  }

  public async show({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    return user
  }
}