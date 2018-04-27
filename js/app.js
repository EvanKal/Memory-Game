// TODO: delete comments in functions
// Deactivate counter if same card is clicked!

const listOfCards = document.querySelectorAll(".card");
const arrayOfCards = Array.from(listOfCards);
const deck = document.querySelector(".deck");
const getCounter = document.querySelector(".moves");
const getStars = document.querySelector(".stars");
const getRestart = document.querySelector(".restart");
const getScorePanel = document.querySelector(".score-panel");
let contentOfClickedCard = "";
let myDocFrag1 = document.createDocumentFragment();
let listOfOpenedCards = [];
let counter = 0;
let clickedCardsClasses = "";
let previousTarget = "";
let newListOfCards = "";
let intervalTimer = "";
let seconds = 0;
let minutes = 0;

// Listeners
deck.addEventListener("click", thingsToDoAfterClick);
deck.addEventListener("click", startTimer);

document.addEventListener('DOMContentLoaded', function () {
  shuffleListOfCards ();
  createTimer();
});

getRestart.addEventListener("click", reset);

// Function to reset the game
function reset () {
  listOfOpenedCards = [];
  counter = 0;
  clickedCardsClasses = "";
  previousTarget = "";
  myDocFrag1 = document.createDocumentFragment();
  newListOfCards = "";
  seconds = 0;
  minutes = 0;

  getCounter.textContent = counter;
  clearInterval(intervalTimer);

  deck.addEventListener("click", startTimer);

  resetStars();
  resetCards();
  resetTimer ();
  shuffleListOfCards ();

}

// Gets the number of stars at the time and restores them to three
function resetStars () {
  let star = getStars.querySelector("li");
  let getAllStars = getStars.querySelectorAll("li");
  let numOfStars = getAllStars.length;
  for ( let i=3; numOfStars<i; i--) {
    let starHtml = star.cloneNode(true);
    getStars.appendChild(starHtml);
  };
}

function resetTimer () {
  let getTimer = getScorePanel.querySelector("#timer");
  getTimer.textContent = `0${minutes}:0${seconds}`;
}

function resetCards () {
  let allCards = deck.querySelectorAll(".card");
  allCards.forEach(function (element) {
  element.classList.remove("open", "show", "animated", "bounce", "match", "noMatch", "shake");
})
}

