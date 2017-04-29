var express = require('express')
var app = express()
var port = process.env.PORT || 8080
var todos = require('./todos.js')
var bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/', function (request, response) {
  response.json({
    welcome: 'welcome to my API!'
  })
})

app.get('/todos', function (request, response) {
  response.json(todos)
})

app.get('/todos/:id', function (request, response) {
  response.json(todos[request.params.id])
})

app.post('/todos', function (request, response) {
  var slug = request.body.title.trim().toLowerCase().split(' ').join('-')
  todos[slug] = {
    title: request.body.title.trim(),
    completed: false
  }
})

app.delete('/todos/:id', function (request, response) {
  delete todos[request.params.id]
  response.redirect('/todos')
})

app.put('/todos/:id', function (request, response) {
  var todo = todos[request.params.id]
  if (request.body.title !== undefined) {
    todo.title = request.body.title.trim()
  }
  if (request.body.completed !== undefined) {
    todo.completed = request.body.completed
  }
  response.redirect('/products')
})

app.get('/todos/:id', function (request, response) {
  if (!todos[request.params.id]) {
    response.status(404).end('sorry, no such item: ' + request.params.id)
    return
  }
  response.json(todos[request.params.id])
})

app.delete('/todos/:id', function (request, response) {
  if (!todos[request.params.id]) {
    response.status(404).end('sorry, no such item: ' + request.params.slug)
    return
  }
  response.json(todos[request.params.id])
})

app.put('/todos/:id', function (request, response) {
  if (!todos[request.params.id]) {
    response.status(404).end('sorry, no such item: ' + request.params.slug)
    return
  }
  response.json(todos[request.params.id])
})

app.listen(port)
