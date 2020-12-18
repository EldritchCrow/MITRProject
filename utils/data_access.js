
let { APIConsumer } = require("./api_auth.js");
const axios = require('axios');
const fs = require("fs");

async function getEventPage(page, status, query) {
    if(page < 1)
        page = 1;
    var consumer = APIConsumer();
    var request_data = {
        url: 'https://api.tripleseat.com/v1/events/search.json?page=' + page,
        method: 'GET'
    };
    if(status) request_data.url += "&status=" + status;
    if(query) request_data.url += "&query=" + encodeURIComponent(query);
    request_data.url += "&show_financial=true";
    var my_token = Math.floor(Math.random() * Math.pow(16, 6)).toString(16);
    my_token = "0".repeat(6 - my_token.length) + my_token;
    request_data.url += "&dummy_test_param=" + my_token;
    console.time(my_token);
    try {
        var resp = (await axios({
            method: 'get',
            url: request_data.url,
            headers: consumer.toHeader(consumer.authorize(request_data)),
            timeout: 20000
        })).data;
        console.timeEnd(my_token);
        return resp;
    } catch(err) {
        console.error("axios error: ", err);
    }
    console.timeEnd(my_token);
    return resp;
}


async function getEventByID(id, financials=false) {
    // return JSON.parse(fs.readFileSync("utils/dummy.json"));
    var consumer = APIConsumer();
    var request_data = {
        url: 'https://api.tripleseat.com/v1/events/' + id + '.json',
        method: 'GET'
    };
    if(financials)
        request_data.url += "?show_financial=true";
    return (await axios({
        method: 'get',
        url: request_data.url,
        headers: consumer.toHeader(consumer.authorize(request_data)),
        timeout: 20000
    })).data;
}


async function getNumPages(status, query) {
    // return 6;
    var consumer = APIConsumer();
    var request_data = {
        url: 'https://api.tripleseat.com/v1/events/search.json?page=1',
        method: 'GET'
    };
    if(status) request_data.url += "&status=" + status;
    if(query) request_data.url += "&query=" + encodeURIComponent(query);
    return (await axios({
        method: 'get',
        url: request_data.url,
        headers: consumer.toHeader(consumer.authorize(request_data)),
        timeout: 20000
    })).data.total_pages;
}


exports.getEventPage = getEventPage;
exports.getEventByID = getEventByID;
exports.getNumPages = getNumPages;