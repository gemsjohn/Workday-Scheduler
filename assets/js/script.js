var day = moment().format('MMMM Do YYYY, h:mm:ss a');
$("#currentDay").append(document.createTextNode(day));

var myDate= moment().format('LTS');
var currentTimeBlock = moment(myDate)._i;

var pendingTimeBlock = moment(myDate, "hh:mm:ss A")
        .add('1', 'hours')
        .format('LTS');
console.log(pendingTimeBlock);


var divCollection = document.querySelector(".container");

var timeBlocks = [];
var blockLeft = [];
var fillArea = [];
var textBox = [];
var blockRight = [];
var saveIcon = [];

var workHours = [
    moment('08:00:00 AM')._i, 
    moment('09:00:00 AM')._i, 
    moment('10:00:00 AM')._i,
    moment('11:00:00 AM')._i,
    moment('12:00:00 PM')._i,
    moment('13:00:00 PM')._i,
    moment('14:00:00 PM')._i,
    moment('15:00:00 PM')._i,
    moment('16:00:00 PM')._i,
    moment('17:00:00 PM')._i
]

var block = function() {
    for (var i = 0; i < 10; i++) {
        timeBlocks[i] = document.createElement("div");
        timeBlocks[i].className = "time-block row m-2";

        blockLeft[i] = document.createElement("div");
        blockLeft[i].className = "hour col-2 bg-light";

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

        divCollection.appendChild(timeBlocks[i]);
        timeBlocks[i].appendChild(blockLeft[i]);
        timeBlocks[i].appendChild(fillArea[i]);
        fillArea[i].appendChild(textBox[i]);
        timeBlocks[i].appendChild(blockRight[i]);
        blockRight[i].appendChild(saveIcon[i]);

        if (currentTimeBlock > workHours[i]) {
            blockLeft[i].className = "hour col-2 bg-danger";
        } else if (pendingTimeBlock >= workHours[i]) {
            blockLeft[i].className = "hour col-2 bg-warning";
        }
        else {
            blockLeft[i].className = "hour col-2 bg-success";
        }
    };
    
    
    
};

block();
