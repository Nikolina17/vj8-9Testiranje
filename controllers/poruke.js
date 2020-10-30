const porukeRouter = require('express').Router()
const Poruka = require('./models/poruka')


porukeRouter.get('/', (req, res) => {
    Poruka.find({}).then(rezultat => {
        res.json(rezultat)
    })
})


porukeRouter.get('/:id', async(req, res) => {
    const poruka = await Poruka.findById(req.params.id)
            if (poruka) {
                res.json(poruka)
            } else {
                res.status(404).end()
            }
})

porukeRouter.delete('/:id', async(req, res) => {
    await Poruka.findByIdAndRemove(req.params.id)
    res.status(204).end()
    
})

porukeRouter.post('/', async (req, res, next) => {
    const podatak = req.body

    const poruka = new Poruka({
        ime: podatak.ime,
        mail: podatak.mail
    })
    const spremljenaPoruka = await poruka.save()
    res.json(spremljenaPoruka)
    
})


porukeRouter.put('/:id', (req, res) => {
    const objekt = req.body
    const id = Number(req.params.id)
    adresar = adresar.map(p => p.id !== id ? p : objekt)
    res.json(objekt)
})


module.exports = porukeRouter