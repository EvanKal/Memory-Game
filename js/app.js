/*
 * Create a list that holds all of your cards
 */
const listOfCards = document.querySelectorAll(".card");
const arrayOfCards = Array.from(listOfCards);
const deck = document.querySelector(".deck");
const getCounter = document.querySelector(".moves");
const getStars = document.querySelector(".stars");
const getRestart = document.querySelector(".restart");
let myDocFrag1 = document.createDocumentFragment();
let listOfOpenedCards = [];
let counter = 0;
let clickedCardsClasses = "";
let previousTarget = "";
let newListOfCards = "";


deck.addEventListener("click", thingsToDoAfterClick);

document.addEventListener('DOMContentLoaded', function () {
  shuffleListOfCards ();
});

getRestart.addEventListener("click", reset);

function reset () {
  listOfOpenedCards = [];
  counter = 0;
  clickedCardsClasses = "";
  previousTarget = "";
  myDocFrag1 = document.createDocumentFragment();
  newListOfCards = "";

  getCounter.textContent = counter;

  resetStars();
  resetCards();
  shuffleListOfCards ();

}

function resetStars () {
  let star = getStars.querySelector("li");
  let getAllStars = getStars.querySelectorAll("li");
  let numOfStars = getAllStars.length;
  for ( let i=3; numOfStars<i; i--) {
    let starHtml = star.cloneNode(true);
    getStars.appendChild(starHtml);
  };
};

function resetCards () {
  let allCards = deck.querySelectorAll(".card");
  allCards.forEach(function (element) {
  element.classList.remove("open", "show", "animated", "bounce", "match", "noMatch", "shake");
})};


 function shuffleListOfCards () {
   newListOfCards = shuffle(arrayOfCards);
   for (let i = 0; i<newListOfCards.length; i++) {
     const getCardByIndex = newListOfCards[i];
     let classNumber = `cardnumber${i+1}`;
     getCardByIndex.classList.add(classNumber);
     myDocFrag1.appendChild(getCardByIndex);
   };
   deck.appendChild(myDocFrag1);
 };

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

function thingsToDoAfterClick(evt) {
  let target = evt.target.classList.contains("card");
  if (target) {
  previousTarget = evt.target.className;
  moveCount ();
  flipCard(evt);
  openedCards(evt);
  matchCheck(evt);
  endCheck();
};
};

function flipCard(evt) {
  evt.target.classList.add("show", "open", "animated", "bounce");
};

function openedCards(evt) {
  let contentOfClickedCard = evt.target.innerHTML;
  listOfOpenedCards.push(contentOfClickedCard);
};

function matchCheck(evt) {
  let contentOfClickedCard = evt.target.innerHTML;
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
    })}, 800);
    listOfOpenedCards = [];
  };
};
} else {
  evt.target.classList.remove("open", "show", "animated", "bounce", "noMatch", "shake");
  listOfOpenedCards = [];
};
};
};

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
};

function endCheck() {
  let matchedCardsSum = deck.querySelectorAll(".match");
  if (matchedCardsSum.length == 16) {
    createWinningMessage ();
  }
};

function createWinningMessage () {
  let star = getStars.querySelectorAll("li");
  let starSum = star.length;

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

  let buttonElement = document.createElement("button");
  buttonElement.setAttribute("id", "buttonPlayAgain");
  buttonElement.textContent = `Play again`;
  winningContainer.appendChild(buttonElement);

  document.body.appendChild(winningContainer);

  let getReplay = document.querySelector("#buttonPlayAgain");

  function removeDiv () {
    let getWinningContainer = document.querySelector("#winningDiv");
    document.body.removeChild(getWinningContainer);
  };

  getReplay.addEventListener("click", function () {
    reset();
    removeDiv();
  });
}
