//------------------------------------------------------------------------------
// CONSTRUCTOR HANGMAN: main app controller
//------------------------------------------------------------------------------

const inquirer = require("inquirer"); // require inquirer package
const Word = require("./word.js"); // require Word constructor package
const pokemon = require("pokemon"); // require random pokemon generator package
var divider = "<------------ (╯°□°)╯︵◓ ------------>"
const gameInfo = `${divider}\n\nPOKEMON CONSTRUCTOR HANGMAN\n\nCorrectly guess the pokemon's name name to catch it. Gotta catch 'em all!\n\nA node.js, closure, callback, and object \nconstructor function homework project. UofU/Trilogy Full-Stack Bootcamp. \n\nAuthor: Bryan Lee \nCreated: Oct 6, 2018. \nhttps://bryan-lee-git-github.io \n\n${divider}`
var numCaught = 0;
var pokemonCaught = [];
var roundNum = 0;

//------------------------------------------------------------------------------
// FUNCTION: generate random word using pokemon npm library
//------------------------------------------------------------------------------

function wordGen() { // generate random pokemon
    var randomWord = pokemon.random().toLowerCase(); // set to variable
    console.log(randomWord);
    return randomWord; // return the randomWord variable
};

//------------------------------------------------------------------------------
// FUNCTION: intialize the program, continue playing
//------------------------------------------------------------------------------

function startGame() {
    if (roundNum === 0) {
        console.table(`\n${gameInfo}\n`);
        inquirer.prompt([
            { name: "confirm", message: "Would you like to play?", type: "confirm" }
        ]).then((answers) => {
            if (answers.confirm) {
                runGame();
            };
        });
    } else {
        inquirer.prompt([
            { name: "confirm", message: "Would you like to play again? Gotta catch 'em all!", type: "confirm" }
        ]).then((answers) => {
            if (answers.confirm) {
                runGame();
            };
        });
    }
} startGame();

//------------------------------------------------------------------------------
// FUNCTION: begin new game with new word
//------------------------------------------------------------------------------

function runGame() {
    var currentWord = new Word(wordGen()); // create a Word object using the output of wordGen function
    currentWord.displayWord(); // log the current state of the guess word
    function playRound() {
        inquirer.prompt([
            { name: "guess", message: "Guess a letter..." }
        ]).then((answers) => {
            currentWord.checkLetter(answers.guess);
            if (currentWord.correctGuesses === currentWord.letters.length) {
                var pokeball = currentWord.wordArray.join("").toUpperCase();
                pokemonCaught.push(pokeball);
                roundNum++;
                numCaught++;
                console.log(`${divider}\n\nNICE! YOU CAUGHT A ${pokeball}!!!\nYou've caught ${numCaught} pokemon!\nPokedex: ${pokemonCaught.join(", ")}\n\n${divider}\n`);
                startGame();
            } else playRound();
        });
    }
    playRound();
};
