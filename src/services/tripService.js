const db = require("../config/db");
const tr = require("../repositories/TripRepository");

//Auxiliares
const br = require('../repositories/BusRepository');
const bs = require('../repositories/BusStatusRepository');

const allTrips = async()=>{
    const res = tr.GetAll();

    return res || [];
};

const tripById = async (id)=>{
    const res = tr.GetById(id);

    if(!res){
        const error = new Error('El viaje solicitado no existe');
        error.status = 404; // Marcamos que es un 404 Not Found
        throw error;
    };

    return res;
};

const create = async (tripBody)=>{
    if(!tripBody || Object.keys(tripBody).length === 0) {
        throw new Error("Request body cannot be empty.");
    };
    const existe = await br.GetById(tripBody.bus_id);

    const infoBus = await bs.EstadoXBus(tripBody.bus_id);
    
    const infoTrip = "SELECT * FROM trips WHERE bus_id = $1 and status = 'IN_PROGRESS' ";

    const result2 = await db.query(infoTrip,[tripBody.bus_id]);

    const registro2 = result2.rowCount;

    if(existe <= 0){
        throw new Error("No existe bus con ese Id");
    };

    if(infoBus.length <= 0){
        throw new Error("El bus no tiene estatus actualmente");
    }

    if(registro2 >=1){
        throw new Error("Ya el autobus tiene un viaje en progeso");
    }

    if(infoBus.estado !== "ACTIVE"){
        throw new Error("El autobús no está disponible para iniciar un viaje");
    };

    if(tripBody.origin.toLowerCase() === tripBody.destination.toLowerCase()){
        throw new Error("El origen y el destino deben ser diferentes.");
    };

    const res = await tr.Create(tripBody.bus_id,tripBody.origin,tripBody.destination,tripBody.departure,tripBody.arrival,tripBody.status);

    return res;
};

const update = async (id,tripBody)=>{
    if(!tripBody || Object.keys(tripBody).length === 0) {
        throw new Error("Request body cannot be empty.");
    };

    let sql = "";
    let valores = [];

    const trip = await tripById(id);
    const existe = await br.GetById(tripBody.bus_id);

    if(!trip){
        throw new Error("No hay un viaje registrado con ese Id");
    };

    if(existe <= 0){
        throw new Error("No existe bus con ese Id");
    };

    if(tripBody.origin.toLowerCase() === tripBody.destination.toLowerCase()){
        throw new Error("El origen y el destino deben ser diferentes.");
    };

    if(trip.status === "FINISHED"){
        throw new Error("Ya el viaje tiene status terminado y no se puede modificar sus datos");
    };

    if(trip.status === "CANCELLED"){
        throw new Error("El viaje tiene estatus cancelado y no se puede modificar sus datos");
    };


    const res = await tr.Update(tripBody.bus_id,tripBody.origin,tripBody.destination,tripBody.status,id);

    return res;
};

const deleteTrip = async (id)=>{
    const res = tr.GetById(id);

    if(!res){
        const error = new Error('El viaje solicitado no existe');
        error.status = 404; // Marcamos que es un 404 Not Found
        throw error;
    };

    const res2 = tr.DeleteT(id);

    return res2;
};

module.exports = {
    allTrips,
    tripById,
    create,
    update,
    deleteTrip
};