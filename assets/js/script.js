// Current date and time displayed at the top of the calendar
var day = moment().format('MMMM Do YYYY, h:mm:ss a');
$("#currentDay").append(document.createTextNode(day));

// Variable used to handdle infitine append bug
var firstPassComplete = false;

// Array variables used to build the time block rows
var timeBlocks = [];
var blockLeft = [];
var fillArea = [];
var textBox = [];
var blockRight = [];
var saveIcon = [];

// Variable used to store the time for each time block
var workHours = [
    moment("8:00 AM", ["h:mm A"]), 
    moment("9:00 AM", ["h:mm A"]), 
    moment("10:00 AM", ["h:mm A"]),
    moment("11:00 AM", ["h:mm A"]),
    moment("12:00 PM", ["h:mm A"]),
    moment("1:00 PM", ["h:mm A"]),
    moment("2:00 PM", ["h:mm A"]),
    moment("3:00 PM", ["h:mm A"]),
    moment("4:00 PM", ["h:mm A"]),
    moment("5:00 PM", ["h:mm A"])
]

var block = function() {
    // Calculate myDate: current date, 
    // currentTimBlock: looks for the current time, 
    // and pendingTime Block: looks ahead 1 hours
    var myDate = moment().format('LTS');
    var currentTimeBlock = moment(myDate, ["h:mm A"])
    var pendingTimeBlock = moment(myDate, ["h:mm A"])
        .add('1', 'hours');
    
    // Variable used to select the .container class
    var divCollection = document.querySelector(".container");

    // For loop cycles through to build the DOM Elements.
    for (var i = 0; i < workHours.length; i++) {
        var times = workHours[i]._i;

        timeBlocks[i] = document.createElement("div");
        timeBlocks[i].className = "time-block row m-2";
        $(timeBlocks[i]).addClass("time-block row m-2");


        blockLeft[i] = document.createElement("div");
        blockLeft[i].className = "hour col-2 bg-light";
        blockLeft[i].textContent = times;

        fillArea[i] = document.createElement("div");
        fillArea[i].className = "col-8";

        textBox[i] = document.createElement("textarea");
        textBox[i].className = "form-control mt-2";
        textBox[i].id = "modalTaskDescription";

        blockRight[i] = document.createElement("button");
        blockRight[i].className = "saveBtn col-2";

        saveIcon[i] = document.createElement("span");
        saveIcon[i].className = "oi oi-cloud-upload";

        timeBlocks[i].setAttribute("data-id", i);
        blockLeft[i].setAttribute("data-time", i);
        textBox[i].setAttribute("data-text", i);
        blockRight[i].setAttribute("data-save", i);

        if (!firstPassComplete) {
            divCollection.appendChild(timeBlocks[i]);
            timeBlocks[i].appendChild(blockLeft[i]);
            timeBlocks[i].appendChild(fillArea[i]);
            fillArea[i].appendChild(textBox[i]);
            timeBlocks[i].appendChild(blockRight[i]);
            blockRight[i].appendChild(saveIcon[i]);
        }

        // Depending on the time, the color of the 'blockLeft div's will change.
        // Green represents the future, yellow represents within the next hour, and red represents the past.
        if (currentTimeBlock > workHours[i]) {
            blockLeft[i].className = "hour col-2 bg-danger";
        } else if (pendingTimeBlock >= workHours[i]) {
            blockLeft[i].className = "hour col-2 bg-warning";
        } else {
            blockLeft[i].className = "hour col-2 bg-success";
        }
    }
    // First pass updated to true so that the appendChild section above doesn't infinitely create new time blocks.
    firstPassComplete = true;

    // Depending on the 'data-text' attribute, when a saveBtn is selected the user textarea input is saved to local storage. 
    $('.saveBtn').on("click", function() {
        var userInput0 = document.querySelector('textarea[data-text="0"]').value;
        textBox[0] = userInput0;

        var userInput1 = document.querySelector('textarea[data-text="1"]').value;
        textBox[1] = userInput1;

        var userInput2 = document.querySelector('textarea[data-text="2"]').value;
        textBox[2] = userInput2;

        var userInput3 = document.querySelector('textarea[data-text="3"]').value;
        textBox[3] = userInput3;

        var userInput4 = document.querySelector('textarea[data-text="4"]').value;
        textBox[4] = userInput4;

        var userInput5 = document.querySelector('textarea[data-text="5"]').value;
        textBox[5] = userInput5;

        var userInput6 = document.querySelector('textarea[data-text="6"]').value;
        textBox[6] = userInput6;

        var userInput7 = document.querySelector('textarea[data-text="7"]').value;
        textBox[7] = userInput7;

        var userInput8 = document.querySelector('textarea[data-text="8"]').value;
        textBox[8] = userInput8;

        var userInput9 = document.querySelector('textarea[data-text="9"]').value;
        textBox[9] = userInput9;

        localStorage.setItem('textBox', JSON.stringify(textBox));
    })
};
// The loadTasks function cycles through each 'data-text' attribute.
// Gets data from the textBox local stoage and appends it to the textareas.
// If text already exits int he textarea it would re-append the content stored in local storage.
function loadTasks() {
    $('textarea[data-text]').each(function(i) {
        var savedTasks = localStorage.getItem("textBox");
        
        if (!savedTasks) {
            return false;
        }
        console.log("Saved tasks found!"); 
        
        // parse into array of objects
        savedTasks = JSON.parse(savedTasks);

        $(this).empty().append(savedTasks[i]);
    });
};

// setInterval essentially refreshes the data looking for updates ever 2 minutes.
setInterval(function() {
    block();
    loadTasks();
}, (1000*120))

// Initialize the block() and loadTasks() functions so the user doesn't have to wait on data stored in local storage.
block();
loadTasks();
