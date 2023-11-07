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

/*Route.group(() => {

  Route.resource("/users", "api/UserController").apiOnly()
  Route.resource("/posts", "api/PostsController").apiOnly()
  Route.resource("/posts/:postId/comments", "api/CommentsController").apiOnly()
  Route.resource("/posts/:postId/comments/:commentId/subcomments", "api/SubCommentController").apiOnly()
  
}).prefix("/api")

Route.group(() => {

  Route.resource("/users", "web/UserController").apiOnly()
  Route.resource("/posts", "web/PostsController").apiOnly()
  Route.resource("/posts/:postId/comments", "web/CommentsController").apiOnly()
  Route.resource("/posts/:postId/comments/:commentId/subcomments", "web/SubCommentController").apiOnly()
  
}).prefix("/web")
*/

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'UserController.index').as('index')
    Route.delete('/:id', 'UserController.destroy').as('destroy')
    Route.get('/new', 'UserController.create').as('create')
    Route.post('/', 'UserController.store').as('store')
    Route.get('/:id/update', 'UserController.update').as('update')
    Route.patch('/:id', 'UserController.patch').as('patch')
    Route.get('/:id', 'UserController.show').as('show')
  })
    .prefix('/users')
    .as('users')

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
}).namespace('App/Controllers/Http/Web')