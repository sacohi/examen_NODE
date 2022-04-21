const router = require('express').Router();

const paqueteModel = require('../models/paquete.model');



router.get('/', async (req, res) => {
    const paquetes = await paqueteModel.getAll();
    res.render('paquete/list', { paquetes });
});


router.get('/new', (req, res) => {
    res.render('paquete/form');
});


router.get('/edit/:paqueteId', async (req, res) => {
    const paquete = await paqueteModel.getById(req.params.paqueteId);
   
    res.render('paquete/formEdit', { paquete })
});

router.get('/delete/:paqueteId', async (req, res) => {
    const result = await paqueteModel.deleteById(req.params.paqueteId);
    res.redirect('/paquetes');
});


router.post('/create', async (req, res) => {
    const result = await paqueteModel.create(req.body);
    res.redirect('/paquetes');
});


router.post('/update', async (req, res) => {
    await paqueteModel.updateById(req.body.id, req.body);
    res.redirect('/paquetes');
});






module.exports = router;