const express = require('express');
const routes = require('./routes');
const mongoose =require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({path:'var.env'});

//cors permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require('cors');

//conectar a mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser : true
});

//crer el servidor
const app = express();

//carpeta publica
app.use(express.static('uploads'));

//habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Definir un dominio(s) para recibir las peticiones
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, callback) => {
        //caso particular de postman
        if(typeof(origin)==='undefined'){
            callback(null, true);
        }else{
            //Revisar si la peticion viene de un servidor que esta en la lisya blanca
            const exist = whiteList.some(dominio => dominio === origin);
            if(exist){
                callback(null, true);
            }else{
                callback(new Error('No permitido por CORS' + origin)); 
            }
        }
    }
}

//Habilitar cors
app.use(cors(corsOptions));

//rutas de la APP
app.use('/', routes());

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;
//puerto
app.listen(port,host,()=>{
    console.log('El servidor esta funcionando');
});


