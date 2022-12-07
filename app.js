const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require("./models/blog");
const { result } = require('lodash');
const { render } = require('ejs');
const app = express();

const dbURI = 'mongodb+srv://netninja:test1234@nodetuts.frko7ir.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.set('strictQuery', false);
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => { 
    console.log('connected to db')
    app.listen(3000);})
  .catch((err) => {console.log(err)})

app.set('view engine', 'ejs');



app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(morgan('dev'))

app.get('/', (reqest, response) => {
  response.redirect('/blogs')
});

app.get('/blogs/create', (reqest, response) => {
  response.render('create', { title: 'Create a new blog' });
});

app.get('/about', (reqest, response) => {
    response.render('about', { title: 'About' });
});

app.get('/blogs',(request, response) =>{
  Blog.find().sort({createdAt: -1})
    .then((result) => {
      response.render('index', { title: 'All Blongs', blogs: result})
    })
    .catch((error) => {
      console.log(error)
    })
})

app.post('/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save()
    .then((result) => {
      response.redirect('/blogs')
    })
    .catch((error) => {
      console.log(error)
    })
})

app.get('/blogs/:id', (request, response) => {
  const id = request.params.id;
  Blog.findById(id)
    .then((result) => {
      response.render('details', {blog: result, title: 'Blog Details'})
    })
    .catch((errors) => { 
      console.log(errors)
    })
})

app.delete('/blogs/:id', (request, response) => {
  const id = request.params.id
  Blog.findByIdAndDelete(id)
    .then((result) => {
      response.json({ redirect: '/blogs'})
    })
    .catch((error) => {
      console.log(error)
    })
})



app.use((reqest, response) => {
    response.status(404).render('404', { title: '404' });
});