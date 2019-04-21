'use strict'
const mongoose = require("mongoose");
const app = require('./app');
const port = process.env.PORT || 3977;
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/curso_mean2",{ useNewUrlParser: true }, (err, res) => {
    if(err){
        throw err;
    }else{
        //console.log("La base de datos esta correcta!");
        app.listen(port, function(){
            console.log('servidor escuchando en el puerto', port);
        });
    }
});