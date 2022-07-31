let myCanvas = document.getElementById("my-canvas");
let pen = myCanvas.getContext("2d");
const WIDTH = myCanvas.width;
const HEIGHT = myCanvas.height;

let switchGravity = true;
myCanvas.onclick = function () {
    switchGravity= !switchGravity;
};

let eventKeyB = "";
let body = document.getElementsByTagName("body")[0];
body.onkeydown = function (event) {
    console.log(event.code);
    key = event.code;
}
body.onkeyup = function (event) {
    key = "";
}
let key = "";

function ballNormal() {
    pen.beginPath();
    pen.arc(50 + ballPosWidth,
        550 + 220 + ballPosHeight,
        50,
        0,
        2 * Math.PI);
    pen.fillStyle = "#D873EF";
    pen.fill();
    pen.stroke();
    pen.closePath();
}

function ballCrouch() {
    pen.beginPath();
    pen.ellipse(50 + ballPosWidth,
        563 + 220 + ballPosHeight,
        38,
        75,
        Math.PI / 2,
        0,
        2 * Math.PI
    );
    pen.fillStyle = "#D873EF";
    pen.fill();
    pen.stroke();
    pen.closePath();
}

function ballJumpStat() {
    pen.beginPath();
    pen.ellipse(50 + ballPosWidth,
        563 + 220 + ballPosHeight,
        38,
        75,
        Math.PI,
        0,
        2 * Math.PI
    );
    pen.fillStyle = "#D873EF";
    pen.fill();
    pen.stroke();
    pen.closePath();
}

function ballNor_Cro() {
    pen.clearRect(0, 0, WIDTH, HEIGHT);
    ballCrouch();
}

function ballNor_Jump() {
    pen.clearRect(0, 0, WIDTH, HEIGHT);
    ballJumpStat();
}


function ballStatus(){
    switch (key) {
        case "Space":
            if(ballPosHeight>jumpLimit){
                ballPosHeight-=15;
                ballNor_Jump();
            }
            break;
        case "KeyS":
            if (ballPosHeight + limit >= 820) {
                ballPosHeight += 0;
            }
            ballNor_Cro();
            break;
        case "KeyA":
            ballPosWidth -= 5;
            break;
        case "KeyD":
            ballPosWidth += 5;
            break;
    }
    console.log(ballPosHeight);
}

let FPS = 60;
let ballPosHeight = 0;
let ballPosWidth = 0;
let direction = 1;
let limit = 820;
let gravity = limit;
let startFrameTime = Date.now();

function gameGravity(){
    if (ballPosHeight+gravity<gravity){
        ballPosHeight +=8;
    }
}
let jumpLimit = -290;
let jump_prepare =0;
function jumpPrep(){
    
    if(key == "KeyS"){
        ballCrouch();
        if(jump_prepare>jumpLimit){
            jump_prepare-=5;
        }
        console.log(jump_prepare);
        if (key == ""){
            if(ballPosHeight>jump_prepare){
                ballPosHeight-=15;
                ballNor_Jump();
            }
        }
    }

}

function gameLoop() {
    pen.clearRect(0, 0, WIDTH, HEIGHT);
    ballNormal();
    ballStatus();
    gameGravity();
    showFPS();
    jumpPrep();
}


function showFPS(){

    let currentFrameTime = Date.now();
    let deltaTime = currentFrameTime - startFrameTime;
    let actualFPS = parseInt(1000/ deltaTime);
    pen.beginPath();
    pen.fillStyle ="orange";
    pen.font = "15pt Arial";
    pen.fillText("FPS: " + actualFPS, 30, 30);
    startFrameTime=currentFrameTime;
}


setInterval(gameLoop, 1000 / FPS);
