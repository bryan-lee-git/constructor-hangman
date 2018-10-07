//------------------------------------------------------------------------------
// RANDOM POKEMON NAME GENERATOR + POKEMON STATS CONSTRUCTOR CONTROLLER
//------------------------------------------------------------------------------

const pokemonData = require("pokemon"); // require random pokemon generator package
const baseStats = require('pokemon-base-stats');

//------------------------------------------------------------------------------
// CONSTRUCTOR: generate new pokemon object using pokemon npm libraries
//------------------------------------------------------------------------------

var Pokemon = function(name, hp, attack, defense, sAttack, sDefense, speed) { // new pokemon object params

    //---------------------------------------------------------------------------------
    // OBJECT STATS/STAT VALUES
    //---------------------------------------------------------------------------------

    this.name = name;
    this.hp = hp;
    this.attack = attack; 
    this.defense = defense;
    this.sAttack = sAttack;
    this.sDefense = sDefense;
    this.speed = speed;

    //---------------------------------------------------------------------------------
    // METHOD: prints pokemon stats
    //---------------------------------------------------------------------------------

    this.printStats = function() { // print all stats in object like so...
        console.log(`${this.name}\nHP: ${this.hp}\nAttack: ${this.attack}\nDefense: ${this.defense}\nSpecial Attack: ${this.sAttack}\nSpecial Defense: ${this.sDefense}\nSpeed: ${this.speed}`);
    };
};

//------------------------------------------------------------------------------
// FUNCTION: generate random word using pokemon npm library and run it through the pokemon contructor
//------------------------------------------------------------------------------

function wordGen() { // generate random pokemon and create stat object
    
    var randomWord = pokemonData.random(); // set to variable
    var pokeStats = baseStats.getByName({ name: randomWord }); // get stats for randomly chosen pokemon
    var pokemon = new Pokemon(randomWord.toLowerCase(), pokeStats[0], pokeStats[1], pokeStats[2], pokeStats[3], pokeStats[4], pokeStats[5]); // create a pokemon object w/ acquired data
    return pokemon;
};

//------------------------------------------------------------------------------
// EXPORTS
//------------------------------------------------------------------------------

module.exports = wordGen;