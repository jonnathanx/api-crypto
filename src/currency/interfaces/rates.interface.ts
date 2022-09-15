import  Currency  from './currency.interface';
export interface Rates {
    id: number;
    id_currency: number;
    value: number;
    currency: Currency;
}