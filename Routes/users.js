const express = require('express');
const router  = express.Router();
const Users   = require('../model/user');
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');


//funções auxiliares
 const createUserToken = (userId) => {
     return jwt.sign({id: userId}, config.jwt_pass, {expiresIn: config.jwt_expires_in});
 }


router.get('/', async (req, res) => {
    try{
        const users = await Users.find({});
        return res.send(users);
    }catch (err){
        return res.status(500).send({error: 'Erro na consulta de usuários'});
    }
});

router.post('/create', async (req, res) => {   
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).send({error: 'Dados insuficiente'});


    try{
        if(await Users.findOne({ email })) return res.status(400).send({ error: 'Usuário ' + email + ' já registrado!' });
        const user = await Users.create(req.body);
        user.password = undefined;
        return res.status(201).send({user, token: createUserToken(user.id)});
    }catch(err){
        return res.status(500).send({error: 'Erro ao buscar usuário'});
    }
});

router.post('/auth', async (req, res) => {
    const {email, password } = req.body;

    if(!email || !password) return res.status(400).send({error: 'Dados insuficientes!'});

    try{
        const user = await (await Users.findOne({email}).select('+password'));
        if(!user) return res.status(401).send({error: 'Usuário não registrado!'});

        const pass_ok = await bcrypt.compare(password, user.password);

        if(!pass_ok) return res.status(401).send({error: 'Senha inválida!'});

        user.password = undefined;
        
        return res.send({user, token: createUserToken(user.id)});

    }catch(err){
        if (err) return res.status(500).send({error: 'Erro ao buscar usuário!'});
    }

    Users.findOne({email}, (err, data) => {
      
        if (!data) return res.send({error: 'Usuário não registrado'});
        
        bcrypt.compare(password, data.password, (err, same) =>{
            if (!same) return res.send({error: 'Erro ao autenticar usuário!'});
            if (same)  return res.send(data); 
        });

    }).select('+password');
});


module.exports = router;