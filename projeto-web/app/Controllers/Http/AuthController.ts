import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateAuthValidator from 'App/Validators/CreateAuthValidator'
import Application from '@ioc:Adonis/Core/Application'
import { v4 as uuidv4 } from 'uuid'

export default class AuthController {
    public async registerShow({ view }: HttpContextContract) {
        return view.render('auth/register')
    }
   
    public async register({ request, response, auth, session }: HttpContextContract) {

        const payload = await request.validate(CreateAuthValidator)

        try {
            await auth.use('web').attempt(payload.email, payload.password)
            return response.redirect().toRoute('home.index')
        }
        catch (error) {
            session.flashOnly(['email'])
            session.flash({ errors: { login: 'Não encontramos nenhuma conta com essas credenciais.' } })
            return response.redirect().back()
        }
        
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
