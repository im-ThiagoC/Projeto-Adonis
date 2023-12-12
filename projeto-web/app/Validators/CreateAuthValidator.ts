import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from 'App/Validators/BaseValidator'

export default class CreateAuthValidator extends BaseValidator {
    constructor(protected ctx: HttpContextContract) {
        super()
    }

  public schema = schema.create({
    email: schema.string({}, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),

    username: schema.string({}, [
        rules.minLength(4),
        rules.maxLength(20),
        rules.unique({ table: 'users', column: 'username' }),
    ]),
    
    password: schema.string({}, [
      rules.minLength(4),
      rules.maxLength(20),
    ]),

    name: schema.string({}, [
        rules.minLength(4),
        rules.maxLength(20),
    ]),

    avatar: schema.file.optional({
        size: '4mb',
        extnames: ['jpg', 'gif', 'png', 'webp'],
    }),
  })

  public messages = {
    required: 'Preencha o campo',
    'email.required': 'O campo de e-mail é obrigatório',
    'email.email': 'Informe um e-mail válido',
    'email.unique': 'Este e-mail já está em uso',
    'password.required': 'O campo de senha é obrigatório',
    'password.minLength': 'A senha deve ter no mínimo 8 caracteres',
    'password.maxLength': 'A senha deve ter no máximo 20 caracteres',
    'username.minLength': 'Username deve ter pelo menos 3 letras',
    'username.maxLength': 'Username não pode ter mais de 15 letras',
    'username.unique': 'Username já cadastrado',
  }
}
