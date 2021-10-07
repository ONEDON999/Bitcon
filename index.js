const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');    
});

app.post('/',(req,res)=>{

 var crypto = req.body.crypto;
 var fiat = req.body.fiat;

var baseUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";

var finalUrl = baseUrl + crypto + fiat;

    request(finalUrl, function (error, response, body) {
    var data = JSON.parse(body);
    var price = data.last;

    var currentDate = data.display_timestamp;

    res.write('<p>The current dtse is '+ currentDate);
    res.write('</p> <br><h1>The Price of '+crypto+' is '+price+ fiat+' </h>');
    res.send();
   
    console.log(price);

    });

});




app.listen(3000, ()=>{
    console.log('Server is runing on port 3000.');
})