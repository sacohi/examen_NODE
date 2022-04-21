const router = require('express').Router();

const reservaModel = require('../../models/reserva.model');



router.get('/', async (req, res) => {
    const reservas = await reservaModel.getAll();
    res.json(reservas);
});



router.get('/:reservaId', (req, res) => {
    const reservaId = req.params.reservaId;
  
    reservaModel.getById(reservaId)
        .then(reserva => {
            if (!reserva) return res.json({ error: 'La reserva no existe' });
            res.json(reserva)
        })
        .catch(err => res.json({ error: err.message }));
});




router.post('/', async (req, res) => {
    try {
        const result = await reservaModel.create(req.body);
        const reserva = await reservaModel.getById(result.insertId);

        res.json(reserva);
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.put('/:reservaId', async (req, res) => {
    try {
        const result = await reservaModel.updateById(req.params.reservaId, req.body);
        const reserva = await reservaModel.getById(req.params.reservaId);

        res.json(reserva);
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.delete('/:reservaId', (req, res) => {
    reservaModel.deleteById(req.params.reservaId)
        .then(reserva => {
            if (reserva.affectedRows === 1) {
                res.json({ mensaje: 'Se ha borrado la reserva' });
            } else {
                res.json({ mensaje: 'La reserva no existe' });
            }
        })
        .catch(err => {
            res.json({ error: err.message });
        });
})







module.exports = router;