// Shuffles the index of the cards in the array and then
// appends each of them to a fragment according to the new index.
// The document fragment is then appended to the deck.
 function shuffleListOfCards () {
   newListOfCards = shuffle(arrayOfCards);
   for (let i = 0; i<newListOfCards.length; i++) {
     const getCardByIndex = newListOfCards[i];
     let classNumber = `cardnumber${i+1}`;
     getCardByIndex.classList.add(classNumber);
     myDocFrag1.appendChild(getCardByIndex);
   };
   deck.appendChild(myDocFrag1);
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// The function to be called after a card is clicked and sends the new click to the end of the queue
// to be executed after the previous click has been executed
function thingsToDoAfterClick(evt) {
  setTimeout (function () {
    contentOfClickedCard = evt.target.innerHTML;
    let target = evt.target.classList.contains("card");
    if (target) {
    previousTarget = evt.target.className;
    moveCount ();
    flipCard(evt);
    openedCards(evt);
    matchCheck(evt);
    endCheck();
}}, 0);
}

function flipCard(evt) {
  evt.target.classList.add("show", "open", "animated", "bounce");
}

// Stores the HTML of the clicked card in an array
function openedCards(evt) {
  // let contentOfClickedCard = evt.target.innerHTML;
  listOfOpenedCards.push(contentOfClickedCard);
}

// Checks if the clicked card matches the one previously clicked.
// First it confirms that the same card hasn't been clicked. Then checks the
// opened cards if they match. If they match the class match is added and open is removed.
function matchCheck(evt) {
  // let contentOfClickedCard = evt.target.innerHTML;
  if (listOfOpenedCards.length>1) {
    clickedCardsClasses = evt.target.className;
    if (clickedCardsClasses != previousTarget) {
    let openedCardsVariable = deck.querySelectorAll(".open");
    for (let i=0; i < listOfOpenedCards.length - 1; i++) {
      if (contentOfClickedCard == listOfOpenedCards[i]) {
        openedCardsVariable.forEach(function (element) {
          element.classList.add("match", "animated", "flash");
          element.classList.remove("open");
      });
        listOfOpenedCards = [];
    } else {
      setTimeout(function delayOfShake() {
      openedCardsVariable.forEach(function (element) {
        element.classList.add("noMatch", "shake");
      })}, 300);
      setTimeout(function delayOfFlip() {
      openedCardsVariable.forEach(function (element) {
        element.classList.remove("open", "show", "animated", "bounce", "noMatch", "shake");
    })}, 600);
    listOfOpenedCards = [];
  };
};
} else {
  evt.target.classList.remove("open", "show", "animated", "bounce", "noMatch", "shake");
  listOfOpenedCards = [];
};
};
}

// Increments the moves counter with each click. Also removes stars.
function moveCount () {
  counter = counter + 1;
  getCounter.textContent = counter;
  if (counter == 25) {
    let star = getStars.querySelector("li");
    getStars.removeChild(star);
  } else if (counter == 33) {
    let star = getStars.querySelector("li");
    getStars.removeChild(star);
  };
}

// Checks if all cards have been matched and calls for the winning message.
function endCheck() {
  let matchedCardsSum = deck.querySelectorAll(".match");
  if (matchedCardsSum.length == 16) {
    clearInterval(intervalTimer);
    createWinningMessage ();
  }
}

function createTimer () {
  let timer = document.createElement("div");
  timer.setAttribute("id", "timer");
  timer.textContent = `0${minutes}:0${seconds}`;
  getScorePanel.appendChild(timer);
}

// Increments the seconds and the minutes variables and sets the timer's text
// so that the format "00:00" is preserved.
function updateTimer() {
  let getTimer = getScorePanel.querySelector("#timer");
  seconds = seconds + 1;
  if (seconds%60==0) {
    minutes = minutes + 1;
    seconds = 0;
  }
  if (seconds<10 && minutes<10) {
  getTimer.textContent = `0${minutes}:0${seconds}`;
  }
  if (seconds>=10 && minutes<10) {
  getTimer.textContent = `0${minutes}:${seconds}`;
  }
  if (seconds<10 && minutes>=10) {
  getTimer.textContent = `${minutes}:0${seconds}`;
  }
  if (seconds>=10 && minutes>=10) {
  getTimer.textContent = `${minutes}:${seconds}`;
  }
}

// Starts the timer by activating the interval calling of the updateTimer function.
// Then removes the event listener from the cards so that it is not interrupted by further clicks.
function startTimer () {
intervalTimer = window.setInterval(updateTimer, 1000);
deck.removeEventListener("click", startTimer);
}

// Creates the winning message in a div which holds the info and the replay button.
// Also sets up the replay button to reset the game and remove the message.
function createWinningMessage () {
  let star = getStars.querySelectorAll("li");
  let starSum = star.length;
  let getElapsedTime = getScorePanel.querySelector("#timer");
  let elapsedTime = getElapsedTime.textContent;

  let winningContainer = document.createElement("div");
  winningContainer.setAttribute("id", "winningDiv");

  let textElement1 = document.createElement("p");
  textElement1.setAttribute("id", "congrats");
  textElement1.textContent = "Congrats!!!";
  let text1 = textElement1.textContent;
  winningContainer.appendChild(textElement1);

  let textElement2 = document.createElement("p");
  textElement2.setAttribute("id", "infoOnWin");
  textElement2.textContent = `You won with ${counter} moves and ${starSum} stars!`;
  let text2 = textElement2.textContent;
  winningContainer.appendChild(textElement2);

  let textElement3 = document.createElement("p");
  textElement3.setAttribute("id", "infoOnTime");
  textElement3.textContent = `Your time was: ${elapsedTime}!`;
  let text3 = textElement3.textContent;
  winningContainer.appendChild(textElement3);

  let buttonElement = document.createElement("button");
  buttonElement.setAttribute("id", "buttonPlayAgain");
  buttonElement.textContent = `Play again`;
  winningContainer.appendChild(buttonElement);

  document.body.appendChild(winningContainer);

  let getReplay = document.querySelector("#buttonPlayAgain");

  function removeDiv () {
    let getWinningContainer = document.querySelector("#winningDiv");
    document.body.removeChild(getWinningContainer);
  }

  getReplay.addEventListener("click", function () {
    reset();
    removeDiv();
  });
}
