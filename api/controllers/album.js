'use strict'
const path = require('path');
const fs = require('fs');
const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');
function getAlbum(req, res) {
    const albumId = req.params.id;
    Album.findById(albumId).populate({ path: 'artist' }).exec((err, album) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!album) {
                res.status(404).send({ message: 'El album no existe' });
            } else {
                res.status(500).send({ album });
            }
        }
    });
}
function saveAlbum(req, res) {
    var album = new Album();
    const params = req.body;
    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = 'null';
    album.artist = params.artist;
    album.save((err, albumStored) => {
        if (err) {
            res.status(500).send({ message: 'error en el servidor' });
        } else {
            if (!albumStored) {
                res.status(404).send({ message: 'No se guardo el album' });
            } else {
                res.status(200).send({ album: albumStored });
            }
        }
    });
}
function getAlbums(req, res) {
    const artistId = req.params.artist;
    var find;
    if (!artistId) {
        find = Album.find({}).sort('title');
    } else {
        find = Album.find({ artist: artistId }).sort('year');
    }
    find.populate({ path: 'artist' }).exec((err, albums) => {
        if (err) {
            res.status(500).send({ message: 'error en la peticion' });
        } else {
            if (!albums) {
                res.status(404).send({ message: 'No hay albums' });
            } else {
                res.status(200).send({ albums });
            }
        }
    });
}
function updateAlbum(req, res) {
    const albumId = req.params.id;
    const update = req.body;
    Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else {
            if (!albumUpdated) {
                res.status(404).send({ message: 'No se ha actualizado el album' });
            } else {
                res.status(200).send({ album: albumUpdated });
            }
        }
    });
}
function deleteAlbum(req, res) {
    const albumId = req.params.id;
    Album.findByIdAndRemove(albumId, (err, albumRemoved) => {
        if(err){
            res.status(500).send({message: 'error al eliminar el album'});
        }else{
            if(!albumRemoved){
                res.status(404).send({message: 'error al eliminar el album'});
            }else{
                Song.find({album: albumRemoved._id}).remove((err, songRemoved) => {
                    if(err){
                        res.status(500).send({ message: 'Error al eliminar una cancion del album' });
                    }else{
                        if (!songRemoved) {
                            res.status(404).send({ message: 'No se ha eliminado la cancion' });
                        } else {
                            res.status(200).send({ album: albumRemoved });
                        }
                    }
                });
            }
        }
    });
}
function uploadImage(req, res) {
    const albumId = req.params.id;
    console.log(req.files);
    var file_name = 'No subido...';
    if (req.files) {
        const file_path = req.files.image.path;
        const file_split = file_path.split('/');
        file_name = file_split[2];
        const ext_split = file_name.split('.');
        const file_ext = ext_split[1];
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
            Album.findByIdAndUpdate(albumId, {image: file_name}, (err, albumUpdated) => {
                if (err) {
                    res.status(500).send({ message: 'Error al actualizar el Album' });
                } else {
                    if (!albumUpdated) {
                        res.status(404).send({ message: 'No se ha podido actualizar el Album' });
                    } else {
                        res.status(200).send({ album: albumUpdated });
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
    const path_file = './uploads/albums/' + imageFile;
    fs.exists(path_file, function(exist){
        if(exist){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la imagen.'});
        }
    });
}
module.exports = {
    getAlbum,
    saveAlbum,
    getAlbums,
    updateAlbum,
    deleteAlbum,
    getImageFile,
    uploadImage
}