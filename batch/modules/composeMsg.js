"use strict";
var _log=require("../../common/wlogger");

class composeMsg {
    constructor(){}

    plainJson(crypto){
        var currencies=[];
        crypto.forEach(entry => {
            var obj={};
            obj.timestamp=entry.timestamp;
            entry.crypto.forEach(crypto =>{
                obj[crypto.crSymbol]=crypto.crPrice;
            });
            currencies.push(obj);
        });
        return currencies;
    }
    // Better if we use a template engine
    getES(crypto){
        var plainCurr=this.plainJson(crypto);
        var currStr="Información sobre  criptomonedas / Cryptocurrency report\n";
        currStr+="Prueba realizada para bit2me.com / test carried out for bit2me.com\n\n";
        currStr+="TIMESTAMP\t\t\t\t\tBitcoin\t\t\tEthereum\t\tBitcoin Cash\n";
        currStr+="---------------------------------------------------------------------------------------------------------------------------------------------\n";
        plainCurr.forEach((c) =>{
            var dt=new Date(c.timestamp).toISOString().
            replace(/T/, ' ').      // replace T with a space
            replace(/\..+/, '');
            currStr+=`${dt}\t\t\t${+c.BTC}\t${+c.ETH}\t${+c.BCH}\n`;
        });
        return currStr;
    }
}
module.exports=composeMsg;