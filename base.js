const button = document.querySelector('button');
const playArea = document.querySelector('#container');
var refrence = Array.from(document.querySelectorAll('.threecrosssolution'));
var checkThisOne = Array.from(document.querySelectorAll('.three'));
var entireBlock;
var moves = 0;
var score = 0;
var inter;
var emptyBox;
var name;

function randomColorGenerator(){
    let colorList = ['blue','yellow','orange','white','green','maroon'];
    return colorList[Math.floor(Math.random()*6)];
}

function emptyBoxSelector(a){
    emptyBox = document.getElementById(String(Math.floor(Math.random()*a+1)));
    console.log(`emptyBox = ${emptyBox.id}`);
    emptyBox.style.backgroundColor = null;
}

function movesSetter(){
    document.querySelector('.moves').textContent = `No Of Moves: ${moves}`;
}

function namePrompt(){
    let nameField = document.querySelector('#name');
    name = prompt('Enter your Name');
    if (name){
        nameField.textContent += name;
    }
    else{
        name = 'Player1';
        nameField.textContent += 'Player1';
    }
}

function timer(){
    if(inter){
        clearInterval(inter);
    }
    var seconds = 0;
    var minutes = 0;
    var timeHolder = document.querySelector('#time');
    function i (){
        seconds++;
        if(seconds % 60 ==0){
            minutes++;
            seconds = 0;
        }
        timeHolder.textContent = `Time: ${minutes}:${seconds}`;
        score = 100 - ((seconds+(minutes*60))/10+(moves/5));
    }
    inter = setInterval(i,1000);
    //console.log(`inter = ${inter}`);
}

function resetter(array,a){    
    if (button.innerText === 'Start'){
        button.textContent = 'Reset';
        game();
        timer();
    }
    else if(button.innerText === 'Wait'){
        button.innerText = 'Start';
    }
    else if (button.innerText === 'Reset') {
        button.textContent = 'Start';
        moves = 0;
        movesSetter();
        document.querySelector('#time').innerText = 'Time: 0:0';
        clearInterval(inter);
        colorControl(array,a);
        colorControl(entireBlock,a);
    }
}

function game(){
    var num;  //alowas the block to move up and down
    playArea.addEventListener('click',(e) => {
        var clickedDiv = e.target;
        var temp = clickedDiv.style.backgroundColor;
        var data;

        if(document.querySelector('select').value === 'easy'){
            data = clickedDiv.dataset.position;
            num = 5;
        }
        else if(document.querySelector('select').value === 'normal'){
            data = clickedDiv.dataset.normal;
            num = 6;
        }


        if(document.querySelector('#time').textContent != 'Time: 0:0'){
            if(clickedDiv.id == parseInt(emptyBox.id,10)+1){
                if(data != 'leftcolumn'){
                    moveSounds(true);
                    emptyBox.style.backgroundColor = temp;
                    emptyBox = clickedDiv;
                    emptyBox.style.backgroundColor = null;
                    moves++;
                    movesSetter();
                    checker()
                }
            }

            else if(clickedDiv.id == parseInt(emptyBox.id,10)-1){
                if(data != 'rightcolumn'){
                    moveSounds(true);
                    emptyBox.style.backgroundColor = temp;
                    emptyBox = clickedDiv;
                    emptyBox.style.backgroundColor = null;
                    moves++;
                    movesSetter();
                    checker()
                }
            }

            else if(clickedDiv.id == parseInt(emptyBox.id,10)+num){
                moveSounds(true);
                emptyBox.style.backgroundColor = temp;
                emptyBox = clickedDiv;
                emptyBox.style.backgroundColor = null;
                moves++;
                movesSetter();
                checker();
            }

            else if(clickedDiv.id == parseInt(emptyBox.id,10)- num){
                moveSounds(true);
                emptyBox.style.backgroundColor = temp;
                emptyBox = clickedDiv;
                emptyBox.style.backgroundColor = null;
                moves++;
                movesSetter();
                checker();
            }
            else{
                 moveSounds(false);
                 console.log('Played Wrong tune');
            }
        }
    });    
}
function moveSounds(boolean) {
    if(boolean){
        document.querySelector('#move').play();
    }
    else{
        document.querySelector('#wrong').play();
    }
}

