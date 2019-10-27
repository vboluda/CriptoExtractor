"use strict";
var _log=require("../../../common/wlogger");
const dataProvider=require("../../../common/dataProvider");
var provider=new dataProvider();

module.exports = {
    cryptoApi: crypto
};
  
  function crypto(req, res) {
    _log.info("Called crypto API");
    provider.getData().then((r)=>{
      res.json(r);
    },
    (e)=>{
      res.json({"error":"dataprovider","msg":e.message});
    })
  
   
  }