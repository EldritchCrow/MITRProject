

let { getEventByID, getNumPages, getEventPage } = require("../utils/data_access.js");
var { ipcRenderer } = require("electron");
const path = require("path");

$(document).ready(function() {

    var lastStat = ipcRenderer.sendSync('lastStatus', 'ping');
    var searchStr = 'option[value="' + lastStat + '"]';
    $(searchStr).prop("selected", true);

    // Populate recent events section
    setTimeout(async function() {
        ipcRenderer.send('getRecents', 'ping');
    }, 1);

    // Populate all events of the most recent page
    setTimeout(async () => {
        ipcRenderer.send('whatPage', 'ping');
    }, 1);

    $("#buttonOlder").on("click", async () => {
        if($("#mutex").text() != "") {
            return;
        }
        $("#mutex").text("locked");
        var pageNum = parseInt($("#currentPage").text()) - 1;
        if(pageNum < 1)
            return;
        $("#events").html("Loading...");
        var status = $("#statusParam").val();
        var query = $("#searchQuery").val();
        await updateEventsDiv(pageNum, status, query);
        $("#mutex").text("");
    });
    $("#buttonNewer").on("click", async () => {
        if($("#mutex").text() != "") {
            return;
        }
        $("#mutex").text("locked");
        var temp = $("#events").html();
        $("#events").html("Loading...");
        var pageNum = parseInt($("#currentPage").text()) + 1;
        var status = $("#statusParam").val();
        var query = $("#searchQuery").val();
        var maxPages = await getNumPages(status, query);
        if(pageNum > maxPages) {
            $("#events").html(temp);
            return;
        }
        await updateEventsDiv(pageNum, status, query);
        $("#mutex").text("");
    });
    $("#statusParam").change(async (e) => {
        $("#events").html("Loading...");
        ipcRenderer.send("statusUpdate",  $("#statusParam").val());
        var status = $("#statusParam").val();
        var query = $("#searchQuery").val();
        var pageNum = await getNumPages(status, query);
        await updateEventsDiv(pageNum, status, query);
        $("#mutex").text("");
    });
    $("#searchQuery").change(async (e) => {
        $("#events").html("Loading...");
        ipcRenderer.send("statusUpdate",  $("#statusParam").val());
        var status = $("#statusParam").val();
        var query = $("#searchQuery").val();
        var pageNum = await getNumPages(status, query);
        await updateEventsDiv(pageNum, status, query);
        $("#mutex").text("");
    });
});


async function updateEventsDiv(pageNum, status, query) {
    ipcRenderer.send('lastPage', "" + pageNum);
    $("#currentPage").text("" + pageNum);
    var events = await getEventPage(pageNum, status, query);
    var newHTML = "";
    for(const item of events.results) {
        newHTML += '<div class="col-sm-2 wholeEvent">';
        newHTML += '<div class="circle"></div>' ;
        newHTML += '<div class="eventName">' + item.name + '</div>';
        newHTML += '<div class="date">' + item.event_date + '</div>';
        newHTML += '<p class="hiddenIDLabel">' + item.id + '<p>';
        newHTML += '</div>';
    }
    if(events.results.length == 0)
        newHTML = "No results found.";
    $("#events").html(newHTML);
    $(".wholeEvent").on("click", (e) => {
        var targetEvent = $(e.currentTarget).find(".hiddenIDLabel").text();
        window.location = path.join(__dirname, "../Public/form.html") + '?targ=' + targetEvent;
    });
}

ipcRenderer.on('getRecents-reply', async (event, arg) => {
    var recents = arg.split(",").map(x => parseInt(x));
    var newHTML = "";
    for(const item of recents) {
        var event = await getEventByID(item);
        newHTML +=  '<div class="col-sm-2 wholeEventLITE"> ';
        newHTML += '<p>' + event.event.name + '</p>';
        newHTML += '</div>';
    }
    console.log('hey2');
    $("#recentContent").html(newHTML);
    console.log('hey2done');
});

ipcRenderer.on('whatPage-reply', async (event, arg) => {
    var pageNum = parseInt(arg);
    var status = $("#statusParam").val();
    var query = $("#searchQuery").val();
    if(parseInt(arg) == -1)
        pageNum = await getNumPages(status, query);
    await updateEventsDiv(pageNum, status, query);
});


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