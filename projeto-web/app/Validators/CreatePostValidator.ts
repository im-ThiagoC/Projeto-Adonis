import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from 'App/Validators/BaseValidator'

export default class CreatePostValidator extends BaseValidator {
    constructor(protected ctx: HttpContextContract) {
      super()
    }
    public schema = schema.create({
        title: schema.string([
          rules.minLength(2),
          rules.maxLength(255),
          rules.trim(),
        ]),
        description: schema.string([
          rules.minLength(2),
          rules.maxLength(255),
          rules.trim(),
        ]),
        image: schema.file.optional({
            size: '4mb',
            extnames: ['jpg', 'gif', 'png'],
            }),
      })
    public messages: CustomMessages = {
    ...this.messages,
    }
}
