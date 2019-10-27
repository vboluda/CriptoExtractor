"use strict";

var _log=require("./wlogger");
const Mongo=require("./MongoClient");
const RedisClient=require("./RedisClient");

var mongo=new Mongo();
var redis=new RedisClient();

class dataProvider{
    constructor(){
    }

    getData(){
        return new Promise((resolve,reject)=>{
            redis.getCryptoCache().then((r)=>{
                if(!r){
                    _log.debug("Expired!!!!");
                    mongo.getCrypto().then((result) =>{
                      var responseData=[];
                      result.forEach((e)=>{
                        responseData.push(e);
                      }).then((result) =>{
                        console.log("Response: "+JSON.stringify(responseData));
                        redis.storeCryptoCache(result).then((r)=>{
                          console.log("Stored: "+r);
                          resolve(responseData);
                        },(error) =>{
                            reject(error);
                        })
                      },(error) =>{
                        reject(error);
                      });
                    },
                    (error)=>{
                        reject(error);
                    });
                }
            },(e)=>{
                console.error(e);
            });
        });
    }
}

module.exports=dataProvider;