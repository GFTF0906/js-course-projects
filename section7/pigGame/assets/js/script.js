'use strict';

// Selecting elements
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const diceEl = document.querySelector('.dice');

const player0El = document.querySelector('.player--0');
const score0El = document.querySelector('#score--0');
const currentScore0El = document.querySelector('#current--0');

const player1El = document.querySelector('.player--1');
const score1El = document.querySelector('#score--1');
const currentScore1El = document.querySelector('#current--1');

let scores, activePlayer, currentScore, playing;

const init = () => {
    
    // Starting conditions
    diceEl.classList.add('hidden');
    
    scores = [0, 0];

    activePlayer = 0;
    currentScore = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;

    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    
};

const switchPlayer = () => {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

init();

// Rolling dice functionality
btnRoll.addEventListener('click', () => {

    if (playing) {
        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
    
        // 2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `./assets/images/dice-${dice}.png`;
    
        // 3. Check for rolled 1: if true, switch to next player
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
    
});

btnHold.addEventListener('click', () => {

    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
    
        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            // Finish the game
            playing = false;
            diceEl.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // Switch to the next player
            switchPlayer();
    
        }
    }

});

btnNew.addEventListener('click', init);