

const { key, secret } = require("./api_token.json");
var crypto = require('crypto');
var oauth = require('oauth-1.0a');
var request = require('request');
var Promise = require("promise");


function getEvents(page) {
    if(page == 0)
        page = 1;
    return new Promise((resolve, reject) => {
        var tripleseat = oauth({
            consumer: {
                key: key,
                secret: secret
            },
            signature_method: 'HMAC-SHA1',
            hash_function: function (base, key) {
                return crypto.createHmac('sha1', key).update(base).digest('base64');
            }
        });
        var url = 'https://api.tripleseat.com/v1/events.json?page=' + page;
        var request_data = {
            url: url,
            method: 'GET'
        }
        request({
            url: request_data.url,
            method: request_data.method,
            headers: tripleseat.toHeader(tripleseat.authorize(request_data))
        }, function(err, res, event) {
            if(err) {
                console.log('An error occurred processing the request:');
                console.log(err);
                reject(err);
                return;
            }
            resolve(JSON.parse(event));
        });
    });
}


if (require.main === module)
    getEvents();

exports.getEvents = getEvents;