
const rp = require('request-promise');
const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    'start': '1',
    'limit': '5',
    'convert': 'EUR'
  },
  headers: {
    'X-CMC_PRO_API_KEY': '21e53404-7214-4b0a-9269-695668b9653a'
  },
  json: true,
  gzip: true
};

rp(requestOptions).then(response => {
  console.log('API call response:', JSON.stringify(response));
}).catch((err) => {
  console.log('API call error:', err.message);
});
