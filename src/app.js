const express = require('express');
const validateInputLogin = require('./middlewares/validateInputLogin');
const { loginController, userController } = require('./controllers');
const validateInputCreate = require('./middlewares/validateInputCreate');
const validateEmailCreate = require('./middlewares/validateEmailCreate');
const authToken = require('./middlewares/authToken');
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

app.get('/user', authToken, userController.getAll);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
