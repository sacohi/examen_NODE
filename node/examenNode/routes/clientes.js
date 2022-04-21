const router = require('express').Router();
const dayjs = require('dayjs');

const clienteModel = require('../models/cliente.model');


router.get('/', async (req, res) => {
  const clientes = await clienteModel.getAll();

    res.render('clientes/list', { clientes });
});


router.get('/new', (req, res) => {
    res.render('clientes/form');
});

router.get('/edit/:clienteId', async (req, res) => {
    const cliente = await clienteModel.getById(req.params.clienteId);
    cliente.fecha_nacimiento = dayjs(cliente.fecha_nacimiento).format('YYYY-MM-DD');
    res.render('clientes/formEdit', { cliente })
});


router.get('/delete/:clienteId', async (req, res) => {
    const result = await clienteModel.deleteById(req.params.clienteId);
    res.redirect('/clientes');
});


router.post('/create', async (req, res) => {
    const result = await clienteModel.create(req.body);
    res.redirect('/clientes');
});


router.post('/update', async (req, res) => {
    await clienteModel.updateById(req.body.id, req.body);
    res.redirect('/clientes');
});





module.exports = router;

