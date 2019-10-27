'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
//VBVB Added to serve static content
var app = express();
module.exports = app; // for testing
var _log=require("../common/wlogger");
var conf=require("../config");
var socket=require("socket.io");
const dataProvider=require("../common/dataProvider");
var provider=new dataProvider();


var config = {
  appRoot: __dirname // required config
};

//VBVB Added to serve static content
app.use(express.static("./static/",{}));


SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = conf.server.port;
  var server=app.listen(port);
 


  if (swaggerExpress.runner.swagger.paths['/crypto']) {
    _log.info("Server is running");
  }

  //VBVB Web Socket
  var io=socket(server);
  setInterval(()=>{
    provider.getData().then((r)=>{
      io.sockets.emit("cryptomsg",r);
    },
    (e)=>{
      io.sockets.emit("cryptomsg",{"error":"dataprovider","msg":e.message});
    })
    
  },conf.server.wsInterval)

   io.on("connection",function(socket){
     _log.info("WS connection stablished"+socket.id);
     
   })
});


