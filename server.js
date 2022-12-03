const http = require('http');
const fs = require('fs');
const server = http.createServer((request, response) => {
    console.log(request.url, request.method)

    let path = './views/';
  switch(request.url) {
    case '/':
      path += 'index.html';
      response.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      response.statusCode = 200;
      break;
    case '/about-us':
        response.statusCode = 301;
        response.setHeader('Location', '/about');
        response.end();
      break;
    default:
      path += '404.html';
      response.statusCode = 404;
  }

    response.setHeader('Content-Type', 'text/html')
    fs.readFile(path, (error, data) => {
        if(error){
            console.log(error)
            response.end()
        }
        else{
            //response.write()
            response.end(data)
        }
    })
})

server.listen(3000, 'localhost', () => {
    console.log("listening for requests on port 3000")
})