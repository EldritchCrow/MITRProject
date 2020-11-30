

let { getEventByID, getNumPages, getEventPage } = require("../utils/data_access.js");
let { getRecents, resetDB } = require("../utils/sql_wrapper.js");

$(document).ready(function() {

    console.log("Document ready");

    // Populate recent events section
    setTimeout(async function() {
        var recents = await getRecents();
        var newHTML = "";
        recents.forEach(async item => {
            var event = await getEventByID(item.event_id);
            console.log("shouldn't be here");
            newHTML += '<div class="col-sm-2 wholeEventLITE"> ';
            newHTML += '<p>' + event.name + '</p>';
            newHTML += '</div>';
        });
        $("#recentContent").html(newHTML);
    }, 1);

    console.log("Recent events populated");

    // Populate all events of the most recent page
    setTimeout(async () => {
        var pageNum = await getNumPages();
        await updateEventsDiv(pageNum);
    }, 1);

    console.log("All events populated");

    $("#buttonOlder").on("click", async () => {
        var pageNum = parseInt($("#currentPage").text()) - 1;
        if(pageNum < 1)
            return;
        $("#events").html("Loading...");
        await updateEventsDiv(pageNum);
    })
    $("#buttonNewer").on("click", async () => {
        var temp = $("#events").html();
        $("#events").html("Loading...");
        var pageNum = parseInt($("#currentPage").text()) + 1;
        var maxPages = await getNumPages();
        if(pageNum > maxPages) {
            $("#events").html(temp);
            return;
        }
        await updateEventsDiv(pageNum);
    })

    console.log("Button listeners added");
});


async function updateEventsDiv(pageNum) {
    // console.log('pageNum: ' + pageNum);
    $("#currentPage").text("" + pageNum);
    var events = await getEventPage(pageNum);
    var newHTML = "";
    events.results.forEach(async item => {
        newHTML += '<div class="col-sm-2 wholeEvent">';
        newHTML += '<div class="circle"></div>' ;
        newHTML += '<div class="eventName">' + item.name + '</div>';
        newHTML += '<div class="date">' + item.event_start.substring(0,10) + '</div>';
        newHTML += '</div>';
    });
    $("#events").html(newHTML);
}




/*
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
                date: "4/15/2021",
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
                date: "4/15/2021",
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
                date: "4/15/2021",
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
                date: "4/15/2021",
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
                location: ["The Pond", "The Patio", "Tent"]
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
function SecurityDeposit(){
    //This will have the fee for the Security of the space
    return{
        SecurityDeposit: [
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
function EventTime(){
    //This will have the Time of the event
    return{
        EventTime: [
            {
                time: "6:00 PM",
            }
        ]
    }
}

exports.CustomerName = CustomerName;
exports.DateofReservation = DateofReservation;
exports.EventName = EventName;
exports.EventLocation = EventLocation;
exports.NumberOfGuards = NumberOfGuards;
exports.NumberOfCustodians = NumberOfCustodians;
exports.HoursofCustodians = HoursofCustodians;
exports.HoursofGuards = HoursofGuards;
exports.GetContract = GetContract;
exports.rentalFee = rentalFee;
exports.SecurityFee = SecurityFee;
exports.SecurityDeposit = SecurityDeposit;
exports.CleaningFee = CleaningFee;
exports.EventTime = EventTime;
*/