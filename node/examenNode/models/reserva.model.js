

const { executeQuery, executeQueryOne } = require('../helpers');
const QueryManager = require('../QueryManager');


const getAll = () => {
  const queryMg = new QueryManager('select * from reserva');
  return queryMg.executeQuery();
}

const getById = (reservaId) => {
    return executeQueryOne('select * from reserva where id = ?', [reservaId]);
}

const create = ({ vuelo_ida, vuelo_vuelta, hotel, direccion, seguro_medico, fecha_ida, fecha_vuelta, clientes_id, paquete_id }) => {
    return executeQuery('insert into reserva (vuelo_ida, vuelo_vuelta, hotel, direccion, seguro_medico, fecha_ida, fecha_vuelta, clientes_id, paquete_id) values(?, ?, ?, ?, ?, ?, ?, ?, ?)', [vuelo_ida, vuelo_vuelta, hotel, direccion, seguro_medico, fecha_ida, fecha_vuelta, clientes_id, paquete_id]);
}


const updateById = (reservaId, { vuelo_ida, vuelo_vuelta, hotel, direccion, seguro_medico, fecha_ida, fecha_vuelta, clientes_id, paquete_id }) => {
  return executeQuery(
    'update reserva set vuelo_ida = ?, vuelo_vuelta = ?, hotel = ?, direccion = ?, seguro_medico = ?, fecha_ida = ?, fecha_vuelta = ?, clientes_id = ?, paquete_id = ? where id = ?',
    [vuelo_ida, vuelo_vuelta, hotel, direccion, seguro_medico, fecha_ida, fecha_vuelta, clientes_id, paquete_id, reservaId]
    );
}
  

  const deleteById = (reservaId) => {
      return executeQuery('delete from reserva where id = ?', [reservaId]);
}
  

module.exports = {
    getAll, getById, create, deleteById, updateById
}