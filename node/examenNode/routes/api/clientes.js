const router = require('express').Router();

const clienteModel = require('../../models/cliente.model');


router.get('/', async (req, res) => {
  const clientes = await clienteModel.getAll();
    res.json(clientes);
 
})


router.get('/:clienteId', (req, res) => {
    const clienteId = req.params.clienteId;
  
    clienteModel.getById(clienteId)
        .then(cliente => {
            if (!cliente) return res.json({ error: 'El cliente no existe' });
            res.json(cliente)
        })
        .catch(err => res.json({ error: err.message }));
});



router.post('/', async (req, res) => {
    try {
        const result = await clienteModel.create(req.body);
        const cliente = await clienteModel.getById(result.insertId);

        res.json(cliente);
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.put('/:clienteId', async (req, res) => {
    try {
        const result = await clienteModel.updateById(req.params.clienteId, req.body);
        const cliente = await clienteModel.getById(req.params.clienteId);


        res.json(cliente);
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.delete('/:clienteId', (req, res) => {
    clienteModel.deleteById(req.params.clienteId)
        .then(cliente => {
            if (cliente.affectedRows === 1) {
                res.json({ mensaje: 'Se ha borrado el cliente' });
            } else {
                res.json({ mensaje: 'El cliente no existe' });
            }
        })
        .catch(err => {
            res.json({ error: err.message });
        });
})







module.exports = router;