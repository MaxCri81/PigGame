'use strict';

// 2 different ways of selecting an id element.
// const score0Element = document.querySelector('#score--0');
// const score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore = 0;
let activePlayer = 0;
let playing = true;
const totScores = [0, 0];

reset();
// attach click event listener to the roll dice button
btnRoll.addEventListener('click', rollDice);
// attach click event listener to the hold button
btnHold.addEventListener("click", addScore);
// attach click event listener to the new game button
btnNew.addEventListener("click", reset);

/** Reset the page to its original state. */
function reset() {
    for (let i=0; i < 2; i++)
    {
        // set the TOTAL score of the page to 0
        document.getElementById(`score--${i}`).textContent = 0;
        // remove the player--winner class from the current player to disable the winning effect
        document.querySelector(`.player--${i}`).classList.remove('player--winner');
        // reset the CURRENT score to 0
        currentScore = 0;
        // reset the TOTAL score
        totScores[i] = 0;
        // change the current player
        activePlayer = i;
        // display 0 to the CURRENT player score
        updateScore();
        // remove the player active class on the current player
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    }
    activePlayer = 0;
    playing = true;
    // hide the dice
    diceElement.classList.add('hidden');
    // add the player active class on player 1
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
}

/** Update the CURRENT player score to display. */
function updateScore()
{
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
}

/** Simulate the rolling of a dice. */
function rollDice() {
  if (playing) {
    // generate random number between 1 and 6
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    // change dice image src
    diceElement.src = `dice-${diceNumber}.png`;
    // remove the hidden class from the diceElement
    diceElement.classList.remove('hidden');
    // change player if the dice is 1
    if (diceNumber === 1) {
    // display 0 to the CURRENT player score
    updateScore();
    changePlayer();
    } else {
    currentScore += diceNumber;
    // display the CURRENT player score
    updateScore();
    }
  }
}

/**
 * Change the player--active class for each player
 * and reset the current score.
 */
function changePlayer()
{   //reset the score
    currentScore = 0;
    // remove the player--active class from the current player
    toggleActivePlayer();
    // swith the active player
    activePlayer = activePlayer === 0 ? 1 : 0;
    // add the player--active class to the current player
    toggleActivePlayer();
}

/** Change the player--active class for the current player */
function toggleActivePlayer()
{
    document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active');
}

/** Add the total score for the current player and display it. */
function addScore()
{
    if (playing) {
        // add the CURRENT score to the array at index active player
        totScores[activePlayer] += currentScore;
        // display the TOTAL score for the active player
        document.getElementById(`score--${activePlayer}`).textContent = totScores[activePlayer];

        if (totScores[activePlayer] >= 100) {
            playing = false;
            // add the player--winner class to the current player to show the winning effect
            document.querySelector(`.player--${activePlayer}`).classList.toggle('player--winner');
            // hide the dice
            diceElement.classList.add('hidden');
        } 
        else {
            changePlayer();
        }
    }
}
