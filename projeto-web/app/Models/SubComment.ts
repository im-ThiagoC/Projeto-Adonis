import { DateTime } from 'luxon'
import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class SubComment extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public text: string

  @column()
  public commentId: number

  @column()
  public postId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
