

const { key, secret } = require("./api_token.json");
var crypto = require('crypto');
var oauth = require('oauth-1.0a');



exports.APIConsumer = () => {
    return oauth({
        consumer: {
            key: key,
            secret: secret
        },
        signature_method: 'HMAC-SHA1',
        hash_function: function (base, key) {
            return crypto.createHmac('sha1', key).update(base).digest('base64');
        }
    });
}