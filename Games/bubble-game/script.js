var rn = 0;
var score = 0;
var clickedNum = 0;
const MakeBubble = function(){
    var  clutter = "";
    for (var i=0; i<102; i++){
    clutter += `<div class="bubble"> ${Math.floor(Math.random()*10)}</div>`;
    document.querySelector("#pbtm").innerHTML = clutter;
};
document.querySelector("#pbtm").innerHTML = clutter;
};

const increaseScore = function(){
    score+=10;
    document.querySelector("#scoreVal").textContent = score ;

}

var timer = 60;
const runTimer = function(){
    var timeint = setInterval(function(){
        if(timer>0){
            timer--;
            document.querySelector("#timeval").textContent = timer;
        }
        else{
            clearInterval(timeint);
            document.querySelector("#pbtm").innerHTML = `<h1>Game Over!</h1>`;
           
        }
    },1000);
};

const hit = function(){
    rn = Math.floor(Math.random()*10);
    document.querySelector("#hitval").textContent = rn;
}

const scoreCal = function(){
    document.querySelector("#pbtm").addEventListener("click",function(dets){
        var clickedNum = Number(dets.target.textContent);
        if(clickedNum === rn ){
            increaseScore();
            MakeBubble();
        };
    });
    
};

MakeBubble();
runTimer();
hit();
scoreCal();
