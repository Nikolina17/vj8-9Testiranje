const mongoose = require('mongoose')

//const password = 'lozinka1'
//const dbname = 'adresar-api'
//const url = 'mongodb+srv://Nikolina:lozinka1@cluster0.k3qu1.mongodb.net/adresar-api?retryWrites=true&w=majority'
//const url = 'mongodb+srv://Nikolina:${password}@cluster0.k3qu1.mongodb.net/${dbname}?retryWrites=true&w=majority'

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

const porukaSchema = new mongoose.Schema({
    ime: String,
    mail: String
})

const Poruka = mongoose.model('Poruka', porukaSchema, 'poruke')

Poruka.find({})
    .then(result => {
        result.forEach(poruka => {
            console.log(poruka)
        })
        mongoose.connection.close()
    })

/*
const novaPoruka = new Poruka({
    ime: 'Nikolina Ajduk',
    mail: 'nikolina@gmail.com'
})
novaPoruka.save()
    .then(result => {
        console.log('Poruka spremljena')
        console.log(result);
        mongoose.connection.close()
    })
*/
