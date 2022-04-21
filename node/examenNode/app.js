const express = require('express');
const path = require('path');
const cors = require('cors');
const createError = require('http-errors');

const apiRouter = require('./routes/api');
const clientesRouter = require('./routes/clientes');
const paquetesRouter = require('./routes/paquetes');
const reservasRouter = require('./routes/reservas');


require('dotenv').config();

require('./dbConfig');


const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api', apiRouter);
app.use('/clientes', clientesRouter);
app.use('/paquetes', paquetesRouter);
app.use('/reservas', reservasRouter);


app.get('/', (req, res) => {
  res.send('Agencia de Viajes desde la BBDD MySQL');
});



app.use(function (req, res, next) {
  next(createError(404));
});


app.use(function (err, req, res, next) {
 
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;