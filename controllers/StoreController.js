const ConfigStore = require('../models/ConfigStore');

exports.Create = async (req, res) => {

    // leer los datos del usuario y colocarlos en Usuarios
    const config = new ConfigStore();
    config.storeName = "Café Curich";
    config.storeNumber = "10436173721";
    config.lote = 1;
    config.lastTicket = 1;
    try {
        await config.save();
        res.json({message : 'Tienda Creada Correctamente'});
    } catch (error) {
        res.json({message : 'Hubo un error'});
    }
};