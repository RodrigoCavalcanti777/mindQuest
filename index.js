const express = require('express');
const app = express();
const port = 8080;
app.use(express.json());



const createUser = require('../mindQuest/controllers/user');
const login = require('../mindQuest/controllers/login');

app.use(createUser);
app.use(login);

app.listen(port, () =>{

        try {
            console.log('Servidor Iniciado na porta ', port)
        } catch (error) {
            console.log(error);
        }
})