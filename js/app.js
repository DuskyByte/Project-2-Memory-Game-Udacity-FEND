let timer = 0;
let flippedCards = 0;
let delayFunction;
let startGame = false;

document.addEventListener("DOMContentLoaded", function(event) {
    const gameBoardElement = document.getElementById("game-board");
    gameBoardElement.addEventListener("click", clickInteration);
});

function drawTimer() {
    timer++;
    document.getElementById("timer").innerHTML = formatTime(timer);
}

function formatTime(timer) {
    let hours = Math.floor(timer / 3600);
    let minutes = Math.floor((timer - (hours * 3600)) / 60);
    let seconds = timer - (hours * 3600) - (minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds;
}

function clickInteration(event) {
    if (startGame === false) {
        const timerEvent = setInterval(drawTimer, 1000);
        startGame = true;
    }
    if (flippedCards <= 1) {
        flipCards(event);
    }
}

function flipCards(event) {
    let element = event.target;
    if (element.nodeName === "DIV") {
        if (element.classList.contains("face-down")) {
            element.classList.toggle("face-down");
            element.classList.toggle("face-up");
            element = element.firstElementChild;
            element.classList.toggle("hidden");
            element.classList.toggle("shown");
            flippedCards++;
        }
    }
    if (flippedCards >= 2) {
        delayFunction = setTimeout(checkCards, 750);
    }
}

function checkCards() {
    let checkedoutCardList = [];
    for (let cardNumber = 1; cardNumber <= 16; cardNumber++) {
        let checkedoutCard = document.getElementById("card-" + cardNumber);
        if (checkedoutCard.classList.contains("face-up")) {
            checkedoutCardList.push(checkedoutCard);
        }
    }
    if (checkedoutCardList[0].firstElementChild.classList.value === checkedoutCardList[1].firstElementChild.classList.value) {
        for (let cardNumber = 0; cardNumber < checkedoutCardList.length; cardNumber++) {
            checkedoutCard = checkedoutCardList[cardNumber];
            checkedoutCard.classList.toggle("face-up");
            checkedoutCard.classList.toggle("matched-card");
            flippedCards = 0;
            clearTimeout(delayFunction);
        }
    } else {
        for (let cardNumber = 0; cardNumber < checkedoutCardList.length; cardNumber++) {
            checkedoutCard = checkedoutCardList[cardNumber];
            checkedoutCard.classList.toggle("face-up");
            checkedoutCard.classList.toggle("face-down");
            checkedoutCard = checkedoutCard.firstElementChild;
            checkedoutCard.classList.toggle("shown");
            checkedoutCard.classList.toggle("hidden");
            flippedCards = 0;
            clearTimeout(delayFunction);
        }
    }
}