const refrenceEasy = Array.from(document.querySelectorAll('.threecrosssolution'));
var refrenceNormal = Array.from(document.querySelectorAll('.fourcrosssolution'));
const checkEasy = Array.from(document.querySelectorAll('.three'));
var checkNormal;
var entireBlock;
const button = document.querySelector('button');
const playArea = document.querySelector('#container');
var moves = 0;
var inter;
var score = 0;
var emptyBox;
var name = 'Player';

function randomColorGenerator(){
    let colorList = ['blue','yellow','orange','white','green','maroon'];
    return colorList[Math.floor(Math.random()*6)];
}

function emptyBoxSelector(a){
    emptyBox = document.getElementById(String(Math.floor(Math.random()*a)));
    //console.log(`emptyBox = ${emptyBox.id}`);
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
    var num;
    playArea.addEventListener('click',(e) => {
        var clickedDiv = e.target;
        //console.log('Clicked',clickedDiv);
        var temp = clickedDiv.style.backgroundColor;
        var data;
        var toCheck;
        if(document.querySelector('select').value === 'easy'){
            data = clickedDiv.dataset.position;
            toCheck = checkEasy;
            num = 5;
        }
        else if(document.querySelector('select').value === 'normal'){
            data = clickedDiv.dataset.normal;
            toCheck = checkNormal;
            num = 6;
        }
        //console.log(`typeof of num = ${typeof(num)} and num = ${num}`);
        if(document.querySelector('#time').textContent != 'Time: 0:0'){
            if(clickedDiv.id == parseInt(emptyBox.id,10)+1){
                if(data != 'leftcolumn'){
                    // console.log(clickedDiv.nextElementSibling);
                    // console.log(`Changing Color to ${temp}`);
                    document.querySelector('#move').play();
                    emptyBox.style.backgroundColor = temp;
                    emptyBox = clickedDiv;
                    emptyBox.style.backgroundColor = null;
                    moves++;
                    movesSetter();
                    checker(toCheck)
                }
            }

            else if(clickedDiv.id == parseInt(emptyBox.id,10)-1){
                if(data != 'rightcolumn'){
                    // console.log(clickedDiv.nextElementSibling);
                    // console.log(`Changing Color to ${temp}`);
                    document.querySelector('#move').play();
                    emptyBox.style.backgroundColor = temp;
                    emptyBox = clickedDiv;
                    emptyBox.style.backgroundColor = null;
                    moves++;
                    movesSetter();
                    checker()
                }
            }

            else if(clickedDiv.id == parseInt(emptyBox.id,10)+num){
                // console.log(clickedDiv.nextElementSibling);
                // console.log(`Changing Color to ${temp}`);
                document.querySelector('#move').play();
                emptyBox.style.backgroundColor = temp;
                emptyBox = clickedDiv;
                emptyBox.style.backgroundColor = null;
                moves++;
                movesSetter();
                checker();
            }

            else if(clickedDiv.id == parseInt(emptyBox.id,10)- num){
                // console.log(clickedDiv.nextElementSibling);
                // console.log(`Changing Color to ${temp}`);
                document.querySelector('#move').play();
                emptyBox.style.backgroundColor = temp;
                emptyBox = clickedDiv;
                emptyBox.style.backgroundColor = null;
                moves++;
                movesSetter();
                checker();
            }
            else{
                document.querySelector('#wrong').play();
            }
            //console.log(`clicked.id - ${num} = ${parseInt(emptyBox.id)-num}`);
        }
    });    
    //console.log(`No.of Moves: ${moves}`);
}

