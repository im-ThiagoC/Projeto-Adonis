import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, HasMany, beforeSave, column, hasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Post from './Post'
import File from './File'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string
  
  @column()
  public email: string

  @column()
  public username: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  @column()
  public avatar: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (auth: User) {
    if (auth.$dirty.password) {
      auth.password = await Hash.make(auth.password)
    }
  }
}
