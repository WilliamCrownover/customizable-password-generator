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
//Creates a character string to be sent back to writePassword(), var password
function generatePassword() {
  //The length of the password to create
  var passwordLength = askPasswordLength();
  //Check if the password length fits the constraints
  if (passwordLength < 8 || passwordLength > 128) {
    //Alert informs the user that the input was invalid
    alert("Password length must be between 8 and 128 characters.");
    //A blank string is sent back to the textbox and the user starts again
    return "";
  }

  //The users choices as to which character sets to use are stored here
  var userSetChoices = [];
  //One string holding all requested characters, starts with nothing
  var combinedCharacters = "";
  //The randomized password string to return once guaranteed
  var passwordRandomized = "";


  //If askPasswordLength() returned "tryAgain" the function stops and resets the process
  if (!passwordLength) {
    //A blank string is sent back to the textbox
    return "";
  }

  //Asks the user to choose what character sets they want to use
  for (var i = 0; i < characterSetNames.length; i++ ) {
    //Each of the four choices is stored in the array by retrieving a true or false using a confirm box
    userSetChoices[i] = confirm("Click OK to confirm including "+characterSetNames[i]+" characters.");

    //Each time a user clicks "OK" the corresponding character set is added to `combinedCharacters`
    if (userSetChoices[i]) {
      combinedCharacters += allCharacterSets[i];
    }
    //On the fourth loop the combined string is checked to make sure at least one set was choosen
    if (i == characterSetNames.length-1 && combinedCharacters === "") {
      //If nothing was selected an alert informs the user to pick one character set
      alert("Please include at least one set of characters to use.");
      //A blank string is sent back to the textbox
      return "";
    }
  }

  //A randomized password is generated adding characters to the string for the length requested
  for (var i = 0; i < passwordLength; i++ ) {
    //Each random character is added to the end of the string
    passwordRandomized += combinedCharacters[Math.floor(Math.random()*combinedCharacters.length)]
  }
  
  var reducer = (total,zero) => total + zero;
  var sumOfSetChoices = userSetChoices.reduce(reducer);

  if (sumOfSetChoices === 1) {
    return passwordRandomized;
  } else {
    passwordRandomized = guaranteePasswordContainsSets(passwordLength, sumOfSetChoices, userSetChoices, passwordRandomized);
    return passwordRandomized;
  }
} 

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Collects a value from the user for their password length
function askPasswordLength() { 
  //Using prompt immediately takes the user input value and assigns it to `length`
  var length = prompt("How many characters would you like your password to contain?", "Please enter a value between 8 and 128");
  //The length is returned to generatePassword()
  return length;
} 

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Divide randomized password into segments and inserts a character from user selected sets in rare case they were not automatically included
function guaranteePasswordContainsSets(passwordLength, sumOfSetChoices, userSetChoices, passwordRandomized) {
  var passwordChunk = Math.floor(passwordLength/sumOfSetChoices);
  var splitPassword = passwordRandomized.split("");
  var skippedSet = 0;

  for (var i = 0; i < userSetChoices.length; i++ ) {
    if(userSetChoices[i]) {
      splitPassword[(passwordChunk*(i-skippedSet))+(Math.floor(Math.random()*passwordChunk))] = allCharacterSets[i][Math.floor(Math.random()*allCharacterSets[i].length)];
    } else {
      skippedSet++;
    }
  }

  passwordRandomized = splitPassword.join("");

  return passwordRandomized;
}