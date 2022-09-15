import { Currency } from '../interfaces/currency.interface'
import { Rates } from '../interfaces/rates.interface'
import { db } from "../../config/database"
import { QueryTypes } from "sequelize"
//import { Response } from '../models/rates.model'
//import { Rate } from '../interfaces/rate.interface';

// export const getAllCurrencies = (): String => { return 'getAllCurrencies Desde el Service' }

export const getAllCurrencies = () => {
    return new Promise((resolve, reject) => {
        db.query<Currency>("SELECT id, description, symbol FROM currencies", { type: QueryTypes.SELECT })
        .then( x => resolve(x))
        .catch( error => {
            reject(error)
            console.error()
        })
    })
}

export const createCurrencies = (data : Currency) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO currencies (`description`,`symbol`) VALUES (?, ?);', {
            replacements: [data.description, data.symbol],
            type: QueryTypes.INSERT
        })
        .then( x => resolve(x))
        .catch( error => {
            reject(error)
            console.error()
        })
    })
}

export const createRates = (data ) => { 
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO currencies_details (`id_currency`,`value`) VALUES (?, ?);', {
            replacements: [data.id_currency, data.value],
            type: QueryTypes.INSERT
        })
        .then( x => resolve(x))
        .catch( error => {
            reject(error)
            console.error()
        })
    })
}

export const getRate = (data) => {     
    return new Promise((resolve, reject) => {
    db.query(`
            SELECT CONCAT('[', result, ']') AS oResult FROM
            (
            SELECT GROUP_CONCAT('{', jsonObject, '}' SEPARATOR ',') AS result FROM
            (
            SELECT 
            CONCAT
            (
                '"id":'   , '"', cd.id   , '"', ',' 
                '"id_currency":', '"', cd.id_currency, '"', ','
                '"value":', '"', cd.value, '"', ',',
                '"created_at":', '"', cd.created_at, '"', ',',      
                    CONCAT(
                    '"currency": {
                "id":'   , '"', c.id , '"', ','
                '"description":'   , '"', c.description , '"', ','
                    '"symbol":'   , '"', c.symbol , '" }') 
                            
            ) AS jsonObject
            FROM currencies c INNER JOIN currencies_details cd
            ON c.id = cd.id_currency
            WHERE c.symbol = ?
            ) AS jsonResult
            ) AS jsonResultA
    `, { 
        replacements: [data],
        type: QueryTypes.SELECT })
    .then( x => resolve(x))
    .catch( error => {
        reject(error)
        console.error()
    })
}) }

export const getAllRates = () => { 
    return new Promise((resolve, reject) => {
        db.query<Rates>(`
        
        SELECT CONCAT('[', result, ']') AS oResult FROM
        (
        SELECT GROUP_CONCAT('{', jsonObject, '}' SEPARATOR ',') AS result FROM
        (
          SELECT 
            CONCAT
            (
              '"id":'   , '"', cd.id   , '"', ',' 
              '"id_currency":', '"', cd.id_currency, '"', ','
              '"value":', '"', cd.value, '"', ',',
              '"created_at":', '"', cd.created_at, '"', ',',      
                 CONCAT(
                 '"currency": {
                "id":'   , '"', c.id , '"', ','
                '"description":'   , '"', c.description , '"', ','
                    '"symbol":'   , '"', c.symbol , '" }') 
                          
            ) AS jsonObject
          FROM currencies c INNER JOIN currencies_details cd
          ON c.id = cd.id_currency ORDER BY cd.created_at DESC
        ) AS jsonResult
        ) AS jsonResultA;        
        `, {             
            type: QueryTypes.SELECT  
        })
        .then( x => resolve(x))
        .catch( error => {
            reject(error)
            console.error()
        })
    })
 }
