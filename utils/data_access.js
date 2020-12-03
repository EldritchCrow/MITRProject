
let { APIConsumer } = require("./api_auth.js");
let Promise = require("promise");
let request = require('request');


function getEventPage(page, status, query) {
    if(page < 1)
        page = 1;
    return new Promise((resolve, reject) => {
        try {
            var consumer = APIConsumer();
            var request_data = {
                url: 'https://api.tripleseat.com/v1/events/search.json?page=' + page,
                method: 'GET'
            };
            if(status) request_data.url += "&status=" + status;
            if(query) request_data.url += "&query=" + encodeURIComponent(query);
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
                    console.log(event.substring(0,50));
                    resolve(JSON.parse(event));
                } catch (error) {
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


function getNumPages(status, query) {
    return new Promise((resolve, reject) => {
        try {
            var consumer = APIConsumer();
            var request_data = {
                url: 'https://api.tripleseat.com/v1/events/search.json?page=1',
                method: 'GET'
            };
            if(status) request_data.url += "&status=" + status;
            if(query) request_data.url += "&query=" + encodeURIComponent(query);
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