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
                date: "12/11/2020",
            },
            {
                date: "1/8/2021",
            },
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
                date: "12/11/2020",
            },
            {
                date: "1/8/2021",
            },
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
                date: "12/11/2020",
            },
            {
                date: "1/8/2021",
            },
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
                date: "12/11/2020",
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
                name: "John and Sam's Wedding",
            },
            {
                name: "Anna's Birthday Party",
            },
            {
                name: "Billy's Christmas Party",
            },
            {
                name: "Eric and Jenna's Wedding",
            },
            {
                name: "Steve and Karen's Wedding",
            },
            {
                name: "John and Sam's Wedding",
            },
            {
                name: "Anna's Birthday Party",
            },
            {
                name: "Billy's Christmas Party",
            },
            {
                name: "Eric and Jenna's Wedding",
            },
            {
                name: "Steve and Karen's Wedding",
            },
            {
                name: "John and Sam's Wedding",
            },
            {
                name: "Anna's Birthday Party",
            },
            {
                name: "Billy's Christmas Party",
            },
            {
                name: "Eric and Jenna's Wedding",
            },
            {
                name: "Steve and Karen's Wedding",
            },
            {
                name: "John and Sam's Wedding",
            },
            {
                name: "Anna's Birthday Party",
            },
            {
                name: "Billy's Christmas Party",
            },
            {
                name: "Eric and Jenna's Wedding",
            },
            {
                name: "Steve and Karen's Wedding",
            }
    ]
    };
}
function EventLocation() {
    //This will be Location of the Event
    return {
        Location: [
            {
                location: "The Pond",
            },
            {
                location: "The Veranda",
            },
            {
                location: "The Ball Room",
            },
            {
                location: "The Veranda",
            },
            {
                location: "The Pond",
            },
            {
                location: "The Pond",
            },
            {
                location: "The Veranda",
            },
            {
                location: "The Ball Room",
            },
            {
                location: "The Veranda",
            },
            {
                location: "The Pond",
            },
            {
                location: "The Pond",
            },
            {
                location: "The Veranda",
            },
            {
                location: "The Ball Room",
            },
            {
                location: "The Veranda",
            },
            {
                location: "The Pond",
            },
            {
                location: "The Pond",
            },
            {
                location: "The Veranda",
            },
            {
                location: "The Ball Room",
            },
            {
                location: "The Veranda",
            },
            {
                location: "The Pond",
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