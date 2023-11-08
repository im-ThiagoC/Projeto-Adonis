import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/UserService'

export default class AuthController {
   public async registerShow({ view }: HttpContextContract) {
      return view.render('auth/register')
   }
   
   public async register({ request, response, auth }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')
        const username = request.input('username')

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
        return response.redirect().toRoute('home.index')
    }
}
