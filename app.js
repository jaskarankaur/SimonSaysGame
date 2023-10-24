let gameSeq = [];
let userSeq = [];
let colors = ["red", "green", "purple","blue"];
let highestScore = 0;

let level = 0;
let started = false;
let heading = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game started");
        started = true;
        levelup();
    }
});

function btnflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 400);
}

function levelup(){
    userSeq = [];
    level++;
    heading.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random()*3);
    let randomClr = colors[randomIdx];
    let ranbtn = document.querySelector(`.${randomClr}`);
    gameSeq.push(randomClr);
    btnflash(ranbtn);
}

function checkAns(idx){
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelup, 1000);
        }
    }else{
        if(level>highestScore){
            highestScore = level;
            let nav = document.querySelector(".nav");
            nav.innerText = `Highest Score : ${highestScore}`;
        }
        heading.innerText = "Game over. Your score is "+level+
         ". Press any key to start new game.";

        let backgr = document.querySelector("body");
        backgr.classList.add("danger");
        setTimeout(function(){
            backgr.classList.remove("danger");
        }, 200)
        reset();
    }
}

function btnPress(){
    let btn = this;
    btnflash(btn);
    let userClr = btn.getAttribute("id");
    userSeq.push(userClr);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}