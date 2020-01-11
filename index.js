"use strict";

const $ = jQuery.noConflict();

window.gameOptions ={
    score : 0,
    randomNumber : NaN,
    column : 6,
    row : 6
}

$(document).ready(function(){
    addCirclesToDom();
    geneateRandomNumberAndHighlightCircle();

    /* 
        On click of playbutton update user Score to Zero
        Add event listener to Circle Div
    */
    document.getElementsByClassName("playBtn")[0].addEventListener('click',function(){
        gameOptions.score = 0;
        document.querySelector('#gameForm').addEventListener('click',playGame);       
    });
    
    /* 
        Alert user score
        Reser user score to zero
        Remove Event listener on click of stopButton
    */
    document.getElementsByClassName("stopBtn")[0].addEventListener('click',function(){
        alertUserScore();
        gameOptions.score = 0
        updateScoreToDomView(gameOptions.score);// update user Score to Zero
        document.querySelector('#gameForm').removeEventListener('click',playGame);
    });
});

const geneateRandomNumberAndHighlightCircle = function(){
    gameOptions.randomNumber = Math.floor(Math.random() * (gameOptions.row*gameOptions.column-1) ) ; 
    document.getElementById(`circle-${gameOptions.randomNumber}`).classList.add("green");//make random circle green        
}

const addCirclesToDom = function(){
    const fragment = document.createDocumentFragment(); //create a virtual Fragmented DOM to stop reflow  
    for (let i = 0; i < gameOptions.row; i++) {
        //create a row Element{row:0 -> 6}
        const rowElement = document.createElement("div");
        rowElement.className="row";
        //create and append all circles of current row to RowDom
        for(let j=0; j < gameOptions.column; j++){
            let circleElement = document.createElement("div");
            circleElement.className=`circle`; //default circle Class is white
            circleElement.id = `circle-${gameOptions.row*i+j}`;
            //add data-attribute so that circle can be identified during event delegation
            circleElement.setAttribute('data-circleNumber',gameOptions.row*i+j) ;
            rowElement.append(circleElement);
        }
        fragment.append(rowElement);//append the row to Fragmented DOM
    } 
    document.getElementById("gameForm").append(fragment);
}

const alertUserScore = function(){
    window.alert(`You scored ${gameOptions.score}`)
}

const playGame = function(event){
    const selectedCircleNumber = event.target.dataset.circlenumber;
    if(typeof selectedCircleNumber !== "undefined"){//selection should be on circle
        /* 
        If user clicked right circle 
        incrment score
        removed the green color from highlighted circle
        rerandomized new circle
        else
        decrement user score
        */
       if(gameOptions.randomNumber === +selectedCircleNumber){
            gameOptions.score +=1
            document.getElementById(`circle-${selectedCircleNumber}`).classList.remove("green");
            geneateRandomNumberAndHighlightCircle();
        }else{
            gameOptions.score-=1
        }
        updateScoreToDomView(gameOptions.score);
    }
}

const updateScoreToDomView = function(score){
    document.getElementsByClassName("scoreDiv")[0].innerText = score;
}