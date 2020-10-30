const app = require('./app')  // Express aplikacija
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.info(`Server je pokrenut na portu ${config.PORT}`)
})
/*
(
function() {
    var childProcess = require("child_process");
    var oldSpawn = childProcess.spawn;
    function mySpawn() {
        console.log('spawn called');
        console.log(arguments);
        var result = oldSpawn.apply(this, arguments);
        return result;
    }
    childProcess.spawn = mySpawn;
}) ();

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
*/

let adresar = [
    {
        id: 1,
        ime: 'Ante Antic',
        mail: 'ante@gmail.com'
    },
    {
        id: 2,
        ime: 'Ivan Ivić',
        mail: 'ivan@gmail.com'
    }
]

/*
app.get('/', (req, res) => {
    res.send('<h1>Pozdrav od Express servera</h1>')
})

app.get('/api/adresar', (req, res) => {
    Poruka.find({}).then(rez => {
        res.json(rez)
    })
})

app.get('/api/adresar/:id', (req, res, next) => {
    Poruka.findById(req.params.id)
    .then(poruka => {
        if(poruka){
            res.json(poruka)
        }else{
            res.status(404).end()
        }
    })
    .catch(error => {next(error)})
})

app.delete('/api/adresar/:id', (req, res) => {
    Poruka.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(err => next(err))
})

const generirajId = () => {
    const maxId = adresar.length > 0
        ? Math.max(...adresar.map(p => p.id))
        : 0
    return maxId + 1
}
*/

/* prebaceno u middleware.js
const zahtjevInfo = (req, res, next) => {
    console.log('Metoda:', req.method)
    console.log('Putanja:', req.path)
    console.log('Tijelo:', req.body)
    console.log('---')
    next()
}
app.use(zahtjevInfo)

const nepoznataRuta = (req, res) => {
    response.status(404).send({ error: 'nepostojeca ruta' })
}
app.use(nepoznataRuta)

const errorHandler = (err, req, res, next) => {
    console.log(err.message);

    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'krivi format ID-a' })
    } else if (err.name === 'ValidationError') {
        return res.status(400).send({ error: err.message })
    }
    next(err)
}

function zadnjiErrorHandler(err, req, res, next) {
    res.status(500)
    res.send('error', { error: err })
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Posluzitelj je pokrenut na portu ${PORT}`);
})

*/
