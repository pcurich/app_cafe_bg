const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../models/User');

exports.Create = async (req, res) => {

    // leer los datos del usuario y colocarlos en Usuarios
    const user = new Users(req.body);
    user.password = await bcrypt.hash(req.body.password, 12);
    try {
        await user.save();
        res.json({message : 'Usuario Creado Correctamente'});
    } catch (error) {
        res.json({message : 'Hubo un error'});
    }

}

exports.Login = async (req, res, next) => {

    const token = jwt.sign({
        email : '1@1.com',
        name: 'Pedro',
        id : '87'
    },
    'LLAVESECRETA',
    {
        expiresIn : '1h'
    });

    // retornar el TOKEN
    res.json({ token });

    // // buscar el usuario
    // const { email, password } = req.body;
    // const user = await Users.findOne({ email });

    // if(!user) {
    //     // Si el usuario no existe
    //     await res.status(401).json({message : 'Ese usuario no existe'});
    //     next();
    // } else {
    //     // El usuario existe, verificar si el password es correcto o incorrecto
    //     if(!bcrypt.compareSync(password, user.password )) {
    //         // si el password es incorrecto
    //         await res.status(401).json({ message : 'Password Incorrecto'});
    //         next();
    //     } else {
    //         // password correcto, firmar el token
    //         const token = jwt.sign({
    //             email : user.email,
    //             name: user.name,
    //             id : user._id
    //         },
    //         'LLAVESECRETA',
    //         {
    //             expiresIn : '1h'
    //         });

    //         // retornar el TOKEN
    //         res.json({ token });
    //     }
    // }
}