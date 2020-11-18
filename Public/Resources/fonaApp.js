const url = require('url');
const fs = require("fs");
const path = require("path");

function CustomerName() {
    //I want same to give me the names of the customers as a string 
    return {
        Customer: [
            {
                fName: "John",
                lName: "Smith",
            },
            {
                fName: "Steve",
                lName: "Doe",
            }
    ]
    };
}
function DateofReservation() {
    //This will be the day of the event 
    return {
        Date: [
            {
                date: "11/17/2020",
            },
            {
                date: "4/20/2021",
            },
            {
                date: "12/25/2020",
            },
            {
                date: "Forever",
            },
            {
                date: "1/8/2021",
            }
    ]
    };
}
function EventName() {
    //This will be the Event name, it will be what the event is referred to as  
    return {
        partyName: [
            {
                name: "John's Bender",
            },
            {
                name: "Anna's A fucking bitch",
            },
            {
                name: "Sam's Dungeons and Dragons Party",
            },
            {
                name: "Andrew's time to sit alone",
            },
            {
                name: "Steve's Brothel",
            }
    ]
    };
}
function EventLocation() {
    //This will be Location of the Event
    return {
        Location: [
            {
                location: "Under a bridge",
            },
            {
                location: "Over There",
            },
            {
                location: "The Crawl Space",
            },
            {
                location: "Somewhere over the rainbow",
            },
            {
                location: "Burger King",
            }
    ]
    };
}
function NumberOfGuards() {
    //Number of guards for the event, I couldn't find it in the API, but let me know if you can
    return {
        Guards: [
            {
                guards: "2",
            }
    ]
    };
}
function NumberOfCustodians() {
    //Number of guards for the event, I couldn't find it in the API, but let me know if you can
    return {
        Custodians: [
            {
                Custodians: "1",
            }
    ]
    };
}