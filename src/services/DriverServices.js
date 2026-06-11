const drivers = require("../Data/Drivers");

const getAllDrivers = ()=>{
    return drivers;
};

const getDriverById  =(id) =>{
    const driver = drivers.find(d=>d.id === id);

    if (!driver) {
        throw new Error("No existe conductor/a con ese Id");
    }

    return driver;
};

const createDriver = (driverBody) =>{
    const exists = drivers.find(d => d.NumeroLicencia === driverBody.license);

    if (!driverBody || Object.keys(driverBody).length === 0) {
        throw new Error("Request body cannot be empty.");
    };

    if (exists) {
        throw new Error("La licencia ya existe");
    };

    if(driverBody.nombre === "" || driverBody.nombre === " " || driverBody.nombre.length <= 0){
        throw new Error("Nombre no puede estar vacio");
    };

    if(driverBody.license === "" || driverBody.license === " " || driverBody.license.length <= 0){
        throw new Error("Licencia no puede estar vacio");
    };
    const ID = drivers.at(-1);

    const newDriver = {
        id:drivers.length >= 1? ID.id + 1 : 1,
        nombre: driverBody.nombre,
        NumeroLicencia: driverBody.license
    };

    drivers.push(newDriver);

    return newDriver;
};

const Update = (id,driverBody) =>{
    const driver = getDriverById(id);

    if (!driverBody || Object.keys(driverBody).length === 0) {
        throw new Error("Request body cannot be empty.");
    };

    if(driverBody.nombre === "" || driverBody.nombre === " " || driverBody.nombre.length <= 0){
        throw new Error("Nombre no puede estar vacio");
    };

    if(driverBody.license === "" || driverBody.license === " " || driverBody.license.length <= 0){
        throw new Error("Licencia no puede estar vacio");
    };

    const existeLicencia = drivers.find(d=>d.NumeroLicencia === driverBody.license);

    if (existeLicencia){
        throw new Error("Ya existe un conductor con esa licencia");
    };

    driver.nombre = driverBody.nombre;
    driver.NumeroLicencia = driverBody.license;

    return driver;
};

const Delete = (id) =>{
    const index = drivers.findIndex(user => user.id === id);
    
    if (index > -1) {
    drivers.splice(index, 1);
    }else{
        throw new Error(`No existe conductor/a con ese Id ${index}`);
    };
};

module.exports = {
    getAllDrivers,
    getDriverById,
    createDriver,
    Update,
    Delete
}