function checker(){
    var count = 0;
    var checkArray;
    if (document.querySelector('select').value === 'easy'){
        checkArray = checkEasy;
        for(let i = 0; i < refrenceEasy.length; i++){
            if(refrenceEasy[i].style.backgroundColor === checkEasy[i].style.backgroundColor){
                count++;
                //console.log('Correct Block');
            }
            else{
                break;
            }
        }
    }
    else if(document.querySelector('select').value === 'normal'){
        checkArray = checkNormal;
        for(let i =0; i < refrenceNormal.length; i++){
            if(refrenceNormal[i].style.backgroundColor === checkNormal[i].style.backgroundColor){
                count++;
                //console.log('Correct Block');
            }
            else{
                break;
            }
        }
    }
    if(count === checkArray.length){
        if (checkArray.length === 9){
            if(!localStorage.getItem('easyScore')){
                localStorage.setItem('easyHigh',name);
                localStorage.setItem('easyScore',score);
            }
            else{
                if(localStorage.getItem('easyScore') < score){
                    localStorage.getItem('esayHigh') = name;
                    localStorage.getItem('easyScore') = score;
                }
            }
            document.querySelector('#final').play();
            alert(`Your Score is ${score}\nHighest Score is by ${localStorage.getItem('easyHigh')} and is ${localStorage.getItem('easyScore')}`);
            resetter(refrenceEasy,4);
        }
        else if(checkArray.length === 16){
            if(!localStorage.getItem('normalScore')){
                localStorage.setItem('normalHigh',name);
                localStorage.setItem('noramlScore',score);
            }
            else{
                if(localStorage.getItem('normalScore') < score){
                    localStorage.getItem('normalHigh') = name;
                    localStorage.getItem('normalScore') = score;
                }
            }
            document.querySelector('#final').play();
            alert(`Your Score is ${score}\nHighest Score is by ${localStorage.getItem('normalHigh')} and is ${localStorage.getItem('normalScore')}`);
            resetter(refrenceNormal,6);
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

    //console.log(`blockArray  = ${blockArray.length}`);

    for(let i =0; i < blockArray.length; i++){
        
        // console.log(`i = ${i}`);
        // console.log(`randomColor = ${randomColor}`)

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
            //console.log(`Changed randomColor = ${randomColor}`);
        }
        //console.log(`orange = ${countOrange}, yellow = ${countYellow}, blue = ${countBlue}, green = ${countGreen}, maroon = ${countMaroon}, white = ${countWhite}...`);
    }
}

function easyMode(){
    resetter(refrenceNormal,6);
    document.querySelector('style').remove();
    for(let i = 10; i < 17;i++){
        var j = String(i)+'s';
        document.getElementById(j).remove();
    }
    for(let i = 26; i < 37;i++){
        document.getElementById(String(i)).remove();
    }
    emptyBoxSelector(25);
    colorControl(refrenceEasy,4);
    entireBlock = Array.from(document.querySelectorAll('.five'));
    colorControl(entireBlock,4);

}

function normalMode(){

    resetter(refrenceEasy,4);
    var str = ' <div class="fourcrosssolution" id="10s"></div>\
                <div class="fourcrosssolution" id="11s"></div>\
                <div class="fourcrosssolution" id="12s"></div>\
                <div class="fourcrosssolution" id="13s"></div>\
                <div class="fourcrosssolution" id="14s"></div>\
                <div class="fourcrosssolution" id="15s"></div>\
                <div class="fourcrosssolution" id="16s"></div>'

    document.querySelector('#solution').innerHTML += str;

    var strcon = '<div class="six four" id="26"></div>\
                <div class="six four" id="27"></div>\
                <div class="six four" id="28"></div>\
                <div class="six four" id="29"></div>\
                <div class="six" id="30" data-normal="rightcolumn"></div>\
                <div class="six" id="31" data-normal="leftcolumn"></div>\
                <div class="six" id="32" data-normal="bottomrow"></div>\
                <div class="six" id="33" data-normal="bottomrow"></div>\
                <div class="six" id="34" data-normal="bottomrow"></div>\
                <div class="six" id="35" data-normal="bottomrow"></div>\
                <div class="six" id="36" data-normal="bottomright"></div>'

    document.querySelector('#container').innerHTML += strcon;

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
    refrenceNormal = Array.from(document.querySelectorAll('.fourcrosssolution'));
    checkNormal = Array.from(document.querySelectorAll('.four'));
    entireBlock = Array.from(document.querySelectorAll('.six'));
    colorControl(refrenceNormal,6);
    colorControl(entireBlock,6);
    resetter(refrenceNormal,6);
}

function runit(){
    namePrompt();
    emptyBoxSelector(25);
    colorControl(refrenceEasy,4);
    entireBlock = Array.from(document.querySelectorAll('.five'));
    colorControl(entireBlock,4);
    resetter(refrenceEasy,4);
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
        resetter(refrenceEasy,4);
    }
    else if(document.querySelector('select').value == 'normal'){
        resetter(refrenceNormal,6);
    }
});

var player = document.querySelector('#playersModes');

player.onchange = () => {
    if(player.value === 'multi'){
        location.assign('multiplayer.html');
    }
}

runit();