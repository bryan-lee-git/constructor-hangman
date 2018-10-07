//---------------------------------------------------------------------------------
// LETTER CONSTRUCTOR CONTROLLER: creates unique objects for letters
//---------------------------------------------------------------------------------

var Letter = function(letter) { // begin new letter constructor

    //---------------------------------------------------------------------------------
    // LETTER OBJECT KEY/PAIR VALUES
    //---------------------------------------------------------------------------------

    this.char = letter; // variable for underlying letter character
    this.guessed = false; // boolean: has letter has been guessed yet?

    //---------------------------------------------------------------------------------
    // METHOD: processes letter and returns character based on guessed/not guessed
    //---------------------------------------------------------------------------------

    this.processLetter = function() { // return result for guessed or not
        if (this.guessed) { // if guessed is true
            return this.char.toString(); // return the letter character
        } else { // if not true
            return "_"; // return an underscore
        };
    };
};

//---------------------------------------------------------------------------------
// EXPORTS
//---------------------------------------------------------------------------------

module.exports = Letter;