import Application from '@ioc:Adonis/Core/Application'
import type { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import { v4 as uuidv4 } from 'uuid'

import File from 'App/Models/File'

export default class FileService {
  constructor() {}

  public async create(data: MultipartFileContract) {
    const file = new File()
    file.fileName = `${uuidv4()}.${data.extname}`
    await data.move(Application.tmpPath('uploads'), {
        name: data.fileName
    })
    
    await file.save()

    return file
  }
}