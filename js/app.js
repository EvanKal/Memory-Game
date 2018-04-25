/*
 * Create a list that holds all of your cards
 */
const listOfCards = document.querySelectorAll(".card");
const arrayOfCards = Array.from(listOfCards);
const deck = document.querySelector(".deck");
const getCounter = document.querySelector(".moves");
const getStars = document.querySelector(".stars");
const getRestart = document.querySelector(".restart");
const myDocFrag1 = document.createDocumentFragment();
let listOfOpenedCards = [];
let counter = 0;
let clickedCardsClasses = "";
let previousTarget = "";


deck.addEventListener("click", thingsToDoAfterClick);

document.addEventListener('DOMContentLoaded', function () {
  console.log('the DOM is ready to be interacted with!');
  shuffleListOfCards ();
});

getRestart.addEventListener("click", function () {
  location.reload();
});

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 function shuffleListOfCards () {
   let newListOfCards = shuffle(arrayOfCards);
   // console.log(newListOfCards);
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
  evt.target.classList.add("show", "open");
};

function openedCards(evt) {
  let contentOfClickedCard = evt.target.innerHTML;
  // console.log(contentOfClickedCard);
  listOfOpenedCards.push(contentOfClickedCard);
  console.log(listOfOpenedCards);
};

function matchCheck(evt) {
  let contentOfClickedCard = evt.target.innerHTML;
  console.log(contentOfClickedCard);
  if (listOfOpenedCards.length>1) {
    clickedCardsClasses = evt.target.className;
    console.log(`${clickedCardsClasses}, ${previousTarget}`);
    if (clickedCardsClasses != previousTarget) {
    let openedCardsVariable = deck.querySelectorAll(".open");
    for (let i=0; i < listOfOpenedCards.length - 1; i++) {
      if (contentOfClickedCard == listOfOpenedCards[i]) {
        openedCardsVariable.forEach(function (element) {
          element.classList.add("match");
      });
        listOfOpenedCards = [];
    } else {
      setTimeout(function delayOfFlip() {
      openedCardsVariable.forEach(function (element) {
        element.classList.remove("open", "show");
      console.log("Nope");
      listOfOpenedCards = [];
    })}, 500);
  };
};
} else {
  evt.target.classList.remove("open", "show");
  listOfOpenedCards = [];
};
};
};

function moveCount () {
  counter = counter + 1;
  getCounter.textContent = counter;
  if (counter == 23) {
    let star = getStars.querySelector("li");
    getStars.removeChild(star);
  } else if (counter == 31) {
    let star = getStars.querySelector("li");
    getStars.removeChild(star);
  };
};

function endCheck() {
  let matchedCardsSum = deck.querySelectorAll(".match");
  if (matchedCardsSum.length == 16) {
    createWinningMessage ();
    console.log("Congrats!");
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

  getReplay.addEventListener("click", function () {
    location.reload();
  });
}

createWinningMessage ();
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