function checker(){

    var count = 0;
    for(let i = 0; i < refrence.length; i++){
        if(refrence[i].style.backgroundColor === checkThisOne[i].style.backgroundColor){
            count++;
        }
        else{
            break;
        }
    }

    if(count === checkThisOne.length){
        if (checkThisOne.length === 9){
            if(!localStorage.getItem('easyScore')){
                localStorage.setItem('easyHigh',name);
                localStorage.setItem('easyScore',score);
            }
            else{
                if(localStorage.getItem('easyScore') < score){
                    localStorage.setItem('easyHigh',name);
                    localStorage.setItem('easyScore',score);
                }
            }
            document.querySelector('#final').play();
            alert(`Your Score is ${score}\nHighest Score is by ${localStorage.getItem('easyHigh')} and is ${localStorage.getItem('easyScore')}`);
            resetter(refrence,4);
        }
        else if(checkThisOne.length === 16){
            if(!localStorage.getItem('normalScore')){
                localStorage.setItem('normalHigh',name);
                localStorage.setItem('normalScore',score);
            }
            else{
                if(localStorage.getItem('normalScore') < score){
                    localStorage.setItem('normalHigh',name);
                    localStorage.setItem('normalScore',score);
                }
            }
            document.querySelector('#final').play();
            alert(`Your Score is ${score}\nHighest Score is by ${localStorage.getItem('normalHigh')} and is ${localStorage.getItem('normalScore')}`);
            resetter(refrence,6);
        }
    }
}

function colorControl(blockArray,a){
    
    var countYellow = 0;
    var countWhite = 0;
    var countOrange = 0;
    var countBlue = 0;
    var countGreen = 0;
    var countMaroon = 0;
    var randomColor = randomColorGenerator();

    for(let i =0; i < blockArray.length; i++){

        if(blockArray[i].id != emptyBox.id){

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
        }
    }
}

function easyMode(){
    resetter(refrence,6);
    document.querySelector('style').remove();
    for(let i = 10; i < 17;i++){
        var j = String(i)+'s';
        document.getElementById(j).remove();
    }
    for(let i = 26; i < 37;i++){
        document.getElementById(String(i)).remove();
    }
    emptyBoxSelector(25);
    colorControl(refrence,4);
    entireBlock = Array.from(document.querySelectorAll('.five'));
    colorControl(entireBlock,4);
}

function normalMode(){

    resetter(refrence,4);
    for(let i = 10; i<17; i++){
        console.log(i);
        var newBlock = document.createElement('div');
        newBlock.setAttribute('class','fourcrosssolution');
        newBlock.setAttribute('id',`${i}s`);
        document.querySelector('#solution').appendChild(newBlock);
    }

    for(let j =26; j< 37; j++){
        console.log(j);
        var newBlock = document.createElement('div');
        newBlock.setAttribute('class','six');
        newBlock.setAttribute('id',`${j}`);
        if(j<30){
            newBlock.setAttribute('class',' six four');
        }
        else if(j>29 && j<32){
            switch(j){
                case 30:
                    newBlock.dataset.normal = 'rightcolumn';
                    break;
                case 31:
                    newBlock.dataset.normal = 'leftcolumn';
                    break;
            }
        }

        playArea.appendChild(newBlock);
    }

    var styling = '#container{\
    grid-template-columns: repeat(6,1fr);\
    grid-template-rows: repeat(6,1fr);\
    }\
    #solution{\
    grid-template-columns: repeat(4,1fr);\
    grid-template-rows: repeat(4,1fr);\
    }'

    var styleElement = document.createElement('style');
    styleElement.innerHTML += styling;
    document.querySelector('head').appendChild(styleElement);
    document.querySelector('button').textContent = 'Reset';
    emptyBoxSelector(36);
    moves = 0;
    movesSetter();
    refrence = Array.from(document.querySelectorAll('.fourcrosssolution'));
    checkThisOne = Array.from(document.querySelectorAll('.four'));
    entireBlock = Array.from(document.querySelectorAll('.six'));
    colorControl(refrence,6);
    colorControl(entireBlock,6);
    resetter(refrence,6);
}

function runit(){
    namePrompt();
    emptyBoxSelector(25);
    colorControl(refrence,4);
    entireBlock = Array.from(document.querySelectorAll('.five'));
    colorControl(entireBlock,4);
    resetter(refrence,4);
    var selection = document.querySelector('select');
    selection.onchange = () => {
        if(selection.value === 'easy'){
            easyMode();
        }
        if(selection.value === 'normal'){
            normalMode();
        }
    }
}

button.addEventListener('click',() =>{
    if(document.querySelector('select').value == 'easy'){
        resetter(refrence,4);
    }
    else if(document.querySelector('select').value == 'normal'){
        resetter(refrence,6);
    }
});

var player = document.querySelector('#playersModes');

player.onchange = () => {
    if(player.value === 'multi'){
        location.assign('multiplayer.html');
    }
}

runit();