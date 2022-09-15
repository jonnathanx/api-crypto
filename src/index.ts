import express from 'express'
import currenciesRoutes from './currency/v1/routes/currenciesRoutes'
import { db } from './config/database'
//import Sequelize from "sequelize"
const app = express()
const PORT = process.env.PORT || 3000

// Middleware request a json
app.use(express.json())

// Rutas
app.use('/api/v1', currenciesRoutes)

//Conexion a MySQL
const main = async() => {
    try {
        await db.authenticate()
        console.log('Conexion estblecida satisfactoriamente.')

    } catch (ex) {
        console.log(ex)
    }
}
main()

// db.sync().then(()=>{
//     console.log('Connect to MySQL')
//     }).catch(error => {
//         console.log(error)
//     })


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})