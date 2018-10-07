//---------------------------------------------------------------------------------
// WORD CONSTRUCTOR CONTROLLER: uses "Letter" constructor to create object for current word
//---------------------------------------------------------------------------------

const Letter = require("./letter.js"); // require the letter constructor file
const divider = "<------------ (╯°□°)╯︵◓ ------------>";

var Word = function(word) { // begin "Word" constructor function

    //---------------------------------------------------------------------------------
    // OBJECT KEY/PAIR VALUES
    //---------------------------------------------------------------------------------

    this.wordLoaded = false; // wordLoaded boolean. initially set to false
    this.wordArray = word.split(""); // take the word and turn its letters into an array
    this.letters = []; // create an array to hold the object for each letter
    this.display = []; // create an array to hold the current state of guess word at any given point in the game
    this.correctGuesses = 0; // number of user's correct guesses
    this.wrongGuesses = 0; // number of wrong guesses
    this.guesses = []; // all user guessed letters

    //---------------------------------------------------------------------------------
    // METHOD: logs current state of word to console throughout game
    //---------------------------------------------------------------------------------

    this.displayWord = function() { // begin displayWord function
        if (!this.wordLoaded) { // if a word is being initialized
            this.wordArray.forEach((letter) => { // interate through the array of letters that make up the word
                var newLetter = new Letter(letter); // construct a letter object for every letter
                this.letters.push(newLetter); // store each object to the letters array
            });
            this.letters.forEach((letter) => { // iterate through the array of letter objects
                this.display.push(letter.processLetter()); // push output of "processLetter to display array
            });
            this.wordLoaded = true; // set the wordLoaded variable to true
            console.log(`\n\n${this.display.join(" ")}\n\n\nCorrect Guesses: ${this.correctGuesses}\nGuessed: ${this.guesses.join(" ")}\n\n\n${divider}\n`); // log display to console
        }
        else { // if a word has already been loaded but needs the current state to be logged to the console
            this.display = []; // empty the display array
            this.letters.forEach((letter) => { // iterate through the array of letter objects
                this.display.push(letter.processLetter()); // push output of "processLetter to display array
            });
            console.log(`\n\n${this.display.join(" ")}\n\n\nCorrect Guesses: ${this.correctGuesses}\nGuessed: ${this.guesses.join(" ")}\n\n\n${divider}\n`); // log display to console
        };
    };

    //---------------------------------------------------------------------------------
    // METHOD: checks user guess against current guess word and re-logs
    //---------------------------------------------------------------------------------

    this.checkLetter = function(userGuess) {
        var rightCount = 0;
        this.letters.forEach((letter) => { // iterate through the array of letter objects
            if (userGuess === letter.char && !letter.guessed) { // if user's guess is correct and has not already been guessed
                letter.guessed = true; // set it's guessed property to true
                rightCount++; // increase rightCount
                this.correctGuesses++; // increase correct guesses
                this.guesses.push(userGuess); // push user guess to guesses array
            };
        });
        if (rightCount === 0) { // if the guess was incorrect
            this.wrongGuesses++; // increase wrong guesses count
            this.guesses.push(userGuess); // push user guess to guesses array
        };
        this.displayWord(); // run displayWord to log the current state of the word to the console
    };

    //---------------------------------------------------------------------------------
};

//---------------------------------------------------------------------------------
// EXPORTS
//---------------------------------------------------------------------------------

module.exports = Word;



