import { LightningElement } from 'lwc';
import {countryCodeList} from 'c/currencyCode';
import currencyconvertimg from '@salesforce/resourceUrl/currencyconvertimg';
import convercurrency from'@salesforce/apex/CurrencyConverter.convertCurrency';
export default class CurrencyConverter extends LightningElement {
    currencycodelist=countryCodeList ;
    countryfrom="USD";
    countryto="AUD";
    amount;
    finalresult;
    Err;
    curImg=currencyconvertimg +'/currencyConverterAssets/currency.svg';
    get isDisabled() {
        return !this.amount || this.amount <= 0;
    }
    handleChange(event){
        const {name, value}=event.target;
        console.log("name==>",name);
        console.log("value",value);
        if(name === "Country From"){
            this.countryfrom=value;
            console.log("countryfrom",this.countryfrom);
        }
        if(name==="Country To"){
            this.countryto=value;
            console.log("countryto",this.countryto);
        }
    }
    handleClick(event){
       event.preventDefault();
       this.convert();
    }
    AmountChange(event){
        this.amount=parseFloat(event.target.value);
    }
   async convert(){
        
        try {
            const result=await  convercurrency({countryFrom:this.countryfrom,countryTo:this.countryto,amount:this.amount});
            console.log("apex val",result);
            this.finalresult=(result*this.amount).toFixed(2);
            console.log("Val",this.finalresult);
        } catch (error) {
            console.log(error);
            this.Err=error;
        }
    }
}