//DECLARE GLOBAL DATA
//Character Sets as individaul strings
var specialCharacters = "@%+'!#$^?:,(){}[]~-_.";
var numericCharacters = "0123456789";
var lowercaseCharacters = "abcdefghijklmnopqrstuvwxyz";
var uppercaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

//Character Sets Stored in Array
var allCharacterSets = [
  specialCharacters,
  numericCharacters,
  lowercaseCharacters,
  uppercaseCharacters
];

//Character Set Names Stored in Array
var characterSetNames = [
  "special",
  "numeric",
  "lowercase",
  "uppercase"
]

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Creates a character string to be sent back to writePassword(), var `password`
function generatePassword() {
  //The length of the password to create
  var passwordLength = askPasswordLength();
  //Check if the password length fits the constraints
  if (passwordLength < 8 || passwordLength > 128 || isNaN(passwordLength)) {
    //Alert informs the user that the input was invalid
    alert("Password length must be a number between 8 and 128 characters.");
    //A blank string is sent back to the textbox and the user starts again
    return "";
  }

  //The user's choices as to which character sets to use are stored here
  var userCharacterSetChoices = chooseCharacterSets(characterSetNames.length);
  //A function that when used with .reducer will add the total values of an array
  var reducer = (total,zero) => total + zero;
  //Adds the values of `userCharacterSetChoices` together
  var sumOfUserCharacterSetChoices = userCharacterSetChoices.reduce(reducer);
  //Triggers if no character sets were selected
  if (sumOfUserCharacterSetChoices === 0) {
    //Alert informs the user that they need to include at least one set of characters
    alert("Please include at least one set of characters to use.");
    //A blank string is sent back to the textbox and the user starts again
    return "";
  }

  //One string holding all requested character sets
  var combinedCharacterSets = combineRequestedCharacterSets(userCharacterSetChoices);
  
  //The randomized password string to return once guaranteed
  var randomizedPasswordCharacters = assignRandomCharacters(passwordLength, combinedCharacterSets);

  //Check if the password needs to guarantee that each choosen character set was used
  if (sumOfUserCharacterSetChoices === 1) {
    //If one character set was used a guarantee is not needed and the randomized string is returned to `password` in writePassword()
    return randomizedPasswordCharacters;
  //Othersiwe more than one set was used
  } else {
    //The randomized string needs to guarantee that at least one character from each set has been included
    randomizedPasswordCharacters = guaranteePasswordContainsCharacterSets(passwordLength, sumOfUserCharacterSetChoices, userCharacterSetChoices, randomizedPasswordCharacters);
    //The randomized characters are returned to `password` in writePassword()
    return randomizedPasswordCharacters;
  }
} 

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Collects a value from the user for their password length
function askPasswordLength() { 
  //Using prompt immediately takes the user input value and assigns it to `length`
  var length = Math.floor(prompt("How many characters would you like your password to contain?", "Please enter a value between 8 and 128"));
  //The length is returned to `passwordLength` in generatePassword()
  return length;
} 

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Collects the users choices for which character sets to include in password generation and stores them in an array
function chooseCharacterSets(numberOfCharacterSets) {
  //Creating a new array to hold the choices 
  var eachCharacterSetChoice = [];
  //Asks the user to choose what character sets they want to use
  for (var i = 0; i < numberOfCharacterSets; i++ ) {
    //Each of the choices is stored in the array by retrieving a true or false using a confirm box
    eachCharacterSetChoice[i] = confirm("Click OK to confirm including "+characterSetNames[i]+" characters.");
  }
  //The result is returned to array `userCharacterSetChoices` in generatePassword()
  return eachCharacterSetChoice;
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Combines the individual sets of characters the user wants into one string value
function combineRequestedCharacterSets(usersChoices) {
  //Creating an empty string to hold the combined value
  var addingCharacterSetsTogether = "";
  //For each choice evaluate if the set should be combined into string
  for (var i = 0; i < usersChoices.length; i++ ) {
    //If "OK" was choosen
    if (usersChoices[i]) {
      //Add that set into string
      addingCharacterSetsTogether += allCharacterSets[i];
    }
  }
  //The result is returned to string `combinedCharacterSets` in generatePassword()
  return addingCharacterSetsTogether;
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//A randomized password is generated adding characters to the string for the length requested
function assignRandomCharacters(length, characters) {
  //An empty string to store random characters
  var randomString = "";
  //For the length of the password add a random character to the string
  for (var i = 0; i < length; i++ ) {
    //Pick a random character from the set
    var randomCharacter = Math.floor(Math.random()*characters.length);
    //Add random character to the end of the string
    randomString += characters[randomCharacter];
  }
  //The result is returned to string `randomizedPasswordCharacters` in generatePassword()
  return randomString;
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Divide randomized password into segments and inserts a character from user selected sets in rare case they were not automatically included
function guaranteePasswordContainsCharacterSets(length, sumOfChoices, userChoices, randomizedPassword) {
  //The size of each part of the password to be evaluated and not overlap indices
  var passwordChunk = Math.floor(length/sumOfChoices);
  //Split the randomized characters into individual array indices to be replaced
  var splitPasswordCharacters = randomizedPassword.split("");
  //Used to skip over any character sets not choosen by the user
  var unusedCharacterSets = 0;
  //For each user choice guarantee that a specific character set was included
  for (var i = 0; i < userChoices.length; i++ ) {
    //If a character set was choosen
    if(userChoices[i]) {
      //Defines where a password chunk index range should start
      var startOfPasswordChunk = (passwordChunk*(i-unusedCharacterSets));
      //Sets an index value within range of the upper limit of a given password chunk
      var randomPasswordChunkIndex = (Math.floor(Math.random()*passwordChunk));
      //Pulls a random character from a choosen set to replace a character in the split password
      var newCharacterFromSpecificSet = allCharacterSets[i][Math.floor(Math.random()*allCharacterSets[i].length)];
      //Replaces a random character in range of the password chunk with a guaranteed character
      splitPasswordCharacters[startOfPasswordChunk + randomPasswordChunkIndex] = newCharacterFromSpecificSet;
    //Otherwise the character set wasn't used and the skipped value increases
    } else {
      //Add one to number of sets unused
      unusedCharacterSets++;
    }
  }
  //The new randomized password is the result of joining the split characters back together
  randomizedPassword = splitPasswordCharacters.join("");
  //The result is returned to string `randomizedPasswordCharacters` in generatePassword()
  return randomizedPassword;
}