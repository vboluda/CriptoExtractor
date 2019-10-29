"use strict";
// Get configuration file
const conf=require("../config");
var cron=require("cron").CronJob;
const ApiCall=require("./modules/cryptoApiCall");
const Mongo=require("../common/MongoClient")
var _log=require("../common/wlogger");
const Mailer=require("../common/mailer");
const ComposeMsg=require("./modules/composeMsg");
const dataProvider=require("../common/dataProvider");


var mailer=new Mailer();
var composeMsg=new ComposeMsg();
var provider=new dataProvider();

function mainBatch(){
    _log.info("--- Start batch ---");
    var apicall=new ApiCall(conf.thirdpartyapi);
    var mongo=new Mongo();

    new cron(conf.cron.dataUpdate,() =>{
        let stime=Date.now();
        _log.info("---  START PROCESS ---");
        let crypto=apicall.retrieveCryptoInfo();
        mongo.storeCrypto(crypto);
        _log.info(`--- END PROCESSS --- (in ${Date.now()-stime} millis)`);
    },null,true,"Europe/Madrid");

    new cron(conf.cron.mailSend,() =>{
        let stime=Date.now();
        _log.info("---  START MAIL ---");
        //mailer.send("TÍTULO","Pruenba de envio de mensaje\ncon salto de página");
        _log.info("Called crypto API");
        provider.getData().then((r)=>{
            var message=composeMsg.getES(r);
            _log.debug("Generated: "+message);
            mailer.send(message);
        },
        (e)=>{
            _log.error(e.message);
        })
        _log.info(`--- END MAIL --- (in ${Date.now()-stime} millis)`);
    },null,true,"Europe/Madrid");

};

module.exports=mainBatch;

