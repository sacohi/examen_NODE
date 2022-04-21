

const { executeQuery, executeQueryOne } = require('../helpers');
const QueryManager = require('../QueryManager');


const getAll = () => {
  const queryMg = new QueryManager('select * from paquete');
  return queryMg.executeQuery();
}

const getById = (paqueteId) => {
    return executeQueryOne('select * from paquete where id = ?', [paqueteId]);
}

const create = ({ ciudad, latitud, longitud, pais, texto_presentacion }) => {
    return executeQuery('insert into paquete (ciudad, latitud, longitud, pais, texto_presentacion) values(?, ?, ?, ?, ?)', [ciudad, latitud, longitud, pais, texto_presentacion]);
}


const updateById = (paqueteId, { ciudad, latitud, longitud, pais, texto_presentacion }) => {
  return executeQuery(
    'update paquete set ciudad = ?, latitud = ?, longitud = ?, pais = ?, texto_presentacion = ? where id = ?',
    [ciudad, latitud, longitud, pais, texto_presentacion, paqueteId]
    );
}
  

  const deleteById = (paqueteId) => {
      return executeQuery('delete from paquete where id = ?', [paqueteId]);
}
  

module.exports = {
    getAll, getById, create, deleteById, updateById
}