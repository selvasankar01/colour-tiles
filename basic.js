const nameField = document.querySelector('#name');
const colorList = Array('green', 'blue', 'white', 'yellow', 'orange', 'maroon');
const solutionBox = Array.from(document.getElementsByClassName('threecrosssolution'));
const playingBox = Array.from(document.getElementsByClassName('five'));
const button = document.querySelector('button');
const playArea = document.querySelector('#container');
const moveCounter = document.querySelector('.moves');
const threecross = Array.from(document.getElementsByClassName('three'));
const timep = document.querySelector('#time');
var emptyBox = document.getElementById(String(Math.floor(Math.random()*25)));
emptyBox.style.backgroundColor = null;
console.log(`emptyBox = ${emptyBox.id}`);
console.log(threecross);
var randomColor;
var movesMade = 0;
var inter;
var score;



function namePrompt(){

    let name = prompt('Enter Your Name');
    if(name){
      nameField.innerHTML = `Player Name:${name}`;
    }
    else{
      nameField.innerHTML = 'Player Name:Player 1';
    }
}

function randomColorGenerator() {
    return colorList[Math.floor(Math.random() * colorList.length)];
}

function colorControl(blockArray,a){

    var countYellow = 0;
    var countOrange = 0;
    var countWhite = 0;
    var countBlue = 0;
    var countMaroon = 0;
    var countGreen = 0;

    randomColor = randomColorGenerator();
    console.log(`blockArray  = ${blockArray.length}`);

    for(i = 0; i < blockArray.length; i++){

        console.log(`i = ${i}`);
        console.log(`randomColor = ${randomColor}`)

        if (blockArray[i].id != emptyBox.id) {

            if(randomColor== 'yellow' && countYellow >= a){
                i--;
            }
            else if(randomColor== 'blue' && countBlue >= a){
                i--;
            }
            else if(randomColor== 'maroon' && countMaroon >= a){
                i--;
            }
            else if(randomColor== 'green' && countGreen >= a){
                i--;
            }
            else if(randomColor== 'orange' && countOrange >= a){
                i--;
            }
            else  if(randomColor== 'white' && countWhite >= a){
                i--;
            }
            else{
                blockArray[i].style.backgroundColor = randomColor;
            }

            switch (randomColor) {
                case 'yellow':
                    countYellow++;
                    break;
                case 'blue':
                    countBlue++;
                    break;
                case 'green':
                    countGreen++;
                    break;
                case 'orange':
                    countOrange++;
                    break;
                case 'maroon':
                    countMaroon++;
                    break;
                case 'white':
                    countWhite++;
                    break;
                default:
                    break;
            }
            randomColor = randomColorGenerator();
            console.log(`Changed randomColor = ${randomColor}`);
        }
        console.log(`orange = ${countOrange}, yellow = ${countYellow}, blue = ${countBlue}, green = ${countGreen}, maroon = ${countMaroon}, white = ${countWhite}...`);
    }
}

function checker(){
    var count = 0
    for(i=0; i < 9; i++){
        if(threecross[i].style.backgroundColor == solutionBox[i].style.backgroundColor){
            count++;
            console.log('f#ck');
        }
        else{
            break;
        }
    }
    if(count === 9){
        resetter();
        alert(`You Score is ${score}!!`);
    }
}

function game(){
    playArea.addEventListener('click',function(e){
        var clickedButton = e.target;
        console.log('Clicked',clickedButton);
        var temp = clickedButton.style.backgroundColor;

        if(clickedButton.id == Number.parseInt(emptyBox.id,10)+1){
            if(clickedButton.dataset.position != 'rightcolumn' && clickedButton.dataset.position != 'bottomleft'){
                console.log(clickedButton.nextElementSibling);
                console.log(`Changing Color to ${temp}`);
                emptyBox.style.backgroundColor = temp;
                emptyBox = clickedButton;
                emptyBox.style.backgroundColor = null;
                movesMade++;
                movesSetter();
                checker();
            }
        }

        else if(clickedButton.id == Number.parseInt(emptyBox.id,10)-1){
            if(clickedButton.dataset.position != 'leftcolumn' && clickedButton.dataset.position != 'topright'){
                console.log(clickedButton.nextElementSibling);
                console.log(`Changing Color to ${temp}`);
                emptyBox.style.backgroundColor = temp;
                emptyBox = clickedButton;
                emptyBox.style.backgroundColor = null;
                movesMade++;
                movesSetter();
                checker();
            }
        }

        else if(clickedButton.id == Number.parseInt(emptyBox.id,10)+5){
            console.log(clickedButton.nextElementSibling);
            console.log(`Changing Color to ${temp}`);
            emptyBox.style.backgroundColor = temp;
            emptyBox = clickedButton;
            emptyBox.style.backgroundColor = null;
            movesMade++;
            movesSetter();
        }

        else if (clickedButton.id == Number.parseInt(emptyBox.id,10)-5) {
            console.log(clickedButton.nextElementSibling);
            console.log(`Changing Color to ${temp}`);
            emptyBox.style.backgroundColor = temp;
            emptyBox = clickedButton;
            emptyBox.style.backgroundColor = null;
            movesMade++;
            movesSetter();
            checker();
        }
        console.log(`No.of Moves:${movesMade}`);
    });
}

function movesSetter(){
    moveCounter.innerHTML = `No of Moves: ${movesMade}`;
}

function resetter(){

    if (button.innerHTML === 'Start'){
        button.innerText = 'Reset';
        timer();
    }
    else if(button.innerHTML === 'Wait'){
        button.innerHTML = 'Start';
    }
    else if (button.innerHTML === 'Reset'){
        button.innerText = 'Start';
        movesMade = 0;
        movesSetter();
        timep.innerHTML = 'Time: 00:00';
        clearInterval(inter);
        colorControl(solutionBox,4);
        colorControl(playingBox,4);
    }

}

function timer(){
    if(inter){
        clearInterval(inter);
    }
    var seconds = 0;
    var minutes = 0;
    function i(){
        seconds++;
        if (seconds%60 == 0 ){
            minutes++;
            seconds = 0;
        }
        timep.innerHTML = `Time: ${minutes}:${seconds}`;
        score = 100-((seconds+(minutes*60))/10 +(movesMade/10));
    }
    inter = setInterval(i,1000);
    console.log(inter);
}

function runit(){

    namePrompt();
    colorControl(solutionBox,4);
    colorControl(playingBox,4);
    resetter();
    button.addEventListener('click',function(){
        game();
        resetter();
    });

}

runit();
