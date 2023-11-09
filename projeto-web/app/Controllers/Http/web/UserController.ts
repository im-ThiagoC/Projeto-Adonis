import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import User from 'App/Models/User'
import UserService from 'App/Services/UserService'
import { v4 as uuidv4 } from 'uuid'

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
    const user = await User.findOrFail(params.id)
    await user.delete()

    return view.render('index')
  }

  public async update({ request, response, auth}: HttpContextContract) {
    const user = auth.user!
    user.username = request.input('username')

    const avatar = request.file('image', this.validationOptions)
    if (avatar) {
        const imageName = `${uuidv4()}.${avatar.extname}`
        await avatar.move(Application.publicPath('profile'), {
            name: imageName
        })
        user.avatar = `profile/${imageName}`
    }
    await user?.save()
    return response.redirect(`/${user.username}`)
  
  }

  /*public async store({ request, response, view }: HttpContextContract) {
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
  }*/

  public async show({ params, view }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    return view.render('user/show', { user: user })
  }

  public async registerShow({ view }: HttpContextContract) {
    return view.render('auth/register')
 }
 
 public async register({ request, response, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const username = request.input('username')


    if (!email || !password || !username) {
    response.status(400)
    return response
    }
    
    const userService = new UserService()
    const user = await userService.create(email, username, password)

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