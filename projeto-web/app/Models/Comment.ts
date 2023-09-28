import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import SubComment from './SubComment'

export default class Comment extends BaseModel {
  @hasMany(() => SubComment)
  public subComments: HasMany<typeof SubComment>

  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public text: string

  @column()
  public postId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
