//------------------------------------------------------------------------------
// CONSTRUCTOR HANGMAN: main app controller
//------------------------------------------------------------------------------

const inquirer = require("inquirer"); // require inquirer package
const Word = require("./word.js"); // require Word constructor controller package
const wordGen = require("./wordgen.js"); // require wordGen random word/pokemon name and pokemon data/stats object constructor controller
const divider = "<------------ (╯°□°)╯︵◓ ------------>"
const gameInfo = `${divider}\n\nPOKÉMON CONSTRUCTOR HANGMAN\n\nCorrectly guess the pokémon's name to\ncatch it. Gotta catch 'em all!\n\nA node.js, closure, callback, and constructor function project. \nUofU/Trilogy Full-Stack Bootcamp. \n\nAuthor: Bryan Lee \nCreated: Oct 6, 2018. \nhttps://bryan-lee-git-github.io \n\n${divider}` // game intro blurb and instructions
var numCaught = 0; // set counter for number of pokemon caught/rounds won
var pokemonCaught = []; // set empty array to hold the names of all pokemon caught this game
var roundNum = 0; // set a counter for the game rounds

//------------------------------------------------------------------------------
// FUNCTION: intialize the program, continue playing
//------------------------------------------------------------------------------

function startGame() { // begin initialize game function
    if (roundNum === 0) { // if new game/round 0
        console.table(`\n${gameInfo}\n`); // log the game info/intro 
        inquirer.prompt([ // start prompt
            { name: "confirm", message: "Would you like to play?", type: "confirm" } // ask if they would like to play
        ]).then((answers) => { // get answer
            if (answers.confirm) { // if true/yes
                runGame(); // run game
            };
        });
    } else { // if any round after round 0
        inquirer.prompt([ // start prompt
            { name: "confirm", message: "Would you like to play again? Gotta catch 'em all!", type: "confirm" } // ask if they would like to keep playing 
        ]).then((answers) => { // get answer
            if (answers.confirm) { // if yes/true
                runGame(); // run game
            };
        });
    }
} startGame(); // initial call of startGame function on program load up

//------------------------------------------------------------------------------
// FUNCTION: begin new game with new word
//------------------------------------------------------------------------------

function runGame() { // begin main game function
    var newPokemon = wordGen(); // construct new Pokemon object and guess word
    var currentWord = new Word(newPokemon.name.toLowerCase()); // construct new Word object
    currentWord.displayWord(); // log the current state of the guess word
    function playRound() { // function to play a round
        inquirer.prompt([ // start inquirer
            { name: "guess", message: "Guess a letter..." } // enter a letter
        ]).then((answers) => { // get answers
            currentWord.checkLetter(answers.guess); // check to see if letter is in word
            if (currentWord.correctGuesses === currentWord.letters.length) { // if the amount of correct guesses equals the length of the word, the user catches the pokemon
                pokemonCaught.push(newPokemon.name); // push the pokemon's name to the caught array
                roundNum++; // increase the round number
                numCaught++; // increase the number of pokemon caught
                console.log(`NICE! YOU CAUGHT...\n`); // console log that the pokemon was caught
                newPokemon.printStats(); // print stats from the pokemon object
                console.log(`\nYou've caught ${numCaught} pokémon!\nPokédex: ${pokemonCaught.join(", ").toUpperCase()}\n\n${divider}\n`); // print summary stats to end round
                startGame(); // ask if user would like to play another game and continue catching pokemon
            } else if (currentWord.wrongGuesses === 10) { // if the user gets to 10 wrong guesses, the pokemon gets away
                console.log(`OH NO! ${newPokemon.name} GOT AWAY!!!\nYou've caught ${numCaught} pokémon!\nPokédex: ${pokemonCaught.join(", ").toUpperCase()}\n\n${divider}\n`);
                roundNum++;
                startGame();
            } else playRound(); // if regular turn and game needs to progress, play next guess/round
        });
    }
    playRound(); // run initial playRound function
};
