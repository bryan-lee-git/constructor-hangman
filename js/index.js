//------------------------------------------------------------------------------
// MAIN CONTROLLER: contructor word guess + pokemon catching game
//------------------------------------------------------------------------------

const inquirer = require("inquirer"); // require inquirer package
const Word = require("./word.js"); // require word constructor
const wordGen = require("./wordgen.js"); // require random word/pokemon name + pokemon constructor controller
const divider = "<------------ (╯°□°)╯︵◓ ------------>"; // divider to be used throughout in console logs
const gameInfo = `${divider}\n\nPOKÉMON CONSTRUCTOR HANGMAN\n\nCorrectly guess the pokémon's name to\ncatch it. Gotta catch 'em all!\n\nA node.js, closure, callback, and constructor function project. \nUofU/Trilogy Full-Stack Bootcamp. \n\nAuthor: Bryan Lee \nCreated: Oct 6, 2018. \nhttps://bryan-lee-git-github.io \n\n${divider}`; // game intro blurb / instructions
var numCaught = 0; // set counter for # of pokemon caught/rounds won
var pokemonCaught = []; // set empty array for names of pokemon caught this game
var roundNum = 0; // set a counter for the # of game rounds

//------------------------------------------------------------------------------
// MAIN GAME - FUNCTION: intialize the program, continue playing
//------------------------------------------------------------------------------

function game() { // begin initialize game function
    if (roundNum === 0) { // if new game/round 0
        console.log(`\n${gameInfo}\n`); // log the game info/intro 
        inquirer.prompt([ // start prompt
            { name: "confirm", message: "Would you like to play?", type: "confirm" } // play game?
        ]).then((answers) => { // get answer
            if (answers.confirm) { // if true/yes
                round(); // run game
            };
        });
    } else { // if any round after round 0
        inquirer.prompt([ // start prompt
            { name: "confirm", message: "Continue? Gotta catch 'em all!", type: "confirm" } // continue?
        ]).then((answers) => { // get answer
            if (answers.confirm) { // if yes/true
                round(); // run game
            };
        });
    };
}; game(); // initial call of game function on program load up

//------------------------------------------------------------------------------
// EACH ROUND - FUNCTION: begin new game with new word
//------------------------------------------------------------------------------

function round() { // begin main game function
    var newPokemon = wordGen(); // construct new Pokemon object and guess word
    var currentWord = new Word(newPokemon.name.toLowerCase()); // construct new Word object
    currentWord.displayWord(); // log the current state of the guess word
    function guess() { // function to play a round
        inquirer.prompt([ // start inquirer
            { name: "guess", message: "Guess a letter..." } // enter a letter
        ]).then((answers) => { // get answers
            currentWord.checkLetter(answers.guess); // check to see if letter is in word
            if (currentWord.correctGuesses === currentWord.letters.length) { // if # correct = word.length, catch pokemon
                pokemonCaught.push(newPokemon.name); // push the pokemon's name to the caught array
                roundNum++; // increase the round number
                numCaught++; // increase the number of pokemon caught
                console.log(`NICE! YOU CAUGHT...\n`); // console log that the pokemon was caught
                newPokemon.printStats(); // print stats from the pokemon object
                console.log(`\nYou've caught ${numCaught} pokémon!\nPokédex: ${pokemonCaught.join(", ").toUpperCase()}\n\n${divider}\n`); // print summary stats to end round
                game(); // ask if user would like to play another game and continue catching pokemon
            } else if (currentWord.wrongGuesses === 10) { // if the user gets to 10 wrong guesses, pokemon gets away
                console.log(`OH NO! ${newPokemon.name.toUpperCase()} GOT AWAY!!!\nYou've caught ${numCaught} pokémon!\nPokédex: ${pokemonCaught.join(", ").toUpperCase()}\n\n${divider}\n`);
                roundNum++; // increase round number
                game(); // start new game round
            } else guess(); // if regular turn and game needs to progress, play next guess/round
        });
    };
    guess(); // run initial guess function
};