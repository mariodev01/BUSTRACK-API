const db = require("../config/db");

const GetAll = async ()=>{
    const sql = "SELECT * FROM drivers";

    const res = await db.query(sql);
    
    return res.rows;
};


const GetById = async (id)=>{
    const sql = "SELECT * FROM drivers WHERE id = $1";

    const res = await db.query(sql,[id]);
    
    return res.rows[0];
};

const Create = async (nombre,licencia)=>{
    const sql = "INSERT INTO drivers (nombre, numero_licencia) VALUES ($1, $2) RETURNING *";
    
    const res = await db.query(sql, [nombre, licencia]);
        
    return res.rows[0];
};


const Update = async (nombre,licencia,id)=>{
    const sql = 'UPDATE drivers SET nombre = $1, numero_licencia = $2 WHERE id = $3 RETURNING *';
        
    const resultado = await db.query(sql, [nombre, licencia, id]);
    
    return resultado.rows[0]; // Devuelve el registro modificado
};

const Delete = async (id)=>{
    const sql = 'DELETE FROM drivers WHERE id = $1';
    
    const resultado = await db.query(sql, [id]);
        
    //rowCount indica cuántas filas fueron eliminadas
        
    return resultado.rowCount > 0;
};

module.exports = {
    GetAll,
    GetById,
    Create,
    Update,
    Delete,
}