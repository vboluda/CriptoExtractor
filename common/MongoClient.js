"use strict";

var MongoClient = require('mongodb').MongoClient;
//const conf=require("../config").mongo;
const {mongo, currencies } = require("../config");

var _log=require("./wlogger");

class MongoConnector {

    constructor(){
        this.mongoUrl=`mongodb://${mongo.ip}:${mongo.port}/`;
        this.mongo=null;
    }

    async connection(){
        if(this.mongo){
            _log.debug("Mongo connection created. Reusing");
            return this.mongo;
        }
        this.mongo= MongoClient.connect(this.mongoUrl, { promiseLibrary: Promise });
        return this.mongo;
    };

    storeCrypto(crypto){
        crypto.then(async (result) =>{
            var conn=await this.connection();
            _log.debug('Processing crypto data');
            var data=result.data;
            var mongoElement={timestamp:(new Date()),crypto:[]};
            data.forEach((crypto) =>{
                _log.debug(`[${crypto.name}]:${crypto.quote.EUR.price}`);
                if(currencies.includes(crypto.symbol)){
                    var obj={
                        crId:crypto.id,
                        crSymbol:crypto.symbol,
                        crName:crypto.name,
                        crPrice:crypto.quote.EUR.price
                    };
                    mongoElement.crypto.push(obj);
                }
            });
            var res= conn.db("cryptos").collection("prices").insertOne(mongoElement);
            _log.debug('End Processing crypto data');
        },function(err){
            //_log.debug('API call error:', err);
        });
    }

    async getCrypto(){
        var conn=await this.connection();
        let tm=new Date(new Date()-mongo.timeresults);
        _log.debug(`Getting crypto data newer than ${tm}`);
        return conn.db("cryptos").collection("prices").find({timestamp:{$gt : tm}});
    }
}


module.exports=MongoConnector;