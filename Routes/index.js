const express = require('express');
const router = express.Router();
const auth = require('../middleweres/auth');

router.get('/', auth, (req, res) =>{
    console.log(res.locals.auth_date);
    return res.send({message: 'Essa informação é muito importante, usuários não autenticados não deveriam ter acesso!'});
});

router.post('/', (req, res) => {
    return res.send({message: 'Tudo ok com o método POST da raiz'});
});

module.exports = router;