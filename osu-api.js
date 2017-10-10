var config = require('./config.js');
var token;
var credentials = {
    clientID: config.client_id,
    clientSecret: config.client_secret,
    site: 'https://api.oregonstate.edu/'
};

// Initialize the OAuth2 Library 
var oauth2 = require('simple-oauth2-promise')(credentials);

// Get the access token object for the client 
oauth2.client.getToken({}, saveToken);

// Save the access token 
function saveToken(error, result) {
    if (error) { console.log('Access Token Error', error.message); }
    token = oauth2.accessToken.create(result);
    console.log("Access Token :  " + result['access_token']);
};



/*
var token = {
    'access_token': '<access-token>',
    'refresh_token': '<refresh-token>',
    'expires_in': '7200'
};

// Create the access token wrapper 
var token = oauth2.accessToken.create(token);

// Check if the token is expired. If expired it is refreshed. 
if (token.expired()) {
    token.refresh(function (error, result) {
        token = result;
    })
}

token.revoke('access_token', function (error) {
    // Session ended. But the refresh_token is still valid. 

    // Revoke the refresh_token 
    token.revoke('refresh_token', function (error) {
        console.log('token revoked.');
    });
});*/

