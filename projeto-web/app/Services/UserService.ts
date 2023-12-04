import User from 'App/Models/User'

export default class UsersController {
  constructor() {}

  public async create(name: string, email: string, username: string, password: string, avatar:string) {
    const user = await User.create({
      name,
      password,
      email,
      username,
      avatar,
    })

    return user
  }
}