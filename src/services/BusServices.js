const br = require("../repositories/BusRepository");
const dr = require("../repositories/DriverRepository");

const AllBuses = async () =>{
    const res = await br.GetAll();
    
    return res || [];
};

const BusById = async (id) =>{
    const res = await br.GetById(id);
    
    if (!res) {
        const error = new Error('El bus solicitado no existe');
        error.status = 404; // Marcamos que es un 404 Not Found
        throw error;
    };
    
    return res;
};

const Create = async (BusBody)=>{
    if (!BusBody || Object.keys(BusBody).length === 0) {
        const error = new Error('Request body cannot be empty.');
        error.status = 400;
        throw error;
    };

    if(
    BusBody.capacity === null ||
    BusBody.capacity === undefined ||
    (typeof BusBody.capacity === 'string' && BusBody.capacity.trim() === "")
    ){
        const error = new Error('No se aceptan valores vacios ni nulos');
        error.status = 400;
        throw error;
    }

    if(isNaN(BusBody.capacity)){
        const error = new Error('Solo se aceptan numeros');
        error.status = 400;
        throw error;
    };

    if(BusBody.capacity <= 0){
        const error = new Error('La capacidad del bus no puede ser menor a 0');
        error.status = 400;
        throw error;
    };

    const res = await br.Create(BusBody.plate,BusBody.capacity,BusBody.driverId);

    return res;
};

const Update = async (id,BusBody) => {
    if (!BusBody || Object.keys(BusBody).length === 0) {
        const error = new Error('Request body cannot be empty.');
        error.status = 400;
        throw error;
    };

    if(
    BusBody.capacity === null ||
    BusBody.capacity === undefined ||
    (typeof BusBody.capacity === 'string' && BusBody.capacity.trim() === "")
    ){
        const error = new Error('No se aceptan valores vacios ni nulos');
        error.status = 400;
        throw error;
    }


    if(isNaN(BusBody.capacity)){
        const error = new Error('Solo se aceptan numeros');
        error.status = 400
        throw error;
    };

    if(BusBody.capacity <= 0){
        const error = new Error('La capacidad del bus no puede ser menor a 0');
        error.status = 400
        throw error;
    };

    const res = await br.GetById(id);

    if(!res) {
        const error = new Error('El bus solicitado no existe');
        error.status = 404; // Marcamos que es un 404 Not Found
        throw error;
    };

    const res2 = await br.Update(BusBody.plate,BusBody.capacity,BusBody.driverId, id);

    return res2;
};

const DeleteBus = async (id)=>{
    const bus = await br.GetById(id);
    
    if (!bus) {
        const error = new Error('El bus solicitado no existe');
        error.status = 404; // Marcamos que es un 404 Not Found
        throw error;
    };
    const res = await br.Delete(id);
    
    return res;
};

const busByDriverId = async (id)=>{
    const driver = await dr.GetById(id);
    const buses = await br.GetBusDrivers(id);
    
    if(driver === undefined){
        const error = new Error('El conductor solicitado no Existe');
        error.status = 404;
        throw error;
    };

    if (buses.length <=0){
        const error = new Error('El conductor no tiene buses asignados');
        error.status = 404; // Marcamos que es un 404 Not Found
        throw error;
    };

    return buses;
};

module.exports = {
    AllBuses,
    BusById,
    Create,
    Update,
    DeleteBus,
    busByDriverId,
};