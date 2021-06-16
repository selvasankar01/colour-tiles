var refrence = Array.from(document.querySelectorAll('.threecrosssolution'));
var entireBlock;
var correctOrder = Array();
var givenOrderBig = Array();
var initialEmptyBlock;
var emptyBox;
var playerCount = 0;
const button = document.querySelector('button');
const playArea = document.querySelector('#container');
var check = Array.from(document.querySelectorAll('.three'));
var moves = 0;
var player1Moves;
var player2Moves;

function randomColorGenerator(){
    let colorList = ['blue','yellow','orange','white','green','maroon'];
    return colorList[Math.floor(Math.random()*6)];
}
function emptyBoxSelector(a){
    emptyBox = document.getElementById(String(Math.floor(Math.random()*a+1)));
    initialEmptyBlock = emptyBox;
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
                if(blockArray.length < 17){
                    correctOrder.push(randomColor);
                }
                else{
                    givenOrderBig[i] = randomColor;
                    givenOrderBig[parseInt(emptyBox.id,10)-1] = 'gray';
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
        }
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
    for(let i = 0; i < refrence.length; i++){
        if(refrence[i].style.backgroundColor === check[i].style.backgroundColor){
            count++;
        }
        else{
            break;
        }
    }
    if(count === check.length){
        if (check.length === 9){
            if(!localStorage.getItem('easyScoremulti')){
                localStorage.setItem('easyHighmulti',name);
                localStorage.setItem('easyScoremulti',moves);
            }
            else{
                if(localStorage.getItem('easyScoremulti') > moves){
                    localStorage.setItem('easyHighmulti',name);
                    localStorage.setItem('easyScoremulti',moves);
                }
            }
            document.querySelector('#final').play();
            alert(`You Finished in ${moves} moves!\nThis is Finished in ${localStorage.getItem('easyScoremulti')} moves by ${localStorage.getItem('easyHighmulti')} which is least one!`);
            playerTwo();
        }
        else if(check.length === 16){
            if(!localStorage.getItem('normalScoremulti')){
                localStorage.setItem('normalHighmulti',name);
                localStorage.setItem('normalScoremulti',moves);
            }
            else{
                if(localStorage.getItem('normalScoremulti') > moves){
                    localStorage.setItem('normalHighmulti',name);
                    localStorage.setItem('normalScoremulti',moves);
                }
            }
            document.querySelector('#final').play();
            alert(`You Finished in ${moves} moves!\nThis is Finished in ${localStorage.getItem('normalScoremulti')} moves by ${localStorage.getItem('normalHighmulti')} which is least one!`);
            playerTwo();
        }
    }
}

function game(){
    var num;
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
        if(clickedDiv.id == parseInt(emptyBox.id,10)+1){
            if(data != 'leftcolumn'){
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
            document.querySelector('#move').play();
            emptyBox.style.backgroundColor = temp;
            emptyBox = clickedDiv;
            emptyBox.style.backgroundColor = null;
            moves++;
            movesSetter();
            checker();
        } 
        else if(clickedDiv.id == parseInt(emptyBox.id,10)- num){
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
    });    
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
    colorAssignment(refrence,4);
    entireBlock = Array.from(document.querySelectorAll('.five'));
    colorAssignment(entireBlock,4);    
}

function normalMode(){
    resetter(refrence,4);
    for(let i=10;i<17;i++){
        var newBlock = document.createElement('div');
        newBlock.setAttribute('class','fourcrosssolution');
        newBlock.setAttribute('id',`${i}s`);
        document.querySelector('#solution').appendChild(newBlock);
    }

    for(let j=26; j<37;j++){
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
    check = Array.from(document.querySelectorAll('.four'));
    entireBlock = Array.from(document.querySelectorAll('.six'));
    colorAssignment(refrence,6);
    colorAssignment(entireBlock,6);
    resetter(refrence,6);
}

function playerTwo(){
    if(playerCount == 1){
        namePrompt();
        if(document.querySelector('select').value === 'easy'){
            correctOrder.forEach((e,i) => {
                refrence[i].style.backgroundColor = e;
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
    colorAssignment(refrence,4);
    entireBlock = Array.from(document.querySelectorAll('.five'));
    colorAssignment(entireBlock,4);
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

var player =document.querySelector('#noofplayers');

player.onchange = () => {
    if(player.value === 'single'){
        location.assign('index.html');
    }
}
main();