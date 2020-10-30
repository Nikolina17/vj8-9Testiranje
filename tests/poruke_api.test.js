const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const pomocni = require('./test_pomocni')

const api = supertest(app)


const pocetnePoruke = [
    {
        id: 1,
        sadrzaj: 'HTML je jednostavan',
        datum: '2019-05-30T17:30:31.098Z',
        vazno: true
    },
    {
        id: 2,
        sadrzaj: 'React koristi JSX sintaksu',
        datum: '2019-05-30T18:39:34.091Z',
        vazno: false
    },
    {
        id: 3,
        sadrzaj: 'GET i POST su najvaznije metode HTTP protokola',
        datum: '2019-05-30T19:20:14.298Z',
        vazno: true
    }
]

const Poruka= require('../models/poruka')
beforeEach(async () => {
    await Poruka.deleteMany({})
    let objektPoruka = new Poruka(pomocni.pocetnePoruke[0])
    await objektPoruka.save()
    objektPoruka = new Poruka(pomocni.pocetnePoruke[1])
    await objektPoruka.save()
    objektPoruka = new Poruka(pomocni.pocetnePoruke[2])
    await objektPoruka.save()
})


test('dodavanje ispravne poruke', async () => {
    const novaPoruka = {
        sadrzaj: 'async/await olaksava asinkrone pozive',
        vazno: true
    }
    await api
        .post('/api/adresar')
        .send(novaPoruka)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const porukeNaKraju = await pomocni.porukeIzBaze()
    expect(porukeNaKraju).toHaveLength(pomocni.pocetnePoruke.length + 1)
    const sadrzaj = porukeNaKraju.map(p => p.sadrzaj)
    expect(sadrzaj).toContain('async/await olaksava asinkrone pozive')
})


test('dodavanje poruke bez sadrzaja', async () => {
    const novaPoruka = { vazno: true }
    await api
        .post('/api/adresar')
        .send(novaPoruka)
        .expect(400)

    const porukeNaKraju = await pomocni.porukeIzBaze()
    expect(porukeNaKraju).toHaveLength(pomocni.pocetnePoruke.length)

})

test('dohvat specificne poruke', async () => {
    const porukePocetak = await pomocni.porukeIzBaze()
    const trazenaPoruka = porukePocetak[0]

    const odgovor = await api
        .get(`/api/adresar/${trazenaPoruka.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const jsonPoruka = JSON.parse(JSON.stringify(trazenaPoruka))
    expect(odgovor.body).toEqual(jsonPoruka)
})

test('ispravno brisanje poruke', async () => {
    const porukePocetak = await pomocni.porukeIzBaze()
    const porukaZaBrisanje = porukePocetak[0]

    const odgovor = await api
        .delete(`/api/adresar/${porukaZaBrisanje.id}`)
        .expect(204)

    const porukeKraj = await pomocni.porukeIzBaze()
    expect(porukeKraj).toHaveLength(porukePocetak.length - 1)

    const sadrzaj = porukeKraj.map(p => p.sadrzaj)
    expect(sadrzaj).not.toContain(porukaZaBrisanje.sadrzaj)

})

test('dohvaća sve poruke', async () => {
    const odgovor = await api.get('/api/adresar')

    expect(odgovor.body).toHaveLength(pomocni.pocetnePoruke.length)
})

afterAll(() => {
    mongoose.connection.close()
})