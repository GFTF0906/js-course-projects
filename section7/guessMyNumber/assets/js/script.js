'use strict';

const body = document.querySelector('body');

const msg = document.querySelector('.message');
const number = document.querySelector('.number');
const highscoreHTML = document.querySelector('.highscore');
const btnGuess = document.querySelector('.check');

let scoreHTML = document.querySelector('.score');

let score = 20;
let highscore = 0;

let secretNumber = Math.trunc(Math.random() * 20) + 1;

const displayMessage = (message) => {
    msg.textContent = message;
} 
const setColor = (element, color) => {
    element.style.color = color;
}
const setBackground = (element, color) => {
    element.style.background = color;
}

btnGuess.addEventListener('click', e => {
    e.preventDefault();
    
    const guess = Number(document.querySelector('.guess').value);
    
    if (!guess) {
        setColor(msg, 'red');
        displayMessage('No number!');

    } else if (guess === secretNumber) {
        setColor(msg, '#FFF');
        displayMessage('Correct Number!');

        number.textContent = guess;

        if (score > highscore) {
            highscore = score;
            highscoreHTML.textContent = highscore;
        }
            
        setBackground(body, '#299a65');

    } else if (guess !== secretNumber) {
        if (score > 1) {
            displayMessage((guess > secretNumber) ? 'Too high!' : 'Too low!');
            
            score -= 1;
            scoreHTML.textContent = score;
        } else {
            displayMessage('You lost the game!');
            scoreHTML.textContent = 0;
        }
    } 
});

/*

    Coding Challenge
    Implement a game rest functionality, so that the player can make a new guess! 

    Your tasks: 
        1. Select the element with the 'again' class and attach a click event handler 

        2. In the handler function, restore initial values of the 'score' and 
        'secretNumber' variables 

        3. Restore the initial conditions of the message, number, score and guess input 
        fields 

*/

const againButton = document.querySelector('.again');

againButton.addEventListener('click', e => {
    setBackground(body, '#1f2a51');

    score = 20;
    scoreHTML.textContent = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;

    number.textContent = '?';
    displayMessage('Start guessing...');

    document.querySelector('.guess').value = '';

});

