const db = require("../config/db");

const GetAll = async()=>{
    const sql = "SELECT * FROM bus_estado";
    const res = await db.query(sql);    
    return res.rows;
};

const GetById = async(id)=>{
    const sql = "SELECT * FROM bus_estado WHERE id = $1";
    
    const res = await db.query(sql,[id]);
        
    return res.rows[0];
};

const Create = async(busID,estado,currentP,nextS)=>{
    const sql = "INSERT INTO bus_estado(bus_id,estado,current_passengers,next_stop) VALUES($1,$2,$3,$4) RETURNING *";
    
    const res = await db.query(sql,[busID,estado,currentP,nextS]);
    
    return res.rows[0];    
};

const Update = async(busID,estado,currentP,nextS,id)=>{
    const sql = "UPDATE bus_estado SET bus_id = $1, estado = $2, current_passengers = $3, next_stop = $4 where id = $5 RETURNING *";
    const valores = [busID,estado,currentP,nextS,id];
    const res = await db.query(sql,valores);
    
    return res.rows[0];
};

const Delete = async(id)=>{
    const sql = "DELETE FROM bus_estado WHERE id = $1";

    const res = await db.query(sql,[id]);

    return res.rows;    
};

const BusExist = async(busId)=>{
    const sql = "SELECT * FROM buses WHERE id = $1";
    
    const res = await db.query(sql,[busId]);
    
    return res.rowCount;
};

module.exports = {
    GetAll,
    GetById,
    Create,
    Update,
    Delete,
    BusExist
};