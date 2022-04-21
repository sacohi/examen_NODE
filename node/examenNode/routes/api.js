const router = require('express').Router();


const clientesApiRouter = require('./api/clientes');
const paquetesApiRouter = require('./api/paquetes');
const reservasApiRouter = require('./api/reservas');


router.use('/clientes', clientesApiRouter);
router.use('/paquetes', paquetesApiRouter);
router.use('/reservas', reservasApiRouter);



module.exports = router;