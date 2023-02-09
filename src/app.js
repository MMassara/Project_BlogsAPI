const express = require('express');
const validateInputLogin = require('./middlewares/validateInputLogin');
const { loginController, 
    userController, 
    categoryController, 
    postsController } = require('./controllers');
const validateInputCreate = require('./middlewares/validateInputCreate');
const validateEmailCreate = require('./middlewares/validateEmailCreate');
const authToken = require('./middlewares/authToken');
const validateInputName = require('./middlewares/validateInputName');
const validateNewPost = require('./middlewares/validateNewPost');
const validatePost = require('./middlewares/validatePost');

// ...

const app = express();

app.use(express.json());

app.get('/post/search', authToken, postsController.getPostByTitle);
app.get('/post', authToken, postsController.getAll);
app.get('/post/:id', authToken, postsController.getPostByOwnerId);
app.put('/post/:id', authToken, postsController.updatePost);
app.post('/post', authToken, validateNewPost, postsController.create);
app.delete('/post/:id', authToken, validatePost, postsController.deleteById);

app.post('/user', 
validateInputCreate, 
validateEmailCreate, 
loginController.create);
app.get('/user', authToken, userController.getAll);
app.get('/user/:id', authToken, userController.getUserById);
app.delete('/user/me', authToken, userController.removeUserById);

app.post('/login', 
validateInputLogin, 
loginController.sucessLogin);

app.post('/categories', 
authToken, 
validateInputName, 
categoryController.create);
app.get('/categories', authToken, categoryController.getAll);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
