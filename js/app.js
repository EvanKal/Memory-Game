/*
 * Create a list that holds all of your cards
 */
const listOfCards = document.querySelectorAll(".card");
const arrayOfCards = Array.from(listOfCards);
const deck = document.querySelector(".deck");
const getCounter = document.querySelector(".moves");
const getStars = document.querySelector(".stars");
let listOfOpenedCards = [];
let counter = 0;





// listOfCards.forEach(function (card) {
//   card.classList.add("match", "open");
// });

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
     deck.appendChild(getCardByIndex);
   };
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

deck.addEventListener("click", thingsToDoAfterClick);

function thingsToDoAfterClick(evt) {
  moveCount ();
  flipCard(evt);
  openedCards(evt);
  matchCheck(evt);
  endCheck();

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
};
};

function moveCount () {
  counter = counter + 1;
  getCounter.textContent = counter;
  if (counter == 13) {
    let star = getStars.querySelector("li");
    getStars.removeChild(star);
  } else if (counter == 21) {
    let star = getStars.querySelector("li");
    getStars.removeChild(star);
  };
};

function endCheck() {
  let matchedCardsSum = deck.querySelectorAll(".match");
  if (matchedCardsSum.length == 16) {
    console.log("Congrats!");
  }
};

function createWinningMessage () {
  let winningContainer = document.createElement("div");
  winningContainer.setAttribute("id", "winningDiv");

  let textElement1 = document.createElement("p");
  textElement1.setAttribute("id", "congrats");
  textElement1.textContent = "Congrats!!!";
  winningContainer.appendChild(textElement1);

  document.body.appendChild(winningContainer);
}

// createWinningMessage ();
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
