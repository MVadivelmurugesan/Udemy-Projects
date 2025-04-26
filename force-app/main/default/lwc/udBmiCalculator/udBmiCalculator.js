import { LightningElement } from 'lwc';

export default class UdBmiCalculator extends LightningElement {

    height;
    weight;
    Bmi;
    result;

    inputhandler(event){
        const{name,value}=event.target;
        if (name === "height") {
            this.height=value;
        }
        if(name === "weight"){
            this.weight=value;
        }
    }
    submithandler(event){
        event.preventDefault();
        console.log(this.height);
        console.log(this.weight);
    }
    calculate(){
        let height=this.height/100;
        let Bm=this.weight/(height*height);
        console.log("bmi",Bm);
        this.Bmi=Bm.toFixed(2);

        if(this.Bmi < 18.5 ){
            this.result="Under Weight";
        }else if( this.Bmi >= 18.5 && this.Bmi < 25 ){
            this.result="Good Healthy";
        }else if(this.Bmi >= 25 && this.Bmi > 30){
            this.result="Over Weight"
        }else{
            this.result="Obese";
        }
        console.log("result",this.result);
    }
    recalculate(){
        this.result=null;
        this.Bmi=null;
        this.height=null;
        this.weight=null;
    }

}