const { executeQuery, executeQueryOne } = require('../helpers');
const QueryManager = require('../QueryManager');


const getAll = () => {
  const queryMg = new QueryManager('select * from clientes');
  return queryMg.executeQuery();
}

const getById = (clienteId) => {
    return executeQueryOne('select * from clientes where id = ?', [clienteId]);
}

const create = ({ nombre, apellidos, direccion, telefono, fecha_nacimiento, dni_pasaporte, email }) => {
    return executeQuery('insert into clientes (nombre, apellidos, direccion, telefono, fecha_nacimiento, dni_pasaporte, email) values(?, ?, ?, ?, ?, ?, ?)', [nombre, apellidos, direccion, telefono, fecha_nacimiento, dni_pasaporte, email]);
}


const updateById = (clienteId, { nombre, apellidos, direccion, telefono, fecha_nacimiento, dni_pasaporte, email }) => {
  return executeQuery(
    'update clientes set nombre = ?, apellidos = ?, direccion = ?, telefono = ?, fecha_nacimiento = ?, dni_pasaporte = ?, email = ? where id = ?',
    [nombre, apellidos, direccion, telefono, fecha_nacimiento, dni_pasaporte, email, clienteId]
    );
}
  

  const deleteById = (clienteId) => {
      return executeQuery('delete from clientes where id = ?', [clienteId]);
}
  


module.exports = {
    getAll, getById, create, deleteById, updateById
}