const drivers = require("../Data/Drivers");
const db = require("../config/db");

const getAllDrivers = async ()=>{
    const sql = "select * from drivers";

    const resultado = await db.query(sql);

    return resultado.rows;
};

const getDriverById  = async (id) =>{
    const sql = "select * from drivers WHERE id = $1";
    
    const valores = [id];

    const resultado = await db.query(sql, valores);
    if (resultado.rowCount <=0) {
        throw new Error("No existe conductor/a con ese Id");
    }

    return resultado.rows[0];
};

const createDriver = async (driverBody) =>{
    const exists = drivers.find(d => d.NumeroLicencia === driverBody.license);

    if (!driverBody || Object.keys(driverBody).length === 0) {
        throw new Error("Request body cannot be empty.");
    };

    if (exists) {
        throw new Error("La licencia ya existe");
    };

    if(driverBody.nombre === "" || driverBody.nombre === " " || driverBody.nombre.length <= 0){
        throw new Error("Nombre no puede estar vacio");
    };

    if(driverBody.license === "" || driverBody.license === " " || driverBody.license.length <= 0){
        throw new Error("Licencia no puede estar vacio");
    };

    const sql = "INSERT INTO drivers (nombre, numero_licencia) VALUES ($1, $2) RETURNING *";
    const valores = [driverBody.nombre, driverBody.license];

    // RETURNING * devuelve el registro recién creado con su ID generado
    const resultado = await db.query(sql, valores);
    
    return resultado.rows[0];
};

const Update = async (id,driverBody) =>{
    const driver = await getDriverById(id);

    if (!driverBody || Object.keys(driverBody).length === 0) {
        throw new Error("Request body cannot be empty.");
    };

    if(driverBody.nombre === "" || driverBody.nombre === " " || driverBody.nombre.length <= 0){
        throw new Error("Nombre no puede estar vacio");
    };

    if(driverBody.license === "" || driverBody.license === " " || driverBody.license.length <= 0){
        throw new Error("Licencia no puede estar vacio");
    };

    const existeLicencia = drivers.find(d=>d.NumeroLicencia === driverBody.license);

    if (existeLicencia){
        throw new Error("Ya existe un conductor con esa licencia");
    };

    const sql = 'UPDATE drivers SET nombre = $1, numero_licencia = $2 WHERE id = $3 RETURNING *';
    const valores = [driverBody.nombre,driverBody.license, id];

    const resultado = await db.query(sql, valores);
    return resultado.rows[0]; // Devuelve el registro modificado
};

const Delete = async (id) =>{
    const sql = 'DELETE FROM drivers WHERE id = $1';
    const valores = [id];

    const resultado = await db.query(sql, valores);
    
    //rowCount indica cuántas filas fueron eliminadas
    
    return resultado.rowCount > 0;
};

module.exports = {
    getAllDrivers,
    getDriverById,
    createDriver,
    Update,
    Delete
}