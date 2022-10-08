function generatePassword(){
    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*";
    var passwordLength = 16;
    var password = "";

    for (var i=0; i<passwordLength; i++){
        var randomCharacters = Math.floor(Math.random()*chars.length);
        password += chars.substring(randomCharacters,randomCharacters+1);

    }
    document.getElementById("password").value = password
}