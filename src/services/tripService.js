const db = require("../config/db");

const validStatus = ["IN_PROGRESS","FINISHED","CANCELLED"];

const allTrips = async()=>{
    const sql = "SELECT * FROM Trips";
    const res = await db.query(sql);

    return res.rows;
};

const tripById = async (id)=>{
    const sql = "SELECT * FROM Trips WHERE id = $1";
    const valor = [id];
    const res = await db.query(sql,valor);

    return res.rows[0];
};

const create = async (tripBody)=>{
    const existe = existeBus(tripBody.bus_id);
    const infoBus = busEstado(tripBody.bus_id);
    const fecha = fechaActual();

    const existeTrip = trips.some(t =>
    t.bus_id === tripBody.bus_id &&
    t.status === "IN_PROGRESS"
    );

    if(!tripBody || Object.keys(tripBody).length === 0) {
        throw new Error("Request body cannot be empty.");
    };

    if(!existe){
        throw new Error("No existe bus con ese Id");
    };

    if(!infoBus){
        throw new Error("El bus no tiene estatus actualmente");
    }

    if(infoBus.status !== "ACTIVE"){
        throw new Error("El autobús no está disponible para iniciar un viaje");
    };

    if(tripBody.origin.toLowerCase() === tripBody.destination.toLowerCase()){
        throw new Error("El origen y el destino deben ser diferentes.");
    };

    if(!validStatus.includes(tripBody.status)){
        throw new Error("Estatus no permitido");
    };

    if(existeTrip){
        throw new Error("Ya el bus tiene un viaje en progreso");
    };

    const idTrip = trips.at(-1);

    const newTrip = 
    {
        id: trips.length >= 1? idTrip.id + 1 : 1,
        bus_id: tripBody.bus_id,
        origin: tripBody.origin,
        destination: tripBody.destination,
        departure_time: fecha,
        arrival_time: null,
        status: tripBody.status
    };

    trips.push(newTrip);
    return newTrip;
};

const update = (id,tripBody)=>{
    const trip = tripById(id);
    const existe = existeBus(tripBody.bus_id);
    const fecha = fechaActual();

    if(!tripBody || Object.keys(tripBody).length === 0) {
        throw new Error("Request body cannot be empty.");
    };

    if(!trip){
        throw new Error("No hay un viaje registrado con ese Id");
    };

    if(!existe){
        throw new Error("No existe bus con ese Id");
    };

    if(tripBody.origin.toLowerCase() === tripBody.destination.toLowerCase()){
        throw new Error("El origen y el destino deben ser diferentes.");
    };


    if(!validStatus.includes(tripBody.status)){
        throw new Error("Estatus no permitido");
    };

    if(trip.status === "FINISHED"){
        throw new Error("Ya el viaje tiene status terminado");
    };

    if(tripBody.status === "FINISHED"){
        trip.arrival_time = fecha;
        trip.status = tripBody.status;
    }else{
        trip.origin = tripBody.origin;
        trip.destination = tripBody.destination;    
        trip.status = tripBody.status;
    };
    return trip;
};

const deleteTrip = (id)=>{
    const i = trips.findIndex(t=>t.id === id);

    if(i > -1){
        trips.splice(i,1);
    }else{
        throw new Error("No existe viaje registrado con ese Id");
    };
};

module.exports = {
    allTrips,
    tripById,
    create,
    update,
    deleteTrip
};

async function existeBus(id){
    const sql = "SELECT * FROM buses WHERE id = $1";
    const valor = [id];

    const res = await db.query(sql,valor);

    return res.rowCount;
};

async function busEstado(id){
    const sql = "SELECT * FROM bus_estado WHERE id = $1";
    const valor = [id];

    const res = await db.query(sql,valor);

    return res.rowCount;
};

function fechaActual(){
    const hoy = new Date();

    //Formato local según el navegador/país
    const fechaLocal = hoy.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    return fechaLocal;
};