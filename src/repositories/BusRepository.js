const db = require("../config/db");

const GetAll = async()=>{
    const sql = "SELECT * FROM buses;"
    
    const res = await db.query(sql);
    
    return res.rows;
};

const GetById = async (id)=>{
    const sql = "SELECT * FROM buses where id = $1";
        
    const res = await db.query(sql,[id]);
    
    return res.rows[0];
};


const Create = async (placa,capacidad,driverId)=>{
    const sql = "INSERT INTO buses(placa,capacity,driver_id) VALUES($1,$2,$3) RETURNING*";
        
    const res = await db.query(sql,[placa,capacidad,driverId]);
    
    return res.rows[0];
};


const Update = async(placa,capacidad,driverId,id)=>{
    const sql = "UPDATE buses set placa = $1, capacity = $2, driver_id = $3 where id = $4 RETURNING *";
        
    const res = await db.query(sql,[placa,capacidad,driverId,id]);
    
    return res.rows[0];
};

const Delete = async(id)=>{
    const sql = "DELETE FROM buses where id = $1";
    
    const res = await db.query(sql,[id]);
    
    return res.rowCount > 0;
};


const GetBusDrivers = async(id)=>{
    const sql = "SELECT * FROM buses where driver_id = $1";

    const res = await db.query(sql,[id]);
    
    return res.rows;
};

module.exports = {
    GetAll,
    GetById,
    Create,
    Update,
    Delete,
    GetBusDrivers
}