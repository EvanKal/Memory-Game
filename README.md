#Memory Game "Matching Game"

##Installation

Just view the index.html in the browser.

##How to Play

Click the cards to reveal the symbol they contain. Try matching all the cards in pairs. If two opened cards do not match, they get flipped back down. You need to remember what symbol each card holds, so that you complete the game quickly and get all 3 stars!

If you want to reset the game, click the curly arrow.

If all cards have been matched, you may play again by clicking the "play again" button.

##My notes on the code

###Shuffling

First I selected the cards and turned the returned list of cards to an array. Then I used the function provided to shuffle
the cards and then I appended each card to the deck, based on the new index they got. The cards were not created but rearranged
with ```.appendChild()``` which placed them in queue as last child of the parent element, one at a time.

###Matching the cards

The ```.innerHTML``` of the first card clicked is added as an element to the array ```listOfOpenedCards```, and then it is retrieved and compared to the ```.innerHTML```
of the next card clicked. If they match they get the match class, but actually not just the two of them. All of the opened cards get the match class,
but since some off them already have it then the addition is ignored. ---There might be a more efficient way, using just variables and comparing just them,
because the array is being emptied, so maybe it is not needed after all as a list of the opened cards.
I need to check this out later!!!

###Knowing if the same card is clicked twice

Since the cards are same in pairs, checking if a card is double clicked using its content is wrong, because that would include the
case the identical card is clicked. So I added a unique class to each of them using their place in the array. When a card is clicked its ```.className```
is stored in a variable called ```previousTarget```. When the matching check is about to begin, the ```.className``` of the new clicked card
is compared to the ```previousTarget```. If the same card was clicked, it flips back down.

###Resetting the game

The replay and the reset buttons reset the contents of the page. They do not reload it.
