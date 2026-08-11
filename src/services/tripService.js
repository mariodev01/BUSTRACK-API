const trips = require("../Data/Trip.js");
const Buses = require("../Data/Buses.js");
const statusBus = require("../Data/BusStatus.js");

const validStatus = ["IN_PROGRESS","FINISHED","CANCELLED"];

const allTrips = ()=>{
    return trips;
};

const tripById = (id)=>{
    const trip = trips.find(t=>t.id === id);

    if(!trip){
        throw new Error("No existe viaje con ese Id");
    };

    return trip;
};

const create = (tripBody)=>{
    const existe = existeBus(tripBody.bus_id);
    const infoBus = busEstado(tripBody.bus_id);
    const fecha = fechaActual();

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

function existeBus(id){
    const exist = Buses.find(b=>b.id === id );

    return exist;
};

function busEstado(id){
    const info = statusBus.find(s=>s.bus_id === id);

    return info;
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