
let { APIConsumer } = require("./api_auth.js");
let Promise = require("promise");
let request = require('request');


function getEventPage(page) {
    return new Promise((resolve, reject) => {
        try {
            var consumer = APIConsumer();
            var request_data = {
                url: 'https://api.tripleseat.com/v1/events.json?page=' + page,
                method: 'GET'
            };
            request({
                url: request_data.url,
                method: request_data.method,
                headers: consumer.toHeader(consumer.authorize(request_data))
            }, function(err, res, event) {
                if(err) {
                    console.error('error:', err);
                    reject(err);
                    return;
                }
                resolve(JSON.parse(event));
            });
        } catch (err) {
            console.error(err);
        }
    });
}


function getEventByID(id) {
    return new Promise((resolve, reject) => {
        try {
            var consumer = APIConsumer();
            var request_data = {
                url: 'https://api.tripleseat.com/v1/events/' + id + '.json',
                method: 'GET'
            };
            request({
                url: request_data.url,
                method: request_data.method,
                headers: consumer.toHeader(consumer.authorize(request_data))
            }, function(err, res, event) {
                if(err) {
                    console.error('error:', err);
                    reject(err);
                    return;
                }
                resolve(JSON.parse(event));
            });
        } catch (error) {
            console.error(err);
        }
    });
}


function getNumPages() {
    return new Promise((resolve, reject) => {
        try {
            var consumer = APIConsumer();
            var request_data = {
                url: 'https://api.tripleseat.com/v1/events.json',
                method: 'GET'
            };
            request({
                url: request_data.url,
                method: request_data.method,
                headers: consumer.toHeader(consumer.authorize(request_data))
            }, function(err, res, event) {
                if(err) {
                    console.error('error:', err);
                    reject(err);
                    return;
                }
                resolve(JSON.parse(event).total_pages);
            });
        } catch (error) {
            console.error(err);
        }
    });
}


exports.getEventPage = getEventPage;
exports.getEventByID = getEventByID;
exports.getNumPages = getNumPages;