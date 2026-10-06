const driverRes = require("../repositories/DriverRepository");

const getAllDrivers = async ()=>{
    const res = await driverRes.GetAll();
    return res || [];
};

const getDriverById  = async (id) =>{
    const res = await driverRes.GetById(id);

    if (!res) {
        const error = new Error('El conductor solicitado no existe');
        error.status = 404; // Marcamos que es un 404 Not Found
        throw error;
    };

    return res;
};

const createDriver = async (driverBody) =>{
    const res = await driverRes.Create(driverBody.nombre,driverBody.license);

    return res;
};

const Update = async (id,driverBody) =>{
    const res = await driverRes.GetById(id);

    if (!res) {
        const error = new Error('El conductor solicitado no existe');
        error.status = 404; // Marcamos que es un 404 Not Found
        throw error;
    };

    const res2 = await driverRes.Update(driverBody.nombre,driverBody.license, id);

    return res2;
};

const Delete = async (id) =>{
    const driver = await driverRes.GetById(id);

    if (!driver) {
        const error = new Error('El conductor solicitado no existe');
        error.status = 404; // Marcamos que es un 404 Not Found
        throw error;
    };


    const res = await driverRes.Delete(id);

    return res;
};

module.exports = {
    getAllDrivers,
    getDriverById,
    createDriver,
    Update,
    Delete
}