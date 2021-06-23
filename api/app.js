const express = require('express');
const logger = require('morgan');
const http = require('http');
const cors = require('cors');
const redis = require('redis');

// creando la app
const app = express();

// Creando cliente redis
var redisClient = redis.createClient({
    port: 6379,
    host: 'db'
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use(cors());

// Logueo de peticiones
app.use(logger('dev'));

// Parseando la data entrante
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//ruta de prueba
app.get('/', (req, res)=>{
    return res.status(200).send({message: 'Bienvenido a tu api de Star Wars'});
});

app.post('/saveCharacter', (req, res)=>{

    let character = req && req.body && req.body.character ? req.body.character : null;
    let episode = req && req.body && req.body.episode ? req.body.episode : null;
    let message = 'El servidor tiene dificultades.';
    let code = 500;

    if(character == null || episode == null){
        message = 'Debe proporcionar Personaje y episodio';
        code = 400;
    } else {
        redisClient.lpush(episode, [character]);
        message = 'Su personaje se ha guardado correctamente';
        code = 200;
    }

    return res.status(code).send({message: message});
});


app.get('/getEpisodes', (req, res)=>{
    redisClient.keys('*',(error,reply)=>{
        if(error){
            return res.status(400).send({message: 'Hubo un error al intentar obtener los episodios', reply: []});
        } else {
            let parsedReply = [];
            if(reply && reply.length > 0){
                parsedReply = reply.filter(episode =>{
                    return episode.includes('episodio');
                });
                parsedReply.sort();
                return res.status(200).send({message:'Episodios encontrados', reply: parsedReply});
            }
        }
    });
});

app.get('/getCharactersByEpisode',(req, res)=>{
    redisClient.lrange(req.query.episode, 0, -1,(error, reply)=>{
        if(error){
            return res.status(400).send({message: 'Hubo un error al intentar obtener los personajes', reply: []});
        } else {
            console.log(reply);
            reply.sort();
            return res.status(200).send({message:'Personajes encontrados', reply: reply});
        }
    })
})

app.delete('/deleteCharacter', (req, res)=>{
    let character = req && req.body && req.body.character ? req.body.character : null;
    let episode = req && req.body && req.body.episode ? req.body.episode : null;
    let message = 'El servidor tiene dificultades.';
    let code = 500;

    if(character == null || episode == null){
        message = 'Debe proporcionar Personaje y episodio';
        code = 400;
        return res.status(code).send({message: message});
    } else {
        redisClient.lrem(episode, 1, character,(error, reply)=>{
            if(error){
                return res.status(400).send({message: 'Hubo un error al intentar borrar el personaje', reply: []});
            } else {
                console.log(reply);
                return res.status(200).send({message:'El personaje se ha eliminado correctamente', reply: reply});
            }
        });
    }
})

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

redisClient.on('connect', function(){
    console.log('Conectado a Redis Server');
})

module.exports = app;