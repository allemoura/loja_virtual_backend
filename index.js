const express = require('express');
const routes = require('./src/app/routes');

const app = express();

// const port = normalizePort(process.env.PORT || 3333);
const port = 3333;

app.use(express.json());

app.use(routes);

app.listen(port);

function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }