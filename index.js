let inquirer = require("inquirer");
let Words = require("./word");
let chalk = require("chalk");

let wordsArray = ["fox", "goat", "sheep", "turtle", "snail", "beatle", "lion", "tiger", "bear", "monkey", "hippopotamus", "zebra"]

let guessesRemaining = 9;
let currentWordString = "";
let currentWord = "";
let wordGuessed = false;

console.log(chalk.bgCyan("Animals Word Guess!"))
//function to choose a new current word 
let newCurrentWord = function(){
    let num = Math.floor(Math.random() * wordsArray.length);
    currentWordString = wordsArray[num];
    currentWord = new Words(currentWordString);
    currentWord.wordString();
};

newCurrentWord();

function wordGuessedChecker(){
    function isGuessed(letter){
            return (letter.guessed === true)
        };

    let array = currentWord.letters;
        let test = array.every(isGuessed);
    if (test === true){
        wordGuessed = true;
    }
}

function reset(){
    inquirer.prompt([
        {
            type: "list",
            name: "continue",
            message: "Want to go again?",
            choices: ["Yes", "No"]
        }
    ]).then(function(answer){
        if(answer.continue === "Yes"){
            guessesRemaining = 9;
            wordGuessed = false;
            newCurrentWord();
            askLetter();
        } else if(answer.continue === "No"){
            console.log("See you later!")
        }
    })
}

//function to prompt for a letter guess
let askLetter = function(){
    wordGuessedChecker();
    if(guessesRemaining > 0 && wordGuessed === false ){
        inquirer.prompt([
            {
                name: "guess",
                message: "Guess a Letter! "
            }
        ]).then(function(answer){
            if (currentWordString.indexOf(answer.guess) !== -1) {
                currentWord.letterCheck(answer.guess);
                console.log(chalk.green("You are Correct!"))
                console.log("Guesses Remaining: " + guessesRemaining)
                currentWord.wordString();
                askLetter();
            } else if (currentWordString.indexOf(answer.guess) === -1){
                guessesRemaining--
                console.log(chalk.red("You are Wrong!"));
                console.log("Guesses Remaining: " + guessesRemaining);
                currentWord.wordString();
                askLetter();
            }
        })
    } else if (guessesRemaining <= 0 && wordGuessed === false){
        console.log(chalk.red("Out of Chances, Better luck next time!"));
        reset();

    } else if (guessesRemaining > 0 && wordGuessed === true){
        console.log(chalk.green("You are correct! "));
        reset();
    }
}
askLetter();