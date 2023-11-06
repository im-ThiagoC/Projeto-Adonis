import User from 'App/Models/User'

export default class UsersController {
  constructor() {}

  public async create(email: string, username: string, password: string) {
    const user = await User.create({
      password,
      email,
      username,
    })

    return user
  }
}