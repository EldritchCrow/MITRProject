
let { APIConsumer } = require("./api_auth.js");
let Promise = require("promise");
let request = require('request');


function getEventPage(page) {
    console.log("page: " + page);
    return new Promise((resolve, reject) => {
        try {
            var consumer = APIConsumer();
            var request_data = {
                url: 'https://api.tripleseat.com/v1/events.json?page=' + page,
                method: 'GET'
            };
            var req = request({
                url: request_data.url,
                method: request_data.method,
                headers: consumer.toHeader(consumer.authorize(request_data)),
                timeout: 10000
            }, function(err, res, event) {
                try {
                    if(err) {
                        console.error('error:', err);
                        reject(err);
                        return;
                    }
                    console.log("received response");
                    resolve(JSON.parse(event));
                } catch (error) {
                    console.log(error);
                    reject(error);
                }
            });
        } catch (err) {
            console.error(err);
        }
    });
}


function getEventByID(id, financials=false) {
    return new Promise((resolve, reject) => {
        try {
            var consumer = APIConsumer();
            var request_data = {
                url: 'https://api.tripleseat.com/v1/events/' + id + '.json',
                method: 'GET'
            };
            if(financials)
                request_data.url += "?show_financial=true";
            // console.log(request_data.url);
            request({
                url: request_data.url,
                method: request_data.method,
                headers: consumer.toHeader(consumer.authorize(request_data)),
                timeout: 10000
            }, function(err, res, event) {
                try {
                    if(err) {
                        console.error('error:', err);
                        reject(err);
                        return;
                    }
                    // console.log(event.substring(0,50));
                    resolve(JSON.parse(event));
                } catch (error) {
                    console.log(error);
                    reject(error);
                }
            });
        } catch (error) {
            console.error(error);
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
                headers: consumer.toHeader(consumer.authorize(request_data)),
                timeout: 10000
            }, function(err, res, event) {
                try {
                    if(err) {
                        console.error('error:', err);
                        reject(err);
                        return;
                    }
                    resolve(JSON.parse(event).total_pages);
                } catch (error) {
                    console.log(error);
                    reject(error);
                }
            });
        } catch (error) {
            console.error(err);
        }
    });
}


exports.getEventPage = getEventPage;
exports.getEventByID = getEventByID;
exports.getNumPages = getNumPages;