const trips = require("../Data/Trip.js");
const bus = require("../Data/Buses.js");
const statusBus = require("../Data/BusStatus.js");

const validStatus = ["IN_PROGRESS","FINISHED","CANCELLED"];

const allTrips = ()=>{
    return {
        data: trips
    };
};

const tripById = (id)=>{
    const trip = trips.find(t=>t.id === id);

    if(!trip){
        throw new Error("No existe viaje con ese Id");
    };

    return trip;
};

const create = (tripBody)=>{
    const bus = ExisteBus(tripBody.bus_id);
    const infoBus = BusEstado(tripBody.bus_id);
    const fecha = Fecha();
    const statusTrip = trips.find(t=>t.bus_id === tripBody.bus_id);

    if(!tripBody || Object.keys(tripBody).length === 0) {
        throw new Error("Request body cannot be empty.");
    };

    if(!bus){
        throw new Error("No existe bus con ese Id");
    };

    if(infoBus.status !== "ACTIVE" || !infoBus){
        throw new Error("El autobús no está disponible para iniciar un viaje o el bus no tiene estado.");
    };

    if(tripBody.origin.toLowerCase() === tripBody.destination.toLowerCase()){
        throw new Error("El origen y el destino deben ser diferentes.");
    };

    if(!validStatus.includes(tripBody.status)){
        throw new Error("Estatus no permitido");
    };

    if(statusTrip.status === "IN_PROGRESS"){
        throw new Error("Este autobús ya tiene un viaje en curso.");
    }else{
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
};

const Update = (id,tripBody)=>{
    const trip = tripById(id);
    const bus = ExisteBus(tripBody.bus_id);
    const fecha = Fecha();


    if(!tripBody || Object.keys(tripBody).length === 0) {
        throw new Error("Request body cannot be empty.");
    };

    if(!trip){
        throw new Error("No hay un viaje registrado con ese Id");
    };

    if(!bus){
        throw new Error("No existe bus con ese Id");
    };

    if(!validStatus.includes(tripBody.status)){
        throw new Error("Estatus no permitido");
    };

    trip.bus_id = tripBody.bus_id;
    trip.origin = tripBody.origin;
    trip.destination = tripBody.destination;
    trip.arrival_time = fecha;
    trip.status = tripBody.status;

    return trip;
};

const Delete = (id)=>{
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
    Update,
    Delete
};

function ExisteBus(id){
    const exist = bus.find(b=>b.id === id );

    return exist;
};

function BusEstado(id){
    const info = statusBus.find(s=>s.bus_id === id);

    return info;
};

function Fecha(){
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