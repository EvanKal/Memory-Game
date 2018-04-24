My notes

SHUFFLING 

First I selected the cards and turned the returned list of cards to an array. Then I used the function provided to shuffle 
the cards and then I appended each card to the deck, based on the new index they got. The cards were not created but rearranged
with .appendChild() which placed them in que as last child of the parent element, one at a time.

Matching the cards

The innerHTML of the first card clicked is added as an element to the array listOfOpenedCards, and then it is retrieved and compared to the innerHTML
of the next card clicked. If they match they get the match class, but actually not just the two of them. All of the opened cards get the match class,
but since some off them already have it then the addition is ignored. ---There might be a more efficient way, using just variables and comparing just them,
because the array is being emptied, so maybe it is not needed after all as a list of the opened cards.
I need to check this out later!!!