var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var body = new Image(47, 90);  //body of tank
var tower = new Image(40, 72);  //tower of tank
var shell = new Image();
shell.width = 12;
shell.height = 12;
body.src = "img/body.png";
tower.src = "img/tower.png";
shell.src = "img/shell.png"; 

var xPos = cvs.width / 2 - body.width / 2, //position of tank
    yPos = cvs.height - body.height - 10;

var xPos_shell = 0, yPos_shell = 0;  //смещение снаряда

var ang_tow = 0; //angle rotation tower 
var ang_shell = 0; //angle shell 
var dx, dy; //set the center of rotation tower

var counter = 0; //global counter for reloading of shell 

document.addEventListener("keydown", function(e) { keyDown(e);});
cvs.onmousemove = mouseMov;
cvs.onmousedown = mouseDown;

function draw(){
    ctx.clearRect(0, 0 , cvs.width, cvs.height); //clearing of canvas
    
    dx = xPos + body.width / 2;  
    dy = yPos + body.height / 2;

    ctx.drawImage(body, xPos, yPos);
   
    /*угол наклона снаряда*/
    if (counter != 0 && counter < 150) {
        xPos_shell += 6;
        yPos_shell -= 6;
        ctx.save();
        ctx.translate(dx, dy);
        ctx.rotate(ang_shell);
        ctx.translate(-dx, -dy)
        ctx.drawImage(shell , xPos + tower.width / 2 + xPos_shell, yPos + tower.height / 2 + yPos_shell);
        ctx.restore();
        counter++;
    }
    else counter = 0;
    //console.log (counter);

    /*Определение положения башни*/
    ctx.save();
    ctx.translate(dx, dy);
    ctx.rotate(ang_tow);
    ctx.translate(-dx, -dy)
    ctx.drawImage(tower, xPos + 6, yPos - 7);
    ctx.restore();
    /*********конец опред башни***/

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
function mouseMov(pos){
    var deltaY = dy  - pos.clientY,  //delta is difference coordinates mouse event
        deltaX = pos.clientX - dx;   //and tank coordin.
    ang_tow = Math.atan(deltaY / deltaX);
    if (deltaX < 0)
        ang_tow = - Math.PI / 2 - ang_tow;  //part 1 and 4 in Trigonom. Circle
    else 
        ang_tow =  Math.PI / 2 - ang_tow; //part 2 and 3*/
}

function mouseDown(pos){
    if (counter == 0){
        var deltaY = dy  - pos.clientY,  //delta is difference coordinates mouse event
            deltaX = pos.clientX - dx;   //and tank coordin.
        ang_shell = Math.atan(deltaY / deltaX);
        if (deltaX < 0)
            ang_shell = - 3 * Math.PI / 4 - ang_shell;  //part 1 and 4 in Trigonom. Circle
        else 
            ang_shell =  Math.PI / 4 - ang_shell; //part 2 and 3
        xPos_shell = 0; yPos_shell = 0;
        counter++;
    }

}

tower.onload = draw;