var express = require('express');
var request = require('request');
var config = require('./config.js');
var app = express();


app.get("/req", function (req, res) {

    request({
        url: 'https://api.oregonstate.edu/oauth2/token',
        method: 'POST',
        auth: {
            user: config.client_id,
            pass: config.client_secret
        },
        form: {
            'grant_type': 'client_credentials'
        }
    }, function (err, res) {
        var json = JSON.parse(res.body);
        console.log("Access Token:", json.access_token);
        // store this access to make API calls
    });
});

app.get("/location", function (req, res) {

    var result1 = "";
    request({
        url: 'https://api.oregonstate.edu/v1/locations/dc34a5b5f0c0bc52cc269328b84f1622',
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + config.access_token
        }
    }, function (err, res1) {
        result1 = JSON.parse(res1.body);
        res.send(result1);
    });

});

app.get("/id", function (req, res) {
    var result1 = "";
    request({
        url: 'https://api.oregonstate.edu/v1/directory/{search parameter}',
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + config.access_token
        }
    }, function (err, res1) {
        result1 = JSON.parse(res1.body);
        res.send(result1);
    });

});

app.get("/identify", function (req, res) {
    var result1 = "";
    request({
        url: 'https://api.oregonstate.edu/v1/identify/osuID?q={id}',
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + config.access_token
        }
    }, function (err, res1) {
        result1 = JSON.parse(res1.body);
        res.send(result1);
    });

});

app.get("/osuOn/login/callback", function (req, res) {
    console.log(res.acccess_token + "got it");
});

app.listen(3000, function () {
    console.log('Listening on 3000');
});