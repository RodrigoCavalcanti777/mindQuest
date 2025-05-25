
const express = require('express');
const router = express.Router();

const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const bcrypt = require('bcryptjs');


router.post('/login', async (req,res) => {

        const {username, password} = req.body;

        try {
       
        const existentUser = await prisma.user.findUnique({
            where: {username}
        })

        if(!existentUser){
            res.status(404).json({
                message: 'Usuario não existente, Por favor Cadastre-se'
            })
        }

        const comparePassword = await bcrypt.compare(password, existentUser.password)

        
        if (!comparePassword) {
        return res.status(401).json({ message: 'Senha incorreta' });
        }


        return res.status(200).json({ message: 'Login realizado com sucesso', userId: existentUser.id });

        } catch (error) {
        console.log('Erro ao realizar login', error)
        return res.status(500).json({ message: 'Falha ao realizar login', error });

        }
});


module.exports = router;
