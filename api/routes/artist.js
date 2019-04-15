'use strict'
const express = require('express');
const ArtisController = require('../controllers/artist');
const api = express.Router();
const md_auth = require('../middlewares/authenticated');
const multipart = require('connect-multiparty');
const md_upload = multipart({uploadDir: './uploads/artists'});
api.get('/artists/:page?', md_auth.ensureAuth, ArtisController.getArtists);
api.get('/artist/:id', md_auth.ensureAuth, ArtisController.getArtist);
api.post('/artist', md_auth.ensureAuth, ArtisController.saveArtist);
api.put('/artist/:id', md_auth.ensureAuth, ArtisController.updateArtist);
api.delete('/artist/:id', md_auth.ensureAuth, ArtisController.deleteArtist);
api.post('/upload-image-artist/:id', [md_auth.ensureAuth, md_upload], ArtisController.uploadImage);
api.get('/get-image-artist/:imageFile', md_auth.ensureAuth, ArtisController.getImageFile);
module.exports = api;