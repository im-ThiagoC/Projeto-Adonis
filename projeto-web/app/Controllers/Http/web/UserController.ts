import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserService from 'App/Services/UserService'
import { v4 as uuidv4 } from 'uuid'
import session from 'Config/session'

export default class UsersController {
  private validationOptions = {
    types: ["image"],
    size: "4mb"
  }

  public async index({ view }: HttpContextContract) {
    const users = await User.all()

    return view.render('user/index', { users: users })
  }

  public async destroy({ view, params }: HttpContextContract) {
    const username = params.username
    const user = await User.findByOrFail('username', username)
    await user.delete()

    return view.render('auth/register')
  }

  public async update({ params, view, auth }: HttpContextContract) {
    const username = params.username
    const user = await User.findByOrFail('username', username)

    return view.render('user/update', { user: user})
  }

  public async patch({ request, response, params}: HttpContextContract) {
    const username = params.username
    const user = await User.findByOrFail('username', username)
    const name = request.input('name')
    const email = request.input('email')
    const password = request.input('password')
    const newUsername = request.input('username')

    if(user.username != newUsername){
      const userExists = await User.findBy('username', newUsername)
      if(userExists){
        return response.status(400).send('Username já está sendo utilizado')
        return response
      }
    }
    if(user.email != email){
      const emailExists = await User.findBy('email', email)
      if(emailExists){
        return response.status(400).send('Email já está sendo utilizado')
      }
    }
    user.name = name ? name : user.name
    user.password = password ? password : user.password

    await user.save()

    return response.redirect().toRoute('users.show', { username: user.username })
  }

  public async show({ params, view }: HttpContextContract) {
    const username = params.username
    const user = await User.findByOrFail('username', username)

    return view.render('user/show', { user: user})
  }

  public async registerShow({ view }: HttpContextContract) {
    return view.render('auth/register')
 }
 
 public async register({ request, response, auth }: HttpContextContract) {
    const name = request.input('name')
    const email = request.input('email')
    const password = request.input('password')
    const username = request.input('username')


    if (!name || !email || !password || !username) {
    response.status(400)
    return response
    }
    
    const userService = new UserService()
    const user = await userService.create(name, email, username, password)

    await auth.login(user)

    return response.redirect().toRoute('home.index')
  }

  public async login({ request, response, auth, session }: HttpContextContract) {
    const {uid, password} = request.only(['uid', 'password'])

    try {
        await auth.attempt(uid, password)
    } catch (error){
        session.flash('form', 'Credenciais incorretas')
        return response.redirect().back()
    }

    return response.redirect().toRoute('home.index')
      
  }

 public async loginShow({ view }: HttpContextContract) {
      return view.render('auth/login')
   }

  public async logout({ auth, response }: HttpContextContract) {
      await auth.logout()
      return response.redirect().toRoute('auth.login.show')
  }
}