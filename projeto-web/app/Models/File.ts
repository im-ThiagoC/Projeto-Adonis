
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import Application from '@ioc:Adonis/Core/Application'
import fs from 'fs'
import path from 'path'

export default class File extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fileName: string

  @column()
  public createdAt: Date

  @column()
  public updatedAt: Date

  public get stream() {
    return fs.createReadStream(path.join(Application.tmpPath('uploads'), this.fileName))
  }
}

