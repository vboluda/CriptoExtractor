
module.exports={
  port:3000,
  mongo:{
      port:27017,
      ip:"192.168.1.108",
      user:"crypto",
      password:"crypto01api!"
  },
  currencies:["BTC","ETH","BCH"],
  cron:"01 * * * * *",
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
  }
}