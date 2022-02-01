var day = moment().format('LL');
$("#currentDay").append(document.createTextNode(day));

var divCollection = document.querySelector(".container");

var timeBlocks = [];
var blockLeft = [];
var fillArea = [];
var textBox = [];
var blockRight = [];
var saveIcon = [];

var block = function() {
    for (var i = 0; i < 12; i++) {
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
    };
    

    
};


block();
