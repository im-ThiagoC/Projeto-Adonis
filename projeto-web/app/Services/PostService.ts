import User from 'App/Models/User'
import Post from 'App/Models/Post'

export default class UsersController {
  constructor() {}

  public async create(user: User, data: {
    title: string,
    description: string
    image: string
    userId: number
  }) {
    const post = new Post()
    post.title = data.title
    post.description = data.description
    post.image = data.image
    post.userId = user.id

    await post.save()

    return post
  }
}