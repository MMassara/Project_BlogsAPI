const express = require('express');
const validateInputLogin = require('./middlewares/validateInputLogin');
const { loginController } = require('./controllers');
const validateInputCreate = require('./middlewares/validateInputCreate');
const validateEmailCreate = require('./middlewares/validateEmailCreate');

// ...

const app = express();

app.use(express.json());

app.post('/user', 
validateInputCreate, 
validateEmailCreate, 
loginController.create);

app.post('/login', 
validateInputLogin, 
loginController.sucessLogin);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
