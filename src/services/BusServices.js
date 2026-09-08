const db = require("../config/db");


const AllBuses = async () =>{
    const sql = "SELECT * FROM buses;"

    const res = await db.query(sql);

    return res.rows;
};

const BusById = async (id) =>{
    const sql = "SELECT * FROM buses where id = $1";
    const valor = [id];

    const res = await db.query(sql,valor);
    
    if(res.rowCount <=0){
        throw new Error("No existe Bus con ese Id");        
    };

    return res.rows[0];
};

const Create = async (BusBody)=>{
    const conductor = await ExisteConductor(Number(BusBody.driverId)); 
    const placa = await ExistePlaca(BusBody.plate); 

    if (!BusBody || Object.keys(BusBody).length === 0) {
        throw new Error("Request body cannot be empty.");
    };

    if (!esNumero(BusBody.capacity) || Number(BusBody.capacity) <= 0){
        throw new Error("Capacidad del bus ingresada no es correcta");
    };

    if(conductor <=0){
        throw new Error("No existe conductor con ese Id");
    };

    if(placa >= 1){
        throw new Error("Ya existe un bus con esa placa");
    };


    const sql = "INSERT INTO buses(placa,capacity,driver_id) VALUES($1,$2,$3) RETURNING*";
    const valores = [BusBody.plate,BusBody.capacity,BusBody.driverId];

    const res = await db.query(sql,valores);

    return res.rows[0];
};

const Update = async (id,BusBody) => {
    const conductor = await ExisteConductor(Number(BusBody.driverId)); 
    
    if (!BusBody || Object.keys(BusBody).length === 0) {
        throw new Error("Request body cannot be empty.");
    };
    
    if (!esNumero(BusBody.capacity) || Number(BusBody.capacity) <= 0){
        throw new Error("Capacidad del bus ingresada no es correcta");
    };

    if(conductor <=0){
        throw new Error("No existe conductor con ese Id");
    };

    const queryPlate = "SELECT * FROM buses where placa = $1 and id != $2";
    const parameters = [BusBody.plate,id];

    const ress = await db.query(queryPlate,parameters);

    if(ress.rowCount >=1){
        throw new Error("Ya existe un bus con esa placa!");
    }

    const sql = "UPDATE buses set placa = $1, capacity = $2, driver_id = $3 where id = $4";
    const valores = [BusBody.plate,BusBody.capacity,BusBody.driverId,id];

    const res = await db.query(sql,valores);

    return res.rows[0];
};

const Delete = async (id)=>{
    const sql = "DELETE  FROM buses where id = $1";
    const valores = [id];

    const res = await db.query(sql,valores);

    return res.rowCount > 0;
};

function esNumero(valor) {
    return !isNaN(valor);
};

const busByDriverId = async (id)=>{
    const sql = "SELECT * FROM buses where driver_id = $1";
    const valores = [id];

    const res = await db.query(sql,valores);

    return res.rows;
};

const ExisteConductor = async (driverID) =>{
    const sql = "select * from drivers WHERE id = $1";  
    const valores = [driverID];

    const res = await db.query(sql,valores);

    return res.rowCount;
};

const ExistePlaca = async (placa) => {
    const sql = "SELECT * FROM buses where placa = $1";
    const valores = [placa];

    const res = await db.query(sql,valores);

    return res.rowCount;
};

module.exports = {
    AllBuses,
    BusById,
    Create,
    Update,
    Delete,
    busByDriverId,
};