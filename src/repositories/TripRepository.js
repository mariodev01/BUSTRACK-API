const db = require("../config/db");

const GetAll = async() => {
    const sql = "SELECT * FROM Trips";

    const res = await db.query(sql);

    return res.rows;
};

const GetById = async(id) => {
    const sql = "SELECT * FROM Trips WHERE id = $1";
    
    const res = await db.query(sql,[id]);
    
    return res.rows[0];
};


const Create = async(busID,origen,destino,horaLlegada,horaSalida,estado) => {

    let sql = "";
    let valores = [];

    if(estado === "FINISHED"){
        sql = 'INSERT INTO trips (bus_id, origin, destination, departure_time, arrival_time, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        valores = [busID,origen,destino,horaLlegada,horaSalida,estado];
    }else if(estado === "CANCELLED"){
        sql = 'INSERT INTO trips (bus_id, origin, destination,status) VALUES ($1, $2, $3, $4) RETURNING *';
        valores = [busID,origen,destino,estado];
    }else{
        // La función NOW() va directamente en la sintaxis SQL
        sql = 'INSERT INTO trips (bus_id, origin, destination, departure_time,status) VALUES ($1,$2,$3,NOW(),$4) RETURNING *';
        //Ajustamos los índices de los parámetros (ahora son 5 en lugar de 6)
        valores = [busID,origen,destino,estado];
    };
        
    const res = await db.query(sql, valores);
    return res.rows[0];
};

const Update = async (busID,origen,destino,estado,id)=>{
    let sql = "";
    let valores = [];

    if(estado === "IN_PROGRESS"){
        sql = "UPDATE Trips SET bus_id = $1,origin = $2,destination = $3,status = $4 WHERE id = $5 RETURNING *";
        valores = [busID,origen,destino,estado,id];
    };
    
    if(estado === "FINISHED"){
        sql = "UPDATE Trips SET bus_id = $1,origin = $2,destination = $3,arrival_time = NOW(),status = $4 WHERE id = $5 RETURNING *";
        valores = [busID,origen,destino,estado,id];
    };

    if(estado === "CANCELLED"){
        sql = "UPDATE Trips SET status = $1 WHERE id = $2 RETURNING *";
        valores = [estado,id];
    };
    const res = await db.query(sql,valores);

    return res.rows[0];
};

const DeleteT = async (id)=>{
    const sql = "DELETE FROM Trips where id = $1";
    
    const res = await db.query(sql,[id]);
    
    return res.rowCount > 0;
};


module.exports = {
    GetAll,
    GetById,
    Create,
    Update,
    DeleteT
};