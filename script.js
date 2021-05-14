//DECLARE GLOBAL DATA
//Character Sets
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
console.log("~ allCharacterSets", allCharacterSets);

//----------------------------------------------------------------------------
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
//----------------------------------------------------------------------------

