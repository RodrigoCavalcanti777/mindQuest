const express = require('express');
const app = express();
const port = 8080;
app.use(express.json());



const createUser = require('../mindQuest/controllers/user');

app.use(createUser);

app.listen(port, () =>{

        try {
            console.log('Servidor Iniciado na porta ', port)
        } catch (error) {
            console.log(error);
        }
})