'use strict';

// Selecting Elements
const score0EL = document.querySelector('#score--0');
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// Starting Conditions
score0EL.textContent = 0;
score1EL.textContent = 0;
let scores, currentScore, activePlayer, player;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  player = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  diceEL.classList.add('hidden');

  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

//Rolling Functionality
btnRoll.addEventListener('click', function () {
  if (player) {
    //1.Generating Random Dice Roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //Display Dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    //3.Check for rolled 1
    if (dice !== 1) {
      // Add Dice to Current Score
      currentScore += dice;
      // current0EL.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to Next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (player) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      player = false;
      diceEL.classList.add('hidden');
      // Finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
