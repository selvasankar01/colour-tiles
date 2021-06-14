var refrenceEasy = Array.from(document.querySelectorAll('.threecrosssolution'));
var refrenceNormal = Array.from(document.querySelectorAll('.fourcrosssolution'));
var entireBlock;
var givenOrderBig = Array();
var initialEmptyBlock;
var emptyBox;
var playerCount = 0;
const button = document.querySelector('button');
const playArea = document.querySelector('#container');
const checkEasy = Array.from(document.querySelectorAll('.three'));
var checkNormal;
var moves = 0;
var player1Moves;
var player2Moves

function randomColorGenerator(){
    let colorList = ['blue','yellow','orange','white','green','maroon'];
    return colorList[Math.floor(Math.random()*6)];
}
function emptyBoxSelector(a){
    emptyBox = document.getElementById(String(Math.floor(Math.random()*a+1)));
    initialEmptyBlock = emptyBox;
    //console.log(emptyBox);
    emptyBox.style.backgroundColor = null;
}

function namePrompt(){
    playerCount++;
    let nameField = document.querySelector('#name');
    name = prompt(`Enter Player${playerCount}'s Name`);
    if (name){
        nameField.textContent = `Player Name: ${name}`;
    }
    else{
        name = `Player ${playerCount}`;
        nameField.textContent = `Player Name:${name}`;
    }
}

function movesSetter(){
    document.querySelector('#moves').textContent = `No Of Moves: ${moves}`;
}

function colorAssignment(blockArray,a){

    var countYellow = 0;
    var countWhite = 0;
    var countOrange = 0;
    var countBlue = 0;
    var countGreen = 0;
    var countMaroon = 0;
    var randomColor = randomColorGenerator();
    correctOrder = Array();
    givenOrderBig = Array();

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
                if(blockArray.length < 17){
                    correctOrder.push(randomColor);
                    //console.log(correctOrder);
                }
                else{
                    givenOrderBig[i] = randomColor;
                    givenOrderBig[parseInt(emptyBox.id,10)-1] = 'gray';
                    //console.log(givenOrderBig);
                }
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

function resetter(array,a){
    if (button.innerText === 'Start'){
        button.textContent = 'Reset';
        game();
    }
    else if(button.innerText === 'Wait'){
        button.innerText = 'Start';
    }
    else if (button.innerText === 'Reset') {
        moves = 0;
        movesSetter();
        colorAssignment(array,a);
        colorAssignment(entireBlock,a);
    }
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
                localStorage.setItem('easyScore',moves);
            }
            else{
                if(localStorage.getItem('easyScore') > moves){
                    localStorage.getItem('esayHigh') = name;
                    localStorage.getItem('easyScore') = moves;
                }
            }
            document.querySelector('#final').play();
            alert(`You Finished in ${moves} moves!\nThis is Finished in ${localStorage.getItem('easyScore')} moves by ${localStorage.getItem('easyHigh')} which is least one!`);
            playerTwo();
        }
        else if(checkArray.length === 16){
            if(!localStorage.getItem('normalScore')){
                localStorage.setItem('normalHigh',name);
                localStorage.setItem('normalScore',moves);
            }
            else{
                if(localStorage.getItem('normalScore') > moves){
                    localStorage.getItem('normalHigh') = name;
                    localStorage.getItem('normalScore') = moves;
                }
            }
            document.querySelector('#final').play();
            alert(`You Finished in ${moves} moves!\nThis is Finished in ${localStorage.getItem('normalScore')} moves by ${localStorage.getItem('normalHigh')} which is least one!`);
            playerTwo();
        }
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
                checker();
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
                checker();
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
       // console.log(`clicked.id - ${num} = ${parseInt(emptyBox.id)-num}`);
    });    
    //console.log(`No.of Moves: ${moves}`);
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
    colorAssignment(refrenceEasy,4);
    entireBlock = Array.from(document.querySelectorAll('.five'));
    colorAssignment(entireBlock,4);    
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
    colorAssignment(refrenceNormal,6);
    colorAssignment(entireBlock,6);
    resetter(refrenceNormal,6);
}

function playerTwo(){
    if(playerCount == 1){
        namePrompt();
        if(document.querySelector('select').value === 'easy'){
            correctOrder.forEach((e,i) => {
                refrenceEasy[i].style.backgroundColor = e;
            });
        }
        else{
            correctOrder.forEach((e,i) => {
                refrenceNormal[i].style.backgroundColor = e;
            });
        }
        givenOrderBig.forEach((e,i) => {
            entireBlock[i].style.backgroundColor = e;
        });
        player1Moves = moves;
        moves = 0;
        emptyBox = initialEmptyBlock;
        movesSetter();
        game();
    }
    else{
        player2Moves = moves;
        if(player1Moves > player2Moves){
            alert(`Player 2 Wins and finished in ${player2Moves}`);
        }
        else if(player2Moves > player1Moves){
            alert(`Player 1 Wins and finished in ${player1Moves}`);
        }
        window.location.reload();
    }
}

function main(){
    namePrompt();
    emptyBoxSelector(25);
    colorAssignment(refrenceEasy,4);
    entireBlock = Array.from(document.querySelectorAll('.five'));
    colorAssignment(entireBlock,4);
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

var player =document.querySelector('#noofplayers');

player.onchange = () => {
    if(player.value === 'single'){
        location.assign('index.html');
    }
}
main();