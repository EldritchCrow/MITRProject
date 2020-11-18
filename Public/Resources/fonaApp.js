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
    //NOT ON API
    return {
        Guards: [
            {
                guards: "2",
            }
    ]
    };
}
function NumberOfCustodians() {
    //NOT ON API
    return {
        Custodians: [
            {
                custodians: "1",
            }
    ]
    };
}
function HoursofCustodians() {
    //NOT ON API
    return {
        Custodians: [
            {
                custodians: "1",
            }
    ]
    };
}
function HoursofGuards() {
    //NOT ON API
    return {
        Guards: [
            {
                guards: "1",
            }
    ]
    };
}
function GetContract() {
    //This function will have the contract, I checked out the api and it mentioned something about 50 per page, Idk if there is only one for each thing or not
    //if there are multiple contracts we'll need to figure out how to implement that
    return{
        Contract: [
            {
                contract: "Contract",
            }
        ]
    }
}
function rentalFee(){
    //This will have the fee for the rental of the space
    return{
        RentalFee: [
            {
                fee: "$1000",
            }
        ]
    }
}
function SecurityFee(){
    //This will have the fee for the Security of the space
    return{
        SecurityFee: [
            {
                fee: "$1000",
            }
        ]
    }
}
function CleaningFee(){
    //This will have the fee for the Cleaning of the space
    return{
        CleaningFee: [
            {
                fee: "$1000",
            }
        ]
    }
}