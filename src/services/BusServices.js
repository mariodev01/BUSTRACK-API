const Buses = require("../Data/Buses");
const drivers = require("../Data/Drivers");

const AllBuses = () =>{
    return {
        data: Buses
    };
};

const BusById = (id) =>{
    const Bus = Buses.find(b=> b.id === id);

    if(!Bus){
        throw new Error("No existe Bus con ese Id");        
    };

    return Bus;
};

const Create = (BusBody)=>{
    if (!BusBody || Object.keys(BusBody).length === 0) {
        throw new Error("Request body cannot be empty.");
    };

    if (!esNumero(BusBody.capacity) || Number(BusBody.capacity) <= 0){
        throw new Error("Capacidad del bus ingresada no es correcta");
    };

    if(!ExisteConductor(Number(BusBody.driverId))){
        throw new Error("No existe conductor con ese Id");
    };

    if(ExistePlaca(BusBody.plate)){
        throw new Error("Ya existe un bus con esa placa");
    };

    const idBus = Buses.at(-1);

    const newBus = 
    {
        id: Buses.length >= 1? idBus.id + 1 : 1,
        plate: BusBody.plate,
        capacity: Number(BusBody.capacity),
        driver_id: BusBody.driverId
    };

    Buses.push(newBus);
    return newBus;
};

const Update = (id,BusBody) => {
    const Bus = BusById(id);

    if (!BusBody || Object.keys(BusBody).length === 0) {
        throw new Error("Request body cannot be empty.");
    };
    
    if (!esNumero(BusBody.capacity) || Number(BusBody.capacity) <= 0){
        throw new Error("Capacidad del bus ingresada no es correcta");
    };

    if(!ExisteConductor(Number(BusBody.driverId))){
        throw new Error("No existe conductor con ese Id");
    };
    
    if(BusBody.plate === Bus.plate){
        Bus.plate = BusBody.plate;
    }else if(ExistePlaca(BusBody.plate)){
        throw new Error("Ya existe un bus con esa placa");
    };
    Bus.plate = BusBody.plate;
        
    Bus.capacity = Number(BusBody.capacity);
        
    Bus.driver_id = BusBody.driverId;

    return Bus;
};

const Delete = (id)=>{
    const index = Buses.findIndex(b => b.id === id);
    
    if (index > -1) {
    Buses.splice(index, 1);
    }else{
        throw new Error(`No existe bus con ese Id ${index}`);
    };
};

function esNumero(valor) {
    return !isNaN(valor);
};

const busByDriverId = (id)=>{
    const BusByDrivers = Buses.filter(b=>b.driver_id === id);

    return BusByDrivers;
};

const ExisteConductor = (driverID) =>{
    const driver = drivers.find(d=>d.id === driverID);

    return driver;
};

const ExistePlaca = (placa) => {
    const existe = Buses.find(b=>b.plate === placa);

    return existe;
};

module.exports = {
    AllBuses,
    BusById,
    Create,
    Update,
    Delete,
    busByDriverId,
};