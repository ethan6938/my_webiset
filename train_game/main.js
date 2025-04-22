var trainSpeed = 250;
var trainPosition = 0;
var animation;

var trackLength = 400;
var train = document.getElementById("train");
train.addEventListener("click", speedUp);

var stopButton = document.getElementById("stopButton");
stopButton.addEventListener("click", stopTrain);

function speedUp() {
    if (trainSpeed > 10) {
        trainSpeed -= 10;
    }
    console.log("train speed: " + trainSpeed);

    clearInterval(animation);
    animation = setInterval(frame, trainSpeed);


    function frame() {
        trainPosition += 2;
        train.style.left = trainPosition + 'px';
        console.log(trainPosition);
        checkPosition(trainPosition);
    }
}

function checkPosition(currentPosition) {
    if (currentPosition >= trackLength ) {
        alert("Train has reached the end");
        return (trainPosition=0)
        console.log("end of track!");
        clearInterval(animation);
        
        trainPosition = 0;
    }    
}

function stopTrain() {
    if (trainPosition < trackLength) {
        clearInterval(animation);
    }
}

