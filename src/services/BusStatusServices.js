const db = require("../config/db");
// const BusStatusData = require("../Data/BusStatus");
// const BusData = require("../Data/Buses");
// const ValidStatus = ["ACTIVE","INACTIVE","MAINTENANCE"];

const GetStatus = async () =>{
    const sql = "SELECT * FROM bus_estado";
    const res = await db.query(sql);    
    return res.rows;
};

const GetStatusById = async(id) =>{
    const sql = "SELECT * FROM bus_estado WHERE id = $1";
    const valor = [id];

    const res = await db.query(sql,valor);

    if(res.rowCount <= 0){
        throw new Error("No existe estado con ese Id");
    }
    return res.rows[0];
};

const CreateStatus = async (body)=>{
    const bus = await existeBus(body.bus_id);

    if (!body || Object.keys(body).length === 0) {
        throw new Error("Request body cannot be empty.");
    };

    if(bus <=0){
        throw new Error("No existe bus con ese id");
    };

    // if(!ValidStatus.includes(body.status)){
    //     throw new Error("Estatus no permitido");
    // };

    if(!esNumero(body.current_passengers) || Number(body.current_passengers) <= 0){
        throw new Error("Capacidad del bus ingresada no es correcta");
    };

    if(Number(body.current_passengers) > bus.capacity){
        throw new Error("La cantidad de pasajeros supera la capacidad del autobús");
    };

    const sql = "INSERT INTO bus_estado(bus_id,estado,current_passengers,next_stop) VALUES($1,$2,$3,$4) RETURNING *";
    const valores = [body.bus_id,body.status,body.current_passengers,body.next_stop];
    const res = await db.query(sql,valores);

    return res.rows[0];    
};

const updateStatus = async (id,body)=>{
    const status = await GetStatusById(id);

    const busStatus = tieneEstado(body.bus_id);
        
    const bus = await existeBus(body.bus_id);

    if(!body || Object.keys(body).length === 0) {
        throw new Error("Request body cannot be empty.");
    };

    if(bus <= 0){
        throw new Error("No existe bus con ese id");
    };

    // if(!ValidStatus.includes(body.status)){
    //     throw new Error("Estatus no permitido");
    // };

    if(!esNumero(body.current_passengers) || Number(body.current_passengers) <= 0){
        throw new Error("Capacidad del bus ingresada no es correcta");
    };

    if(Number(body.current_passengers) > bus.capacity){
        throw new Error("La cantidad de pasajeros supera la capacidad del autobús");
    };

    if(!busStatus){
        throw new Error("No hay estado registrado para este bus, favor crear uno");
    }

    const sql = "UPDATE bus_estado SET bus_id = $1, estado = $2, current_passengers = $3, next_stop = $4 where id = $5";
    const valores = [body.bus_id,body.status,body.current_passengers,body.next_stop,id];
    const res = await db.query(sql,valores);

    return res.rows[0];
};

const deleteStatus = async (id)=>{
    const sql = "DELETE FROM bus_estado WHERE id = $1";
    const valor = [id];
    const res = await db.query(sql,valor);

    return res.rows;
};

//Definir bien a ver que es lo que quieren
const busByStatus = (status)=>{
    //const buses
}

function esNumero(valor) {
    return !isNaN(valor);
};

function tieneEstado(BusID){
    const busEstado = BusStatusData.find(s=>s.bus_id === BusID);

    return busEstado;
};

async function existeBus(busId){
    const sql = "SELECT * FROM buses WHERE id = $1";
    const valor = [busId];
    const res = await db.query(sql,valor);

    return res.rowCount;
};

module.exports = {
    GetStatus,
    GetStatusById,
    CreateStatus,
    updateStatus,
    deleteStatus
};