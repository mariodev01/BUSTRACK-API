const db = require("../config/db");
const busInfo = require("../services/BusServices");

const busEstadoRes = require("../repositories/BusStatusRepository");


const GetStatus = async () =>{
    const res = await busEstadoRes.GetAll();
    return res || [];
};

const GetStatusById = async(id) =>{
    const res = await busEstadoRes.GetById(id);

    if (!res) {
        const error = new Error('El Bus Estado solicitado no existe');
        error.status = 404; // Marcamos que es un 404 Not Found
        throw error;
    };

    return res;
};

const CreateStatus = async (body)=>{
    if (!body || Object.keys(body).length === 0) {
        throw new Error("Request body cannot be empty.");
    };

    const infoEstado = await busInfo.BusById(body.bus_id);
    
    const bus = await busEstadoRes.BusExist(body.bus_id);

    if(bus <=0){
        throw new Error("No existe bus con ese id");
    };

    if(!esNumero(body.current_passengers) || Number(body.current_passengers) <= 0){
        throw new Error("Capacidad del bus ingresada no es correcta");
    };

    if(Number(body.current_passengers) > infoEstado.capacity){
        throw new Error("La cantidad de pasajeros supera la capacidad del autobús");
    };

    const res = await busEstadoRes.Create(body.bus_id,body.status,body.current_passengers,body.next_stop);

    return res    
};

const updateStatus = async (id,body)=>{
    if(!body || Object.keys(body).length === 0) {
        throw new Error("Request body cannot be empty.");
    };

    const infoEstado = await busInfo.BusById(body.bus_id);

    const bus = await busEstadoRes.BusExist(body.bus_id);

    if(bus <= 0){
        throw new Error("No existe bus con ese id");
    };

    if(!esNumero(body.current_passengers) || Number(body.current_passengers) <= 0){
        throw new Error("Capacidad del bus ingresada no es correcta");
    };

    if(Number(body.current_passengers) > infoEstado.capacity){
        throw new Error("La cantidad de pasajeros supera la capacidad del autobús");
    };

    const res2 = await busEstadoRes.Update(body.bus_id,body.status,body.current_passengers,body.next_stop,id);

    return res2;
};

const deleteStatus = async (id)=>{
    const busS = await busEstadoRes.GetById(id);

    if (!busS) {
        const error = new Error('El Bus Estado solicitado no existe');
        error.status = 404; // Marcamos que es un 404 Not Found
        throw error;
    };

    const res = await busEstadoRes.Delete(id);

    return res;

};

//Definir bien a ver que es lo que quieren
const busByStatus = (status)=>{
    //const buses
}

function esNumero(valor) {
    return !isNaN(valor);
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