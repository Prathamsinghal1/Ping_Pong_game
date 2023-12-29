var ball = document.getElementById("ball");
var rod1 = document.getElementById("rod1");
var rod2 = document.getElementById("rod2");

var rod1Name = "Rod1";
var rod2Name = "Rod2";


let maxScore=0,score=0,movement,rod,ballSpeedX=1.25,ballSpeedY=1.25,rodName = "Rod1";

let gameOn = false;

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

(function(){
    rod = localStorage.getItem(rodName);
    score = localStorage.getItem(maxScore);
    alert(`${rodName} has Maximum Score of ${maxScore*100}`);
})();

function resetBoard(rodName){

    rod1.style.left = (windowWidth - rod1.offsetWidth)/2 + 'px';
    rod2.style.left = (windowWidth - rod2.offsetWidth)/2 + 'px';

    ball.style.left = (windowWidth - ball.offsetWidth)/2 + 'px';

    if(rodName === rod2Name){
        ball.style.top = (rod1.offsetTop + rod1.offsetHeight) + 'px';
        ballSpeedY = 1.25;
    }
    else if(rodName === rod1Name){
        ball.style.top = (rod2.offsetTop - rod2.offsetHeight) + 'px';
        ballSpeedY = -1.25;
    }
    score=0;
    gameOn = false;     
}

function gameWinner(rodName,score){
    if(score>maxScore){
        maxScore = Math.max(score,maxScore);
        localStorage.setItem(rodName,maxScore);
    }
    clearInterval(movement);
    resetBoard(rodName);
    alert(`Winner is ${rodName}, Score is ${score*100} and MaxScore is ${maxScore*100}`);
}

window.addEventListener('keypress',function(){

    let rodSpeed = 10;
    
    let rodAxes = rod1.getBoundingClientRect();

    if(this.event.code === 'KeyD' && (rodAxes.x + rodAxes.width +10)<windowWidth){
        rod1.style.left=rodAxes.x+rodSpeed+'px';
        rod2.style.left=rod1.style.left;
    }

    else if(this.event.code === 'KeyA' && rodAxes.x-8>0){
        rod1.style.left=rodAxes.x-rodSpeed+'px';
        rod2.style.left=rod1.style.left;
    }
});

(document.getElementById("myBtn").addEventListener("click",function(){
        if(!gameOn){
            gameOn=true;

            let ballAxes = ball.getBoundingClientRect();

            let ballX = ballAxes.x;
            let ballY = ballAxes.y;
            let ballDia = ballAxes.width;

            let rod1Height = rod1.offsetHeight;
            let rod2Height = rod2.offsetHeight;
            
            let rod1Width = rod1.offsetWidth;
            let rod2Width = rod2.offsetWidth;

            movement = setInterval(function(){
                ballX+=ballSpeedX;
                ballY+=ballSpeedY;

                let rod1X = rod1.getBoundingClientRect().x;
                let rod2X = rod2.getBoundingClientRect().x;
                let rod1Y = rod1.getBoundingClientRect().y;

                ball.style.left = ballX + 'px';
                ball.style.top = ballY + 'px';

                if(ballX+ballDia > windowWidth || ballX<0){
                    ballSpeedX = -1*ballSpeedX;
                }

                let ballPos = ballX + ballDia/2;

                if(ballY <= rod1Y){
                    ballSpeedY = -1*ballSpeedY;
                    score++;
                    
                    if(ballPos < rod1X || ballPos > rod1X + rod1Width){
                        gameWinner(rod2Name , score);
                    }
                }
                else if(ballY + ballDia >= windowHeight - rod2Height){
                    ballSpeedY = -1*ballSpeedY;
                    score++;

                    if(ballPos < rod2X || ballPos > rod2X + rod2Width){
                        gameWinner(rod1Name,score);
                    }
                }

            },10)

        }
}));
