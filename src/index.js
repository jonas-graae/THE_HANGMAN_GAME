import Hangman from './hangman';
import getPuzzle from './requests';

const puzzleElement = document.getElementById('puzzle');
const guessesElement = document.getElementById('guesses');
let game1;

window.addEventListener('keypress', (e) => {
    const guess = String.fromCharCode(e.charCode);
    game1.makeGuess(guess);
    render();
});

const render = () => {
    puzzleElement.innerHTML = "";
    let puzzleText = game1.puzzle.split("");

    
    puzzleText.forEach((letter) => {
        const listItem = document.createElement('li');

        if(letter !== ' ') {
            listItem.innerText = letter;
            puzzleElement.appendChild(listItem);
        } else {
            listItem.classList.add('break');
            puzzleElement.appendChild(listItem);
        }
    });

    guessesElement.textContent = game1.statusMessage;
}

const startGame = async () => {
    const puzzle = await getPuzzle(2);
    game1 = new Hangman(puzzle, 5);
    render();
}

document.getElementById('reset').addEventListener('click', startGame);
startGame();