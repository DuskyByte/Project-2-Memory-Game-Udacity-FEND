let timer = 0;
let flippedCards = 0;
let delayFunction;
let startGame = false;
let moves = 0;

document.addEventListener("DOMContentLoaded", function(event) {
    const gameBoardElement = document.getElementById("game-board");
    gameBoardElement.addEventListener("click", clickInteration);
});

function drawTimer() {
    timer++;
    document.getElementById("timer").innerHTML = formatTime(timer);
}

function drawMoves() {
    moves++;
    document.getElementById("moves").innerHTML = moves;
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
    //Starts the game
    if (startGame === false) {
        const timerEvent = setInterval(drawTimer, 1000);
        shuffleCards();
        startGame = true;
    }
    //Basic interation for the game
    if (flippedCards <= 1) {
        flipCards(event);
    }
}

function flipCards(event) {
    let element = event.target;
    if (element.nodeName === "DIV") {
        //Flips card 'face-up' if not already.
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
        drawMoves();
        delayFunction = setTimeout(checkCards, 700);
    }
}

function checkCards() {
    let checkedoutCardList = [];
    //Builds array from 'face-up' cards
    for (let cardNumber = 1; cardNumber <= 16; cardNumber++) {
        let checkedoutCard = document.getElementById("card-" + cardNumber);
        if (checkedoutCard.classList.contains("face-up")) {
            checkedoutCardList.push(checkedoutCard);
        }
    }
    //Checks if 'face-up' cards match
    if (checkedoutCardList[0].firstElementChild.classList.value === checkedoutCardList[1].firstElementChild.classList.value) {
        //Updates matching cards to 'matched-cards'
        for (let cardNumber = 0; cardNumber < checkedoutCardList.length; cardNumber++) {
            checkedoutCard = checkedoutCardList[cardNumber];
            checkedoutCard.classList.toggle("face-up");
            checkedoutCard.classList.toggle("matched-cards");
            flippedCards = 0;
            clearTimeout(delayFunction);
        }
    } else {
        //Flips cards back over if they do not match
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

function shuffleCards() {
    let cardFaces = [];
    //Builds array
    for (let cardNumber = 1; cardNumber <= 16; cardNumber++) {
        let checkedoutCard = document.getElementById("card-" + cardNumber);
        cardFaces.push(checkedoutCard.firstElementChild.outerHTML);
    }
    //Randomizes array
    for (let cardNumber = cardFaces.length - 1; cardNumber > 0; cardNumber--) {
        let cardLocation = Math.floor(Math.random() * (cardNumber + 1));
        let temporaryArray = cardFaces[cardNumber];
        cardFaces[cardNumber] = cardFaces[cardLocation];
        cardFaces[cardLocation] = temporaryArray;
    }
    //Inserts card faces from array into the cards
    for (let cardNumber = 1; cardNumber <= 16; cardNumber++) {
        let checkedoutCard = document.getElementById("card-" + cardNumber);
        checkedoutCard.firstElementChild.outerHTML = cardFaces[cardNumber - 1];
    }
}