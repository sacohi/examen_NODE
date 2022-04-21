const router = require('express').Router();
const dayjs = require('dayjs');

const reservaModel = require('../models/reserva.model');


router.get('/', async (req, res) => {
    const reservas = await reservaModel.getAll();

    res.render('reserva/list', { reservas });
});

router.get('/new', (req, res) => {
    res.render('reserva/form');
});


router.get('/edit/:reservaId', async (req, res) => {
    const reserva = await reservaModel.getById(req.params.reservaId);
         reserva.fecha_ida = dayjs(reserva.fecha_ida).format('YYYY-MM-DD');
        reserva.fecha_vuelta = dayjs(reserva.fecha_vuelta).format('YYYY-MM-DD');
    res.render('reserva/formEdit', { reserva })
});

router.get('/delete/:reservaId', async (req, res) => {
    const result = await reservaModel.deleteById(req.params.reservaId);
    res.redirect('/reservas');
});


router.post('/create', async (req, res) => {
    const result = await reservaModel.create(req.body);
    res.redirect('/reservas');
});


router.post('/update', async (req, res) => {
    await reservaModel.updateById(req.body.id, req.body);
    res.redirect('/reservas');
});





module.exports = router;