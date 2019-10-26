
// Get configuration file
const conf=require("../config");
var cron=require("cron").CronJob;
const ApiCall=require("./modules/cryptoApiCall");
const Mongo=require("../common/MongoClient")
var _log=require("../common/wlogger");

_log.info("--- Start application ---");
var apicall=new ApiCall(conf.thirdpartyapi);
var mongo=new Mongo();

new cron(conf.cron,() =>{
    let stime=Date.now();
    _log.info("---  START PROCESS ---");
    let crypto=apicall.retrieveCryptoInfo();
    mongo.storeCrypto(crypto);
    _log.info(`--- END PROCESSS --- (in ${Date.now()-stime} millis)`);
},null,true,"Europe/Madrid");

// var apicall=new ApiCall(conf.thirdpartyapi);
// var mongo=new Mongo(conf.mongo);

// var crypto=apicall.retrieveCryptoInfo();
// mongo.storeCrypto(crypto);

