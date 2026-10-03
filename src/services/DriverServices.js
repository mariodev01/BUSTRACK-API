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
    if (!driverBody || Object.keys(driverBody).length === 0) {
        const error = new Error("La solicitud no puede estar vacia");
        error.status = 400;
        throw error;
    };

    if(driverBody.nombre === "" || driverBody.nombre === " " || driverBody.nombre.length <= 0){
        const error = new Error("Nombre no puede estar vacio");
        error.status = 400;
        throw error;
    };

    if(driverBody.license === "" || driverBody.license === " " || driverBody.license.length <= 0){
        const error = new Error("Licencia no puede estar vacio");
        error.status = 400;
        throw error;
    };

    // const exists = await driverRes.Exist(driverBody.license);

    // if(exists >=1){
    //     const error = new Error("La licencia ya existe");
    //     error.status = 409;
    //     throw error;
    // };

    const res = await driverRes.Create(driverBody.nombre,driverBody.license);

    return res;
};

const Update = async (id,driverBody) =>{
    if(!driverBody || Object.keys(driverBody).length === 0) {
        const error = new Error("La solicitud no puede estar vacia");
        error.status = 400;
        throw error;
    };

    if(driverBody.nombre === "" || driverBody.nombre === " " || driverBody.nombre.length <= 0){
        const error = new Error("Nombre no puede estar vacio");
        error.status = 400;
        throw error;
    };

    if(driverBody.license === "" || driverBody.license === " " || driverBody.license.length <= 0){
        const error = new Error("Licencia no puede estar vacio");
        error.status = 400;
        throw error;
    };

    const exists = await driverRes.ExistUpdate(driverBody.license,id);

    if(exists >= 1){
        const error = new Error("Ya existe un conductor con esa licencia");
        error.status = 409;
        throw error;
    };

    const res2 = await driverRes.Update(driverBody.nombre,driverBody.license, id);

    return res2;
};

const Delete = async (id) =>{
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