var expect    = require("chai").expect;
const MongoClient=require("../common/MongoClient")
var mongoClient=new MongoClient();
var _log=require("../common/wlogger");
const mongo= require("../config");
_log.level="error";

const cryptoObj1={"status":{"timestamp":"2019-10-30T19:57:58.509Z","error_code":0,"error_message":null,"elapsed":11,"credit_count":1,"notice":null},"data":[{"id":1,"name":"Bitcoin","symbol":"BTC","slug":"bitcoin","num_market_pairs":7838,"date_added":"2013-04-28T00:00:00.000Z","tags":["mineable"],"max_supply":21000000,"circulating_supply":18021075,"total_supply":18021075,"platform":null,"cmc_rank":1,"last_updated":"2019-10-30T19:56:33.000Z","quote":{"EUR":{"price":8266.112095808909,"volume_24h":25805158146.545303,"percent_change_1h":0.11414642,"percent_change_24h":-2.07973993,"percent_change_7d":22.27097437,"market_cap":148964226036.97955,"last_updated":"2019-10-30T19:57:00.000Z"}}},{"id":1027,"name":"Ethereum","symbol":"ETH","slug":"ethereum","num_market_pairs":5466,"date_added":"2015-08-07T00:00:00.000Z","tags":["mineable"],"max_supply":null,"circulating_supply":108358750.9365,"total_supply":108358750.9365,"platform":null,"cmc_rank":2,"last_updated":"2019-10-30T19:57:23.000Z","quote":{"EUR":{"price":165.0563128639124,"volume_24h":9844494897.439264,"percent_change_1h":-0.06846651,"percent_change_24h":-2.78159278,"percent_change_7d":14.04915594,"market_cap":17885295896.117706,"last_updated":"2019-10-30T19:57:00.000Z"}}},{"id":52,"name":"XRP","symbol":"XRP","slug":"ripple","num_market_pairs":510,"date_added":"2013-08-04T00:00:00.000Z","tags":[],"max_supply":100000000000,"circulating_supply":43248091671,"total_supply":99991316762,"platform":null,"cmc_rank":3,"last_updated":"2019-10-30T19:57:03.000Z","quote":{"EUR":{"price":0.26573279577461134,"volume_24h":1754575262.5215855,"percent_change_1h":0.06281125,"percent_change_24h":-1.71006604,"percent_change_7d":9.2152636,"market_cap":11492436311.651512,"last_updated":"2019-10-30T19:57:00.000Z"}}},{"id":1831,"name":"Bitcoin Cash","symbol":"BCH","slug":"bitcoin-cash","num_market_pairs":436,"date_added":"2017-07-23T00:00:00.000Z","tags":["mineable"],"max_supply":21000000,"circulating_supply":18085925,"total_supply":18085925,"platform":null,"cmc_rank":4,"last_updated":"2019-10-30T19:57:06.000Z","quote":{"EUR":{"price":259.33502962502513,"volume_24h":3227411546.0275507,"percent_change_1h":-0.63255591,"percent_change_24h":0.02362578,"percent_change_7d":37.67259033,"market_cap":4690313895.670982,"last_updated":"2019-10-30T19:57:00.000Z"}}},{"id":825,"name":"Tether","symbol":"USDT","slug":"tether","num_market_pairs":3741,"date_added":"2015-02-25T00:00:00.000Z","tags":[],"max_supply":null,"circulating_supply":4108044456.1,"total_supply":4207771504.46,"platform":{"id":83,"name":"Omni","symbol":"OMNI","slug":"omni","token_address":"31"},"cmc_rank":5,"last_updated":"2019-10-30T19:57:21.000Z","quote":{"EUR":{"price":0.9000789324710355,"volume_24h":30857751891.46746,"percent_change_1h":-0.2782086,"percent_change_24h":-0.1917021,"percent_change_7d":-0.09968776,"market_cap":3697564268.590044,"last_updated":"2019-10-30T19:57:00.000Z"}}},{"id":2,"name":"Litecoin","symbol":"LTC","slug":"litecoin","num_market_pairs":561,"date_added":"2013-04-28T00:00:00.000Z","tags":["mineable"],"max_supply":84000000,"circulating_supply":63573691.6319711,"total_supply":63573691.6319711,"platform":null,"cmc_rank":6,"last_updated":"2019-10-30T19:57:03.000Z","quote":{"EUR":{"price":52.27429025334104,"volume_24h":3109933640.9356914,"percent_change_1h":-0.16861013,"percent_change_24h":-2.32783457,"percent_change_7d":17.52056154,"market_cap":3323269608.846056,"last_updated":"2019-10-30T19:57:00.000Z"}}},{"id":1765,"name":"EOS","symbol":"EOS","slug":"eos","num_market_pairs":389,"date_added":"2017-07-01T00:00:00.000Z","tags":[],"max_supply":null,"circulating_supply":938082807.8647,"total_supply":1034782819.3227,"platform":null,"cmc_rank":7,"last_updated":"2019-10-30T19:57:07.000Z","quote":{"EUR":{"price":2.952972247317437,"volume_24h":2367816739.4285803,"percent_change_1h":0.42830839,"percent_change_24h":-2.68350769,"percent_change_7d":21.20478547,"market_cap":2770132497.310075,"last_updated":"2019-10-30T19:57:00.000Z"}}}]};
const cryptoRes1='[{"_id":"DUMMY","timestamp":"DUMMY","crypto":[{"crId":1,"crSymbol":"BTC","crName":"Bitcoin","crPrice":8266.112095808909},{"crId":1027,"crSymbol":"ETH","crName":"Ethereum","crPrice":165.0563128639124},{"crId":1831,"crSymbol":"BCH","crName":"Bitcoin Cash","crPrice":259.33502962502513}]}]'

describe("MongoClient test - function getCrypto&storeCrypto", function() {
    // beforeEach(async function() {
    //     mongoClient=new MongoClient();
    //     let conn=await mongoClient.connection();
    //     //TODO: define config profiles. We are going to delete development database data. We need to select a testing database
    //     await conn.db("cryptos").collection("prices").remove({}); 
    // });
        
    it("Collection is empty ", async function() {
        mongoClient=new MongoClient();
        let conn=await mongoClient.connection();
        await conn.db("cryptos").collection("prices").remove({}); 
        var result=await mongoClient.getCrypto();
        var responseData=[];
            var r=await result.forEach((e)=>{
            responseData.push(e);
        });
        expect(JSON.stringify(responseData)).to.equal("[]");
        conn.close();
    });

    it("Collection has 1 element", async function() {
        mongoClient=new MongoClient();
        let conn=await mongoClient.connection();
        await conn.db("cryptos").collection("prices").remove({}); 
        var promise=new Promise((resolve,reject)=>{
            resolve(cryptoObj1);
        });
        await conn.db("cryptos").collection("prices").remove({}); 
        await mongoClient.storeCrypto(promise);
        var result=await mongoClient.getCrypto();
        var responseData=[];
        await result.forEach((e)=>{
          responseData.push(e);
        });
        var strData=JSON.stringify(responseData);
        responseData[0]._id="DUMMY"; //Every time it stores uses a different id and timestamp
        responseData[0].timestamp="DUMMY";
        expect(JSON.stringify(responseData)).to.equal(cryptoRes1);
        conn.close();
    }); 
});

