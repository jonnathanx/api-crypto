//import { Currency } from '../interfaces/currency.interface';


import * as  currenciesServices  from '../services/currenciesServices'

export const getAllCurrencies = async (req, resp) => {    
    const allCurrencies = await currenciesServices.getAllCurrencies()
    .then(x => x
        //resp.send(x)
     ).catch( error=> error);    
    resp.send(allCurrencies)
}

export const createCurrencies = async (req, resp)=> {
    // const createCurrencies = currenciesServices.createCurrencies(req.body)
    // resp.send(createCurrencies)
    const createCurrencies = await currenciesServices.createCurrencies(req.body)
    .then(x => x
        //resp.send(x)
     ).catch( error=> error);
     
     resp.send(createCurrencies )
}

export const createRates =  async (req, resp) => {
    const createRates = await currenciesServices.createRates(req.body)
    .then(x => x)
    .catch( error=> error)       
    resp.send(createRates)
}

export const getAllRates = async (req, resp) => {    
    const allRates = await currenciesServices.getAllRates()
    resp.send(JSON.stringify(allRates))
}

export const getRate = async (req, resp) => {    
    console.log(req.params.symbol)
    const rate = await currenciesServices.getRate(req.params.symbol)
        
    resp.send(rate)
}