//---------------------------------------------------------------------------------
// LETTER CONSTRUCTOR: creates unique objects for letters
//---------------------------------------------------------------------------------

var Letter = function(letter) {
    // string value to store the underlying character for the letter
    this.char = letter;
    // boolean value that stores whether that letter has been guessed yet
    this.guessed = false;
    // function that returns the underlying character if the letter has been guessed or an underscore if the letter has not been guessed
    this.processLetter = function() {
        if (this.guessed) {
            return this.char.toString();
        } else {
            return "_";
        };
    };
};

//---------------------------------------------------------------------------------
// EXPORTS
//---------------------------------------------------------------------------------

module.exports = Letter;