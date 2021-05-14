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

//Creates a character string to be sent back to writePassword(), var password
function generatePassword() {
  var passwordLength = askPasswordLength();

  
}

//Collects a value from the user for their password length
function askPasswordLength() {
  passwordLength = prompt("How many characters would you like your password to contain?", "Please enter a value between 8 and 128");
  
  if (passwordLength < 8 || passwordLength > 128) {
    alert("Password length must be between 8 and 128 characters.");
    return
  } else {
    return passwordLength;
  }
}