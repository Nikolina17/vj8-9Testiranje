const Poruka = require('../models/poruka')

const pocetnePoruke = [
    // ...
]

const porukeIzBaze = async () => {
    const poruke = await Poruka.find({})
    return poruke.map(p => p.toJSON())
}


module.exports = {
    pocetnePoruke, porukeIzBaze
}