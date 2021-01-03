var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var tank = new Image();
tank.src = "img/tank.gif";

var sizeTX = 40,
    sizeTY = 100;  //Sizes Tank in canvas

var xPos = cvs.width / 2 - sizeTX / 2;
    yPos = cvs.height - sizeTY

document.addEventListener("keydown", function(e) { keyDown(e);});

function draw(){
    ctx.clearRect(0, 0, cvs.width, cvs.height); //clearing of canvas
    ctx.drawImage(tank, xPos, yPos, sizeTX, sizeTY);
    requestAnimationFrame(draw);
}

function keyDown(e){
    switch (e.keyCode){
        case 87: // W
            
            yPos -= 2;
            break;
        case 83: // S - back
            yPos += 2;
            break;

    }
}

tank.onload = draw;