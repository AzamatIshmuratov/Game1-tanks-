let cvs, ctx;
let xPosBeg, yPosBeg; //beginning position of tank
let bodyTank;   //body of tank
let tower;  //tower of tank
let shell, enemy;  //снаряд и танк врага

window.onload = startGame;

let xSh = 0, ySh = 0;  //rotation change of shell

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

        ctx.save();
        ctx.translate(this.dx, this.dy);
        ctx.rotate(this.angRotate);
        ctx.translate(-this.dx, -this.dy)
        ctx.drawImage(this.image, this.xPos + xPosShell , this.yPos + yPosShell);
        if (this.type == 'shell'){
            this.xPosDel = this.xPos + xPosShell;
            this.yPosDel = this.yPos + yPosShell;
        }
        ctx.restore();
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
}

class ComponentShell extends Component{
    constructor(xPos, yPos,srcImage, type){
        super(xPos, yPos,srcImage, type);
        this.xPosDel = 0;
        this.yPosDel = 0;
    }
    crashEnemy(otherObj){ //столкновение
        let leftPos = otherObj.xPos;
        let rightPos = leftPos + 100;
        let topPos = otherObj.yPos;
        let bottomPos = topPos + 100;
        if (this.xPosDel > leftPos && this.xPosDel < rightPos && this.yPosDel < bottomPos && this.yPosDel > topPos ){
            console.log ("crash");
            return true;
        }
        return false;
    }
}

class ComponentEnemy extends Component{
    constructor (xPos, yPos,srcImage, type, speed){
        super(xPos, yPos,srcImage, type);
        this.speed = speed;
    }
    updateEnemy(){
        super.update();
        this.xPos += this.speed;
    }
}


function startGame(){
    cvs = document.getElementById("canvas");
    ctx = cvs.getContext("2d");

    cvs.onmousemove = (pos) => {
        tower.calcAngle(pos);
    };

    cvs.onmousedown = (pos2) => {
        xSh = 0; ySh = 0;
        // shell.xPos = bodyTank.xPos;
        // shell.yPos = bodyTank.yPos;
        shell.calcAngle(pos2);
    };

    xPosBeg = cvs.width / 2 - 23;  //Begining position x of tank
    yPosBeg = cvs.height - 100;    //Begining position y of tank

    bodyTank = new Component (xPosBeg, yPosBeg, "img/body.png", 'body');
    tower = new Component (xPosBeg, yPosBeg, "img/tower.png", 'tower');
    shell = new ComponentShell (xPosBeg, yPosBeg, "img/shell.png", 'shell');
    enemy = new ComponentEnemy (0, 50, "img/enemy.png", 'enemy', 2);

    draw();
}

function draw(){

    ctx.clearRect(0, 0 , cvs.width, cvs.height); //clearing of canvas

    bodyTank.update();
    xSh += 6;
    ySh -= 6;

    shell.update(xSh + 17, ySh + 36); //changing of position of shell
    
    tower.update(6, -7);  //correcting center of tower

    enemy.updateEnemy();
    if (shell.crashEnemy(enemy)){
        console.log("+ 1");
    }
    if (enemy.xPos > cvs.width){
        enemy.xPos = 0;
    }

    requestAnimationFrame(draw); //redrawing
}

function keyDown(e){
    switch (e.keyCode){
        case 87: // w
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





