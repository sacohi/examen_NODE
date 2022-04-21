const router = require('express').Router();

const paqueteModel = require('../../models/paquete.model');



router.get('/', async (req, res) => {
  const paquetes = await paqueteModel.getAll();
  res.json(paquetes);
})


// router.get('/', (req, res) => {
//     paqueteModel.getAll().then((result) => {
//         res.json(result);
//     }).catch((err) => {
//         res.json({ error: err.message });
//     });
// });



router.get('/:paqueteId', (req, res) => {
    const paqueteId = req.params.paqueteId;
  
    paqueteModel.getById(paqueteId)
        .then(paquete => {
            if (!paquete) return res.json({ error: 'El paquete no existe' });
            res.json(paquete)
        })
        .catch(err => res.json({ error: err.message }));
});




router.post('/', async (req, res) => {
    try {
        const result = await paqueteModel.create(req.body);

        const paquete = await paqueteModel.getById(result.insertId);
        res.json(paquete);
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.put('/:paqueteId', async (req, res) => {
    try {
        const result = await paqueteModel.updateById(req.params.paqueteId, req.body);
        const paquete = await paqueteModel.getById(req.params.paqueteId);
        res.json(paquete);
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.delete('/:paqueteId', (req, res) => {
    paqueteModel.deleteById(req.params.paqueteId)
        .then(paquete => {
            if (paquete.affectedRows === 1) {
                res.json({ mensaje: 'Se ha borrado el paquete' });
            } else {
                res.json({ mensaje: 'El paquete no existe' });
            }
        })
        .catch(err => {
            res.json({ error: err.message });
        });
})







module.exports = router;