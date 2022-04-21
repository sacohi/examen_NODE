const http = require('http');
const app = require('../app');

const server = http.createServer(app);



server.listen(3000);

server.on('listening', () => {
  console.log('El servidor está escuchando en el puerto ' + process.env.DB_PORT);
});