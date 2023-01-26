const express = require('express');
const validateInputLogin = require('./middlewares/validateInputLogin');
const { loginController } = require('./controllers');

// ...

const app = express();

app.use(express.json());

app.get('/login', (req, res) => res.end());
app.post('/login', 
validateInputLogin, 
loginController.sucessLogin);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
