console.log("Cryptocurrency panel v0.2");



//Save in table format
function processJson(obj){
    var currencies=[];
    obj.forEach(entry => {
        var obj={};
        obj.timestamp=entry.timestamp;
        entry.crypto.forEach(crypto =>{
            obj[crypto.crSymbol]=crypto.crPrice;
        });
        currencies.push(obj);
    });
    return currencies;
}

// TODO: This should be avoided using NodeJS, ReactJS or other frameworks
function generateHTML(currencies){
    var strHTML="";
    currencies.forEach((c) =>{
        var dt=new Date(c.timestamp).toISOString().
        replace(/T/, ' ').      // replace T with a space
        replace(/\..+/, '');
        strHTML+='<tr>'+
        '<td>'+dt+'</td>'+
        '<td>'+c.BTC+'</td>'+
        '<td>'+c.ETH+'</td>'+
        '<td>'+c.BCH+'</td>'+
        '</tr>';
    });
    return strHTML;
}
//Get data from server via API and initialize WS
function retrieveData() {
    console.log("Retrieve information");
    xhr = new XMLHttpRequest();
    xhr.open('GET', 'crypto', true);
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                var currencies=processJson(data);
                var htmlString=generateHTML(currencies);
                document.getElementById("dataTable").innerHTML=htmlString;
                console.log("Initialize websocker");
                var wsconn=window.location.hostname+":"+window.location.port;
                console.log("WS connection: "+wsconn)
                var socket=io.connect(wsconn);
                socket.on("cryptomsg",function(data){
                    //document.getElementById("message").innerHTML=data;
                    var currencies=processJson(data);
                    var htmlString=generateHTML(currencies);
                    document.getElementById("dataTable").innerHTML=htmlString;
                })
            }
        } else {
        }
    };
    xhr.send(null);
}








