var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var body = new Image(47, 90);  //body of tank
var tower = new Image(40, 72);  //tower of tank
body.src = "img/body.png";
tower.src = "img/tower.png";

var xPos = cvs.width / 2 - body.width / 2,
    yPos = cvs.height - body.height - 10;

var ang = 0; //angle rotation tower 
    dx = xPos + body.width / 2,  //set the center of rotation tower
    dy = yPos + body.height / 2;

document.addEventListener("keydown", function(e) { keyDown(e);});

function draw(){
    ctx.clearRect(0, 0, cvs.width, cvs.height); //clearing of canvas
    ctx.drawImage(body, xPos, yPos);
    
    ctx.save();
    ctx.translate(dx, dy);
    ctx.rotate(ang * Math.PI / 180);
    ctx.translate(-dx, -dy)
    ctx.drawImage(tower, xPos + 2, yPos - 7);
    ctx.restore();
    ang += 1;
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

tower.onload = draw;