//---------------------------------------------------------------------------------
// LETTER CONSTRUCTOR: creates unique objects for letters
//---------------------------------------------------------------------------------

var Letter = function(letter) { // begin new letter constructor
    this.char = letter; // variable for underlying letter character
    this.guessed = false; // boolean: has letter has been guessed yet?
};

//---------------------------------------------------------------------------------
// GUESSED? - LETTER PROTOTYPE METHOD: returns character based on guessed/not guessed
//---------------------------------------------------------------------------------

Letter.prototype.processLetter = function() { // return result for guessed or not
    if (this.guessed) { // if guessed is true
        return this.char.toString(); // return the letter character
    } else { // if not true
        return "_"; // return an underscore
    };
};

//---------------------------------------------------------------------------------
// MODULE EXPORTS
//---------------------------------------------------------------------------------

module.exports = Letter;