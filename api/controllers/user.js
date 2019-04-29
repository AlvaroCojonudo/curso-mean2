'use strict'
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');
const jwt = require('../services/jwt');
const fs = require('fs');
const path = require('path');
function pruebas(req, res) {
    res.status(200).send({
        message: 'Probando Accion de controlador User'
    });
}
function saveUser(req, res) {
    var user = new User();
    var params = req.body;
    console.log(params);
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = 'null';

    if (params.password) {
        bcrypt.hash(params.password, null, null, function (err, hash) {
            user.password = hash;
            if (user.name != null && user.surname != null && user.email != null) {
                user.save((err, userStored) => {
                    if (err) {
                        res.status(500).send({
                            message: 'Error al guardar el usuario'
                        });
                    } else {
                        if (!userStored) {
                            res.status(404).send({
                                message: 'No se registro el usuario'
                            });
                        } else {
                            res.status(200).send({ user: userStored });
                        }
                    }
                });
            } else {
                res.status(200).send({
                    message: 'Rellena los campos'
                });
            }
        });
    } else {
        res.status(200).send({
            message: 'Introduce la contrasena'
        });
    }

}
function loginUser(req, res) {
    const params = req.body;
    const email = params.email;
    const password = params.password;
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!user) {
                res.status(404).send({ message: 'EL ususario no existe' });
            } else {
                bcrypt.compare(password, user.password, function (err, check) {
                    if (check) {
                        if (params.gethash) {
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else {
                            res.status(200).send({ user });
                        }
                    } else {
                        res.status(404).send({ message: 'El usuario no ha podido loggearse' });
                    }
                });
            }
        }
    });
}
function updateUser(req, res) {
    const userId = req.params.id;
    const update = req.body;
    if(userId != req.user.sub){
        return res.status(500).send({ message: 'No tienes permiso para actualizar' });
    }
    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar el usuario' });
        } else {
            if (!userUpdated) {
                res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
            } else {
                res.status(200).send({ user: userUpdated });
            }
        }
    });
}
function uploadImage(req, res) {
    const userId = req.params.id;
    var file_name = 'No subido...';
    if (req.files) {
        const file_path = req.files.image.path;
        const file_split = file_path.split('/');
        file_name = file_split[2];
        const ext_split = file_name.split('.');
        const file_ext = ext_split[1];
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
            User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdated) => {
                if (err) {
                    res.status(500).send({ message: 'Error al actualizar el usuario' });
                } else {
                    if (!userUpdated) {
                        res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
                    } else {
                        res.status(200).send({
                            image: file_name,
                            user: userUpdated 
                        });
                    }
                }
            });
        } else {
            res.status(200).send({ message: 'Extension del archivo no valida.' });
        }
    } else {
        res.status(200).send({ message: 'No ha subido imagen' });
    }
}
function getImageFile(req, res){
    const imageFile = req.params.imageFile;
    const path_file = './uploads/users/' + imageFile;
    fs.exists(path_file, function(exist){
        if(exist){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la imagen.'});
        }
    });
}
module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
};