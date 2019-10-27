"use strict";

const conf = require("../config");
var _log=require("./wlogger");
var redisClient = require('redis');
const cacheString= "___CRYPTOS__";

class RedisClient{

    constructor(){
        this.redis=redisClient.createClient({port: conf.redis.port,host: conf.redis.ip});
        this.client=null;
        this.redis.on('error', function (err) {
            _log.error("Error in redis client creation: "+err);
        });

        this.redis.on('connect', () => {
            _log.info("REDIS:  connection created");
            this.client=this.redis;
        });
    }

    getCryptoCache(){
        return new Promise((resolve,reject)=>{
            if(!this.client){ //Not connected yet. We answer we cannot serve this information
                resolve(null);
            }
            this.client.get(cacheString,(err,reply) =>{
                if(err){
                    reject(err);
                }
                resolve(JSON.parse(reply));
            });
        });
    }

    storeCryptoCache(obj){
        return new Promise((resolve,reject)=>{
            if(!this.client){ //Not connected yet. We cannot use cache yet
                _log.debug("REDIS: Cannot insert. Not connected yet");
                    resolve(null);
            }
            _log.debug("REDIS: Inserting new entry");
            this.client.set(cacheString,JSON.stringify(obj),(err,reply) =>{
                this.client.expire(cacheString, conf.redis.expire);
                _log.debug("REDIS: Inserted new entry");
                
                    if(err){
                        reject(err);
                    }
                    resolve(reply);
            });
        });
    }



}

module.exports=RedisClient;
