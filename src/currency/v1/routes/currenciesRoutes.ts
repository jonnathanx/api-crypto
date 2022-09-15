import express from 'express'
import * as currenciesController from '../../controllers/currenciesController'

const router = express.Router()

router
    .get('/currencies', currenciesController.getAllCurrencies)
    .post('/rates', currenciesController.createRates)
    .post('/currencies', currenciesController.createCurrencies)
    .get('/rates', currenciesController.getAllRates)
    .get('/rates/:symbol', currenciesController.getRate)

export default router
