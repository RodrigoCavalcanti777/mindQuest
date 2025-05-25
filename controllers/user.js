
const express = require('express');
const router = express.Router();

const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const bcrypt = require('bcryptjs');

router.post('/createUser',async (req,res) =>{
 
    const {username, password} = req.body;


    const userAlreadyExist = await prisma.user.findUnique({
        where: {username}
    });

    if(userAlreadyExist){
        res.status(400).json({
            mensagem: 'Usuario já cadastrado na aplicação'
        })
    }

    //realização da criação de um usuario na aplicação

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        });

        res.status(201).json({
            usuario: newUser,
            mensagem: 'User Criado com sucesso'
        })
    } catch (error) {
        
        res.status(400).json({
            mensagem: 'Erro ao Criar usuario na aplicacao',
            erro: error.message
        })
    }


  

})

module.exports = router;
 