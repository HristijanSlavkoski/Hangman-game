const wordsToGuess=["hamburger","computer","project","monkey","apple","penguin","germany","market","student",
"javascript","angular","music","guitar","football","hangman","waterfall","geography","movie","alphabet","letter"];
//we will be guessing 1 word from these 20

const value = Math.floor( 1 + Math.random() * 19 ); //we get 1 random word from the 20 above
const wordToGuess=wordsToGuess[value];  //we pick 1 random word
const size=wordToGuess.length;  //the number of letters in the word we picked

const pictureToHang=["HANGMANHEAD.png","HANGMANBODY.png","HANGMANLEFTHAND.png","HANGMANHANDS.png","HANGMANLEFTLEG.png","HANGMANFULL.png"];
//we change picture everytime we guess wrong letter

let wrongGuess=0;   //after 6 wrong guesses, we lose
let correctGuess=0; //if we correct all the letters, we win

$(document).ready(function(){
    //first we make 1 virtual keyboard where we can press letters with our mouose
    const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    keyboardLetters="";
    for(i=0;i<26;i++){
        keyboardLetters+="<div class=\"letterKeyboard\">"+alphabet[i].toUpperCase()+"</div>";
        //this can be button not div, but it's the same
        if(i==12){
            keyboardLetters+="<br>";    //if it gets to M, add new line, so we will have 2 rows with 13 letters
        }
    }
    $("#keyboard").html(keyboardLetters);

    //then we add blank spaces for each character in the chosen word
    wordBlanks="";
    for(i=0;i<size;i++){
        wordBlanks+="<div class=\"wordBlanks\">"+"__"+"</div>";
    }
    $("#word").html(wordBlanks);

    $(".letterKeyboard").on("click",function(){
        //if we click on the virtual keyboard with our mouse
        //this can be .one method instead of on, but for the keyup down we might still need
        //some changes
        let letter=$(this).text().toLowerCase();
        checkGuess(letter);
    })

    $("body").on("keyup",function(event){
        //it's the same logic  as letterKeyboard on click, but this is if we press key on our real keyboard
        keyAscii=event.which;
        if((keyAscii>64) && (keyAscii<91)){ //if we press key different than letter, don't count as key pressed
            letter=String.fromCharCode(keyAscii)
            checkGuess(letter.toLowerCase());
            nthChild=keyAscii-65;
        }
    })

    $("#restartGameButton").on("click",function(){
        location.reload();
    })
});

function checkGuess(letter){
    nthChild=letter.toUpperCase().charCodeAt(0);
    //we need nthChild to get the div with the letter we are guessing
    if($("#keyboard").find("div").eq(nthChild-65).attr("class")!="alreadyClicked"){
        //to check if we have pressed the button before
        flag=0;  //flag, true if we guess correct letter
        for(i=0;i<size;i++){
            if(letter==wordToGuess[i]){
                if(document.getElementsByClassName("wordBlanks")[i].innerHTML!=letter.toUpperCase()){
                    //if we had already pressed the same corret letter, dont increment correctGuess
                    document.getElementsByClassName("wordBlanks")[i].innerHTML=letter.toUpperCase()
                    correctGuess++;
                }
                //no matter if we clicked the same correct letter, we won't count it as a wrong
                flag=1;
            }
        }
        if(flag==0){
            //if we guessed wrong, then we write 1 part of the body
            $("#hangedPicture").attr("src",pictureToHang[wrongGuess]);
            wrongGuess++;
            if(wrongGuess==6){
                //if we lost all 6 guesses, we lost the game
                for(i=0;i<size;i++){
                    //we type the whole word
                    document.getElementsByClassName("wordBlanks")[i].innerHTML=wordToGuess[i].toUpperCase();                    
                }
                document.getElementById("textAboutGame").innerHTML = "You lost :( Press restart game to try again"
                $("#restartGame").attr("style","display:block");
            }
        }
        if(correctGuess==size){
            //if we guessed all the letters correct, we win
            document.getElementById("textAboutGame").innerHTML = "CONGRATULATIONS!!! YOU WON!!! Press restart game to play again"
            $("#restartGame").attr("style","display:block");
        }
        $("#keyboard").find("div").eq(nthChild-65).attr("class","alreadyClicked");
    }
}