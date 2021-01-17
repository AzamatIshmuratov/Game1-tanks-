var cvs;
var ctx;
var xPosBeg;
var yPosBeg;
var bodyTank;
var tower;
var shell;

window.onload = startGame;

var xSh = 0, ySh = 0;  //position of shell

document.addEventListener("keydown", function(e) { keyDown(e);});

class Component{
    constructor (xPos, yPos,srcImage, type){
        this.xPos = xPos;
        this.yPos = yPos;
        this.angRotate = 0;
        this.dx = 0;
        this.dy = 0;
        this.image = new Image(); 
        this.image.src = srcImage;
        this.type = type; //shell, tower, body
    }
    
    update (xPosShell = 0, yPosShell = 0){
        this.dx = this.xPos + 23;
        this.dy = this.yPos + 45;
        //if (this.type != 'body'){
            ctx.save();
            ctx.translate(this.dx, this.dy);
            ctx.rotate(this.angRotate);
            ctx.translate(-this.dx, -this.dy)
            ctx.drawImage(this.image, this.xPos + xPosShell, this.yPos + yPosShell);
            ctx.restore();
        
        //else ctx.drawImage(this.image, this.xPos, this.yPos);
    }

    calcAngle (posMouse){
        
        let a = 1, b = 1; //for angle of shell

        if (this.type == 'shell') {a = 1.5; b = 0.5;}
        let deltaY = this.dy  - posMouse.clientY,  //delta is difference coordinates mouse event
            deltaX = posMouse.clientX - this.dx;   //and tank coordin.
        this.angRotate = Math.atan(deltaY / deltaX);
        if (deltaX < 0)
            this.angRotate = - a * Math.PI / 2 - this.angRotate;  //part 1 and 4 in Trigonom. Circle
        else 
            this.angRotate =  b * Math.PI / 2 - this.angRotate; //part 2 and 3
    }
    // xPos_shell = 0; yPos_shell = 0;

}

function startGame(){
    cvs = document.getElementById("canvas");
    ctx = cvs.getContext("2d");

    cvs.onmousemove = (pos) => {
        tower.calcAngle(pos);
    };

    cvs.onmousedown = (pos2) => {
        xSh = 0; ySh = 0;
        shell.calcAngle(pos2);
    };

    xPosBeg = cvs.width / 2 - 23;  //Begining position x of tank
    yPosBeg = cvs.height - 100;    //Begining position y of tank

    bodyTank = new Component (xPosBeg, yPosBeg, "img/body.png", 'body');
    tower = new Component (xPosBeg, yPosBeg, "img/tower.png", 'tower');
    shell = new Component (xPosBeg, yPosBeg, "img/shell.png", 'shell');

    draw();
}

function draw(){

    ctx.clearRect(0, 0 , cvs.width, cvs.height); //clearing of canvas

    bodyTank.update();
    xSh += 6;
    ySh -= 6;

    shell.update(xSh + 17, ySh + 36);
    tower.update(6, -7);  //correcting center of tower
    
    requestAnimationFrame(draw);
}

function keyDown(e){
    switch (e.keyCode){
        case 65:
            //bodyTank.angRotate -= Math.PI / 180;
            // console.log(bodyTank.angRotate);
            break;
        case 68:
            //bodyTank.angRotate += Math.PI / 180; 
            break;
        case 87: // 
            bodyTank.yPos -= 2;
            tower.yPos -= 2;
            shell.yPos -= 2;
            break;
        case 83: // S - back
            bodyTank.yPos += 2;
            tower.yPos += 2;
            shell.yPos += 2;
            break;

    }
}





