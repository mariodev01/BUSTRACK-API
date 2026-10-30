const db = require("../config/db");
const br = require("../repositories/BusRepository");

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
    const res = await br.Create(BusBody.plate,BusBody.capacity,BusBody.driverId);

    return res;
};

const Update = async (id,BusBody) => {
    const res = await br.GetById(id);

    if (!res) {
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
    const driver = await br.GetBusDrivers(id);

    if (!driver){
        const error = new Error('El conductor solicitado no existe');
        error.status = 404; // Marcamos que es un 404 Not Found
        throw error;
    }

    return driver;
};

module.exports = {
    AllBuses,
    BusById,
    Create,
    Update,
    DeleteBus,
    busByDriverId,
};