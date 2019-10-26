var MongoClient = require('mongodb').MongoClient;
const conf=require("../config");
var _log=require("./wlogger");

class MongoConnector {

    constructor(conf){
        this.conf= conf || {};
        this.mongoUrl=`mongodb://${conf.ip}:${conf.port}/`;
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
                if(conf.currencies.includes(crypto.symbol)){
                    var obj={
                        _id:crypto.id,
                        symbol:crypto.symbol,
                        name:crypto.name,
                        price:crypto.quote.EUR.price
                    };
                    mongoElement.crypto.push(obj);
                }
                //var res= conn.db("cryptos").collection("prices").insertMany
            });
            var res= conn.db("cryptos").collection("prices").insertOne(mongoElement);
            _log.debug('End Processing crypto data');
        },function(err){
            //_log.debug('API call error:', err);
        });
    }
}


module.exports=MongoConnector;