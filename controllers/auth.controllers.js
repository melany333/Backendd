const { validationResult } = require('express-validator');
const Usuario = require('../model/usuario-model');
const bcrypt = require('bcrypt');

const crearUsuario = async (req, res) => {
    const { name, email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json({
            errors: errors.mapped(),
        })
    }

    try {
        //validar sii el email del usuario existe en la base de datos
        let usuario = await Usuario.findOne({ email });


        if (usuario) {
            return res.json({
                msg: 'un usuario ya existe con este correo'
            })
        }

        usuario = new Usuario(req.body)
        console.log(usuario)
        //encriptar la contraseña
        const salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync(password, salt);


        //guardar usuario en DB
        await usuario.save()

        res.json({
            msg: 'Usuario registrado correctamente',
        })


        console.log('usuario registrado correctamente')
    } catch (error) {
        console.log(error)
        res.json({
            msg: 'por favor conectate con el administrador'
        })
    }

    res.json({
        saludo: 'hola',
    })
};








const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json({
            errors: errors.mapped(),
        })
    }

    try {
        let usuario = await Usuario.findOne({ email });


        if (!usuario) {
            return res.json({
                msg: 'no existe ningun email como el ingresado'
            })
        }

        //confirmar contraseña
        const validarContraseña = bcrypt.compareSync(password, usuario.password)
        console.log(validarContraseña)

        if (!validarContraseña) {
            return res.json({
                msg: ' la contraseña es incorrecta',

            })
        }

        res.json({msg:'usuario logueado correctamente',
            
        })

    } catch (error) {
        console.log(error)
        res.json({
            msg: 'por favor conectate con el administrador'
        })
    }

}

module.exports = {
    crearUsuario,
    loginUsuario,
}