require('dotenv').config()

const PORT = process.env.PORT

// Baza podataka
const password = process.env.ATLAS_PASS
//const dbname = 'adresar-api'
const dbname = process.env.NODE_ENV === 'test' ? 'db-test' : 'adresar-api'
const DB_URI = `mongodb+srv://Nikolina:${password}@cluster0.k3qu1.mongodb.net/${dbname}?retryWrites=true&w=majority`

module.exports = { PORT, DB_URI }