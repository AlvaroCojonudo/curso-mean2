'use strict'
const path = require('path');
const fs = require('fs');
const mongoosePaginate = require('mongoose-pagination');
const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');
function getArtist(req, res) {
    const artistId = req.params.id;
    Artist.findById(artistId, (err, artist) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!artist) {
                res.status(404).send({
                    message: 'El artista no existe'
                });
            } else {
                res.status(200).send({
                    artist: artist
                });
            }

        }
    });
}
function saveArtist(req, res) {
    var artist = new Artist();
    const params = req.body;
    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null';
    artist.save((err, artistStored) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar el artista.' });
        } else {
            if (!artistStored) {
                res.status(404).send({ message: 'El artista no se guardo.' });
            } else {
                res.status(200).send({ artist: artistStored });
            }
        }
    });
}
function getArtists(req, res) {
    var page;
    if (req.params.page) {
        page = req.params.page;
    } else {
        page = 1;
    }
    const itemsPerPage = 3;
    Artist.find().sort('name').paginate(page, itemsPerPage, function (err, artists, total) {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion.' });
        } else {
            if (!artists) {
                res.status(404).send({ message: 'No hay artistas.' });
            } else {
                return res.status(200).send({
                    items: total,
                    artists: artists
                });
            }
        }
    });
}
function updateArtist(req, res) {
    const artistId = req.params.id;
    const update = req.body;
    Artist.findByIdAndUpdate(artistId, update, (err, artistUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion.' });
        } else {
            if (!artistUpdated) {
                res.status(404).send({ message: 'El artista no se pudo actualizar.' });

            } else {
                res.status(200).send({ artist: artistUpdated });

            }
        }
    });
}
function deleteArtist(req, res) {
    const artistId = req.params.id;
    Artist.findByIdAndRemove(artistId, (err, artistRemoved) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion Artista.' });
        } else {
            if (!artistRemoved) {
                res.status(404).send({ message: 'El artista no se pudo eliminar.' });
            } else {
                Album.find({ artist: artistRemoved._id }).remove((err, albumRemoved) => {
                    if (err) {
                        res.status(404).send({ message: 'Error en la peticion Album.' });
                    } else {
                        if (!albumRemoved) {
                            res.status(500).send({ message: 'El album no se pudo eliminar.' });
                        } else {
                            Song.find({ album: albumRemoved._id }).remove((err, songRemoved) => {
                                if (err) {
                                    res.status(404).send({ message: 'Error en la peticion CAncion.' });
                                } else {
                                    if (!songRemoved) {
                                        res.status(500).send({ message: 'El CAncion no se pudo eliminar.' });
                                    } else {
                                        res.status(200).send({artist: artistRemoved});
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });
}
function uploadImage(req, res) {
    const artistId = req.params.id;
    var file_name = 'No subido...';
    if (req.files) {
        const file_path = req.files.image.path;
        const file_split = file_path.split('/');
        file_name = file_split[2];
        const ext_split = file_name.split('.');
        const file_ext = ext_split[1];
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
            Artist.findByIdAndUpdate(artistId, {image: file_name}, (err, artistUpdated) => {
                if (err) {
                    res.status(500).send({ message: 'Error al actualizar el usuario' });
                } else {
                    if (!artistUpdated) {
                        res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
                    } else {
                        res.status(200).send({ artist: artistUpdated });
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
    const path_file = './uploads/artists/' + imageFile;
    fs.exists(path_file, function(exist){
        if(exist){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la imagen.'});
        }
    });
}
module.exports = {
    getArtist,
    saveArtist,
    getArtists,
    updateArtist,
    deleteArtist,
    uploadImage,
    getImageFile
}