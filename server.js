var express = require('express')
var app = express()
var port = process.env.PORT || 8080
var todos = require('./todos.js')
var bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/', function (request, response) {
  response.json({
    welcome: 'welcome to Manotej Meka API!'
  })
})

app.get('/todos', function (request, response) {
  response.json(todos)
})

app.get('/todos/:id', function (request, response) {
  if (!todos[request.params.id]) {
    response.status(404).end('sorry, no such item to get; ' + request.params.id)
    return
  }
  response.json(todos[request.params.id])
})


app.post('/todos', function (request, response) {
  var slug = request.body.title.trim().toLowerCase().split(' ').join('-')
  todos[slug] = {
    title: request.body.title.trim(),
    completed: request.body.completed.trim()
  }
  response.redirect('/todos')
})

app.delete('/todos/:id', function (request, response) {
  if (!todos[request.params.id]) {
    response.status(404).end('sorry, no such item to delete; ' + request.params.slug)
    return
  }
  delete todos[request.params.id]
  response.redirect('/todos')
})

app.put('/todos/:id', function (request, response) {
  if (!todos[request.params.id]) {
    response.status(404).end('sorry, no such item to update; ' + request.params.slug)
    return
  }
  var todo = todos[request.params.id]
  if (request.body.title !== undefined) {
    todo.title = request.body.title.trim()
  }
  if (request.body.completed !== undefined) {
    todo.completed = request.body.completed
  }
  response.redirect('/todos')
})

app.listen(port)
