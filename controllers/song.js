'use strict'
const path = require('path');
const fs = require('fs');
const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');
function getSong(req, res) {
    const songId = req.params.id;
    Song.findById(songId).populate({ path: 'album' }).exec((err, song) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!song) {
                res.status(404).send({ message: 'La cancion no existe' });
            } else {
                res.status(200).send({ song: song });
            }
        }
    });

}
function getSongs(req, res) {
    const albumId = req.params.album;
    var find = null;
    if (!albumId) {
        find = Song.find({}).sort('number');
    } else {
        find = Song.find({ album: albumId }).sort('number');
    }
    find.populate({
        path: 'album',
        populate: {
            path: 'artist',
            model: 'Artist'
        }
    }).exec((err, songs) => {
        if (err) {
            res.status(500).send({ message: 'no hay canciones' });
        } else {
            if (!songs) {
                res.status(404).send({ message: 'no existen las canciones' });
            } else {
                res.status(200).send({ songs });
            }
        }
    });
}
function saveSong(req, res) {
    var song = new Song();
    const params = req.body;
    song.number = params.number;
    song.name = params.name;
    song.duration = params.duration;
    song.file = null;
    song.album = params.album;
    song.save((err, songStored) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else {
            if (!songStored) {
                res.status(404).send({ message: 'No se pudo guardar la cancion' });
            } else {
                res.status(200).send({ song: songStored });
            }
        }
    });

}
function updateSong(req, res) {
    const songId = req.params.id;
    const update = req.body;
    Song.findByIdAndUpdate(songId, update, (err, songUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else {
            if (!songUpdated) {
                res.status(404).send({ message: 'No se ha actualizado la cancion' });
            } else {
                res.status(200).send({ song: songUpdated });
            }
        }
    });
}
function deleteSong(req, res){
    const songId = req.params.id;
    Song.findByIdAndDelete(songId, (err, songRemoved) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else {
            if (!songRemoved) {
                res.status(404).send({ message: 'No se ha borrado la cancion' });
            } else {
                res.status(200).send({ song: songRemoved });
            }
        }
    }); 
}
function uploadFile(req, res) {
    const songId = req.params.id;
    var file_name = 'No subido...';
    if (req.files) {
        const file_path = req.files.file.path;
        const file_split = file_path.split('/');
        file_name = file_split[2];
        const ext_split = file_name.split('.');
        const file_ext = ext_split[1];
        if (file_ext == 'mp3' || file_ext == 'ogg') {
            Song.findByIdAndUpdate(songId, {file: file_name}, (err, songUpdated) => {
                if (err) {
                    res.status(500).send({ message: 'Error al actualizar el Album' });
                } else {
                    if (!songUpdated) {
                        res.status(404).send({ message: 'No se ha podido actualizar el Album' });
                    } else {
                        res.status(200).send({ song: songUpdated });
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
function getSongFile(req, res){
    const songFile = req.params.songFile;
    const path_file = './uploads/songs/' + songFile;
    fs.exists(path_file, function(exist){
        if(exist){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la cancion.'});
        }
    });
}
module.exports = {
    getSong,
    saveSong,
    getSongs,
    updateSong,
    deleteSong,
    getSongFile,
    uploadFile
}