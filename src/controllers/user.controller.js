const User = require ('../models/User');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

exports.createUser = async (req, res) => { const { username, email, password } = req.body;
    try {
        let foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(400).json({ message: 'El usuario ya existe en el sistema' });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        const newUser = await User.create({ username, email, password: hashedPassword });
        if (!newUser) return res.status(400).json({ message: 'No se pudo crear el usuario' });
        return res.status(201).json({ datos: newUser });
    } catch (error) {
        return res.status(500).json({ message: 'Hubo un error al registrar el usuario', error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let foundUser = await User.findOne({ email: email.toLowerCase() });
        if (!foundUser)  return res.status(400).json({ message: 'El usuario no existe en el sistema' });

        const correctPassword = await bcryptjs.compare(password, foundUser.password);

        if (!correctPassword)  return res.status(400).json({ message: 'El email o la password no corresponden' });
        
        const payload = { 
            user: {
                id: foundUser._id,
                role: foundUser.role
            }
        }
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            },
            (error, token) => {
                if (error) {
                    return res.status(500).json({ message: 'Hubo un error al generar el token', error: error.message });
                }
            return res.json({ token });
            }
        );
    } catch (error) {
        res.json({ message: 'Hubo un error al obtener el token', error})
        }
};

exports.verifyUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al verificar el usuario', error })
    }
};

exports.updateUserById = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const updateUser = await User.findByIdAndUpdate(
            req.user.id,
            { username, email, password: hashedPassword },
            { new: true, runValidators: true }
        )
        if (!updateUser) return res.status(400).json({ message: 'Usuario no encontrado' });
        return res.status(200).json({ usuarioActualizado: updateUser });
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al actualizar el usuario', error })  
    }
};

exports.deleteUserById = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user.id);
        if (!deletedUser) return res.status(404).json({ message: 'Usuario no encontrado' });
        return res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al eliminar el usuario', error })  
    }
};
                    
