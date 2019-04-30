'use strict'
const express = require('express');
const api = express.Router();
api.get('/', (req, res) => {
    res.send({
        'Api usage': [
            {url: 'api/probando-controlador'},
            {url: 'api/register'},
            {url: 'api/login'}, 
            {url: 'api/update-user/:id'},
            {url: 'api/upload-image-user/:id'},
            {url: 'api/get-image-user/:imageFile'}
        ]
    });
});
module.exports = api;