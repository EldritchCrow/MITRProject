
let { getEventByID } = require("../utils/data_access.js");
var { ipcRenderer } = require("electron");
// var path = require("path");

$(document).ready(() => {
    var targetEvent = ("" + window.location).substring(("" + window.location).search("\\?") + 6);
    
    setTimeout(() => {
        ipcRenderer.send('registerVisit', "" + targetEvent);
    }, 1);

    setTimeout(async () => {
        console.log(targetEvent);
        var data = (await getEventByID(targetEvent, true));
        console.log("wack");
        data = data.event;
        console.log(data);
        $("#formEventName").text(data.name);
        $("#formCustomerName").text(data.booking.account.name);
        $("#formLocationCeremony").text("UNKNOWN");
        $("#formLocationReception").text("UNKNOWN");
        $("#formLocationDinner").text("UNKNOWN");
        $("#formDate").text(data.event_date);
        $("#formNumberOfGuards").text("UNKNOWN");
        $("#formNumberOfCustodians").text("UNKNOWN");
        $("#formRentalFee").text(data.rental_fee);
        $("#formCleaningFee").text("UNKNOWN");
        $("#formSecurityFee").text("UNKNOWN");
        $("#formsecurityDeposit").text("UNKNOWN");
        $("#formEventTime").text(data.name);
    }, 1);
    
    ipcRenderer.send("getLocationNotes", targetEvent);
    ipcRenderer.send("getGeneralNotes", targetEvent);

    // $(".active").click(async (e) => {
    //     setTimeout(() => {window.location = path.join(__dirname, "../Public/index.html")}, 1000);
    // });

    $("#locationNotes").change(async () => {
        ipcRenderer.send("updateLocationNotes", "" + targetEvent + "0" + $("#locationNotes").val());
    });
    $("#generalNotes").change(async () => {
        ipcRenderer.send("updateGeneralNotes", "" + targetEvent + "0" + $("#generalNotes").val());
    });
});

ipcRenderer.on("getLocNotes-reply", (event, arg) => {
    $("#locationNotes").val(arg);
});
ipcRenderer.on("getGenNotes-reply", (event, arg) => {
    $("#generalNotes").val(arg);
});