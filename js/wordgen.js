//------------------------------------------------------------------------------
// RANDOM POKEMON NAME GENERATOR + POKEMON STATS CONSTRUCTOR
//------------------------------------------------------------------------------

const pokemonData = require("pokemon"); // require random pokemon generator package
const baseStats = require('pokemon-base-stats'); // require pokemon base stats package

//------------------------------------------------------------------------------
// POKEMON CONSTRUCTOR: generates new pokemon object
//------------------------------------------------------------------------------

var Pokemon = function(name, hp, attack, defense, sAttack, sDefense, speed) { // new pokemon params
    this.name = name;
    this.hp = hp;
    this.attack = attack; 
    this.defense = defense;
    this.sAttack = sAttack;
    this.sDefense = sDefense;
    this.speed = speed;
};

//---------------------------------------------------------------------------------
// PRINT STATS - POKEMON PROTOTYPE METHOD: prints pokemon stats
//---------------------------------------------------------------------------------

Pokemon.prototype.printStats = function() { // print all stats in object like so...
    console.log(`${this.name}\nHP: ${this.hp}\nAttack: ${this.attack}\nDefense: ${this.defense}\nSpecial Attack: ${this.sAttack}\nSpecial Defense: ${this.sDefense}\nSpeed: ${this.speed}`);
};

//------------------------------------------------------------------------------
// WORDGEN FUNCTION: generate random pokemon via npm, run through pokemon contructor
//------------------------------------------------------------------------------

function wordGen() { // generate random pokemon and create stat object
    var randomWord = pokemonData.random(); // set to variable
    var pokeStats = baseStats.getByName({ name: randomWord }); // get stats for randomly chosen pokemon
    var pokemon = new Pokemon(randomWord.toLowerCase(), pokeStats[0], pokeStats[1], pokeStats[2], pokeStats[3], pokeStats[4], pokeStats[5]); // create a pokemon object w/ acquired data
    return pokemon;
};

//------------------------------------------------------------------------------
// MODULE EXPORTS
//------------------------------------------------------------------------------

module.exports = wordGen;