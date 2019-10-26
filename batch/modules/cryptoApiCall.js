const rp = require('request-promise');
var _log=require("../../common/wlogger");

class cryptoApiCall {

    constructor(opts){
        this.opts= opts || {};
    }

    retrieveCryptoInfo(){
        return new Promise((resolve,reject)=>{
            rp(this.opts).then(response => {
                resolve(response);
            }).catch((err) => {
                _log.debug('API call error:', err);
                reject(err);
            });
        });
    }
}

module.exports=cryptoApiCall;