/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('index')
}).as('home.index')

Route.group(() => {

  Route.group(() => {
    Route.get('/', 'PostsController.index').as('index')
    Route.get('/new', 'PostsController.create').as('create')
    Route.post('/', 'PostsController.store').as('store')
    Route.get('/:id/update', 'PostsController.update').as('update')
    Route.patch('/:id', 'PostsController.patch').as('patch')
    Route.get('/:id', 'PostsController.show').as('show')
  })
    .prefix('/posts')
    .as('posts')

  Route.group(() => {
    //Testes pro Postman
    Route.get('/', 'UserController.index').as('index')
    Route.delete('/:username', 'UserController.destroy').as('destroy')
    Route.get('/:username/delete', 'UserController.delete').as('delete')
    Route.post('/', 'UserController.store').as('store')
    Route.get('/:username/update', 'UserController.update').as('update')
    Route.patch('/:username', 'UserController.patch').as('patch')
    Route.get('/:username', 'UserController.show').as('show')
  })
    .prefix('/users')
    .as('users')

  //Autenticacao

  //Registra Usuario
  Route.get('register' , 'UserController.registerShow').as('auth.register.show')
  Route.post('register', 'UserController.register').as('auth.register')
  //Loga Usuario
  Route.post('login' , 'UserController.login').as('auth.login')
  Route.get('login' , 'UserController.loginShow').as('auth.login.show')
  //Desloga Usuario
  Route.get('logout' , 'UserController.logout').as('auth.logout')

}).namespace('App/Controllers/Http/Web')

