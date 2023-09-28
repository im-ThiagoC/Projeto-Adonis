import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany} from '@ioc:Adonis/Lucid/Orm'
import Comment from './Comment'
import User from './User'

export default class Post extends BaseModel {
  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @column({ isPrimary: true })
  public id: number

  @column ()
  public title: string

  @column ()
  public description: string

  @column ()
  public image: string

  @belongsTo(() => User)
  public authorId: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
