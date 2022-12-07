const express = require('express');
const morgan = require('morgan')
const app = express();



app.set('view engine', 'ejs');

app.listen(3000);

app.use(morgan('dev'))

app.get('/', (reqest, response) => {
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  response.render('index', { title: 'Home', blogs });
});


app.get('/about', (reqest, response) => {
    response.render('about', { title: 'About' });
});

app.get('/blogs/create', (reqest, response) => {
    response.render('create', { title: 'Create a new blog' });
});

app.use((reqest, response) => {
    response.status(404).render('404', { title: '404' });
});