const mongoose = require('mongoose')
/*
const password = process.env.ATLAS_PASS
const dbname = 'adresar-api'
const url = `mongodb+srv://Nikolina:${password}@cluster0.k3qu1.mongodb.net/${dbname}?retryWrites=true&w=majority`
console.log("Spajamo se na bazu")

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(result => {
    console.log("Spojeni smo na bazu");
}).catch(error => {
    console.log("Greska pri spajanju", error.message);
})
*/

const porukaSchema = new mongoose.Schema({
    ime: {
        type: String,
        minlength: 3,
        required: true
    },
    mail: {
        type: String,
        required: true
    }
})
porukaSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = doc._id.toString()
        delete ret._id
        delete ret.__v
        return ret
    }
})

module.exports = mongoose.model('Poruka', porukaSchema, 'poruke')