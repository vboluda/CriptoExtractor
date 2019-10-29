
module.exports={
  port:3000,
  mongo:{
      port:27017,
      ip:"192.168.1.108",
      timeresults: 100*60*1000 //100 min in millis
  },
  redis:{
    port:6379,
    ip:"192.168.1.108",
    expire: 60
  },
  server:{
    port:10010,
    wsInterval: 30000
  },
  currencies:["BTC","ETH","BCH"],
  cron:{
    dataUpdate:"01 * * * * *",
    mailSend:"05 44 * * * *"
  },
  thirdpartyapi:{
      method: 'GET',
      uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      qs: {
        'start': '1',
        'limit': '7',
        'convert': 'EUR'
      },
      headers: {
        'X-CMC_PRO_API_KEY': '21e53404-7214-4b0a-9269-695668b9653a'
      },
      json: true,
      gzip: true
  },
  mailer:{
    transport:{
      service: 'gmail',
      auth: {
        user: 'sferesafetymodule@gmail.com',
        pass: 'Getronics2019!'
      }
    },
    from:"vicente.boludavias@gmail.com",
    to:["vicente.boludavias@gmail.com"],
    title: "INFORMACIÓN DE CRIPTODIVISAS / CRYPTOCURRENCY INFORMATION"
  }
}