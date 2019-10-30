var expect    = require("chai").expect;
const ComposeMsg=require("../batch/modules/composeMsg");

var composeMsg=new ComposeMsg();

var value0=[];

var value1=[
	{ "timestamp" : "2019-10-29T19:50:01.452Z", "crypto" : [ { "crId" : 1, "crSymbol" : "BTC", "crName" : "Bitcoin", "crPrice" : 8309.724885181198 }, { "crId" : 1027, "crSymbol" : "ETH", "crName" : "Ethereum", "crPrice" : 168.13545031312205 }, { "crId" : 1831, "crSymbol" : "BCH", "crName" : "Bitcoin Cash", "crPrice" : 259.393515185236 } ] }
];

var value2=[
	{ "timestamp" : "2019-10-29T19:50:01.452Z", "crypto" : [ { "crId" : 1, "crSymbol" : "BTC", "crName" : "Bitcoin", "crPrice" : 8309.724885181198 }, { "crId" : 1027, "crSymbol" : "ETH", "crName" : "Ethereum", "crPrice" : 168.13545031312205 }, { "crId" : 1831, "crSymbol" : "BCH", "crName" : "Bitcoin Cash", "crPrice" : 259.393515185236 } ] },
	{ "timestamp" : "2019-10-29T19:51:01.264Z", "crypto" : [ { "crId" : 1, "crSymbol" : "BTC", "crName" : "Bitcoin", "crPrice" : 8310.608531141226 }, { "crId" : 1027, "crSymbol" : "ETH", "crName" : "Ethereum", "crPrice" : 168.30560198415677 }, { "crId" : 1831, "crSymbol" : "BCH", "crName" : "Bitcoin Cash", "crPrice" : 260.0101076718522 } ] },
	{ "timestamp" :"2019-10-29T19:52:01.197Z", "crypto" : [ { "crId" : 1, "crSymbol" : "BTC", "crName" : "Bitcoin", "crPrice" : 8318.92891589588 }, { "crId" : 1027, "crSymbol" : "ETH", "crName" : "Ethereum", "crPrice" : 168.2582547808077 }, { "crId" : 1831, "crSymbol" : "BCH", "crName" : "Bitcoin Cash", "crPrice" : 259.54179259085265 } ] },
	{ "timestamp" : "2019-10-29T20:43:01.338Z", "crypto" : [ { "crId" : 1, "crSymbol" : "BTC", "crName" : "Bitcoin", "crPrice" : 8490.504755471049 }, { "crId" : 1027, "crSymbol" : "ETH", "crName" : "Ethereum", "crPrice" : 171.73034607344712 }, { "crId" : 1831, "crSymbol" : "BCH", "crName" : "Bitcoin Cash", "crPrice" : 259.7835458162798 } ] }
];


describe("ComposeMsg test - function plainJson", function() {
    it("Empty array: ", function() {
      result   = composeMsg.plainJson(value0)
      //Better use JSON comparison not stringify
      expect(JSON.stringify(result)).to.equal("[]");
    });

    it("Array length 1 ", function() {
      result   = composeMsg.plainJson(value1);
      expect(JSON.stringify(result)).to.equal('[{"timestamp":"2019-10-29T19:50:01.452Z","BTC":8309.724885181198,"ETH":168.13545031312205,"BCH":259.393515185236}]');
    });

    it("Array length >1 ", function() {
      result   = composeMsg.plainJson(value2);
      expect(JSON.stringify(result)).to.equal('[{"timestamp":"2019-10-29T19:50:01.452Z","BTC":8309.724885181198,"ETH":168.13545031312205,"BCH":259.393515185236},{"timestamp":"2019-10-29T19:51:01.264Z","BTC":8310.608531141226,"ETH":168.30560198415677,"BCH":260.0101076718522},{"timestamp":"2019-10-29T19:52:01.197Z","BTC":8318.92891589588,"ETH":168.2582547808077,"BCH":259.54179259085265},{"timestamp":"2019-10-29T20:43:01.338Z","BTC":8490.504755471049,"ETH":171.73034607344712,"BCH":259.7835458162798}]');
    });
});

describe("ComposeMsg test - function getES", function() {
  it("Empty array: ", function() {
    result   = composeMsg.getES(value0)
    expect(result).to.equal("Información sobre  criptomonedas / Cryptocurrency report\nPrueba realizada para bit2me.com / test carried out for bit2me.com\n\nTIMESTAMP\t\t\t\t\tBitcoin\t\t\tEthereum\t\tBitcoin Cash\n---------------------------------------------------------------------------------------------------------------------------------------------\n");
  });
  it("Array length 1  ", function() {
    result   = composeMsg.getES(value1)
    expect(result).to.equal('Información sobre  criptomonedas / Cryptocurrency report\nPrueba realizada para bit2me.com / test carried out for bit2me.com\n\nTIMESTAMP\t\t\t\t\tBitcoin\t\t\tEthereum\t\tBitcoin Cash\n---------------------------------------------------------------------------------------------------------------------------------------------\n2019-10-29 19:50:01\t\t\t8309.724885181198\t168.13545031312205\t259.393515185236\n');
  });
  it("Array length >1 ", function() {
    result   = composeMsg.getES(value2)
    expect(result).to.equal('Información sobre  criptomonedas / Cryptocurrency report\nPrueba realizada para bit2me.com / test carried out for bit2me.com\n\nTIMESTAMP\t\t\t\t\tBitcoin\t\t\tEthereum\t\tBitcoin Cash\n---------------------------------------------------------------------------------------------------------------------------------------------\n2019-10-29 19:50:01\t\t\t8309.724885181198\t168.13545031312205\t259.393515185236\n2019-10-29 19:51:01\t\t\t8310.608531141226\t168.30560198415677\t260.0101076718522\n2019-10-29 19:52:01\t\t\t8318.92891589588\t168.2582547808077\t259.54179259085265\n2019-10-29 20:43:01\t\t\t8490.504755471049\t171.73034607344712\t259.7835458162798\n');
  });
});