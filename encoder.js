
// Type YOUR MESSAGE (capitals and numbers only)
var r0 = "1 2  3 4"; // don't use 7
var r1 = "3 4  5 6";
var r2 = "4 5  6 8";

// Select size of a pixel
var pixel=5;

// Select the distance between edge of the image and the text
var padding=14;

// Select difficulty
var difficulty=4; 
//0=easy, 4=balanced, 10=difficult, 20=impossible, 50=random


//----- CODE -----

//coor intervals for red and cyan spectrum
colorMode(HSB);
// Message colors are: notRed = 1, notBlue = 2, notGreen = 3
// Background colors are: red = 4, blue = 5, green = 6
var redTop = 70*256/360; // center at 0
var blueLow = 160*256/360; // center at 240
var blueTop = 320*256/360; // center at 240
var purpleLow = 290*256/360; // center at 0
var greenLow = 20*256/360; // center at 120
var greenTop = 220*256/360; // center at 120

//initial cursor position
var typingPos = [padding, padding];

var odstin=random()*255;
var satur=255;

noStroke();

var zeros = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0], 
];

var MessageX=[];
var MessageY=[];
var BackgroundX=[];
var BackgroundY=[];
var MessageColor=[];
var BackgroundColor = [];

//Symbols graphics
{
// var n0x=[-4, -3, -3, -3, -2, -2, -2, -1, -1, -1, 0, 0, 0, 1, 1, 1, 2, 2, 2, 3]; // angled
// var n0y=[ 4,  3,  4,  5,  2,  4,  6,  1,  4,  6, 1, 3, 6, 1, 3, 5, 2, 3, 4, 3]; // angled
// var n1x=[-3, -2, -1, -1, -1, 0, 0, 1, 1, 2]; // angled
// var n1y=[ 5,  6,  2,  5,  7, 2, 4, 2, 3, 2]; // angled
// var n2x=[-4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2]; // angled
// var n2y=[ 4,  4,  5,  4,  6,  4,  7, 1, 4, 1, 4, 2, 3]; // angled
// var n3x=[-3, -3, -2, -1, 0, 0, 0, 0, 1, 1, 2, 2, 2]; // angled
// var n3y=[ 4,  5,  6,  6, 1, 4, 5, 6, 1, 4, 2, 3, 4]; // angled
// var n4x=[-2, -2, -1, -1, -1, 0, 0, 1, 2]; // angled
// var n4y=[ 2,  6,  1,  3,  5, 0, 4, 3, 2]; // angled
// var n5x=[-4, -3, -2, -2, -1, -1, -1, 0, 0, 0, 1, 2]; // angled
// var n5y=[ 4,  5,  2,  6,  1,  3,  6, 0, 4, 5, 1, 2]; // angled
// var n6x=[-3, -3, -3, -2, -2, -2, -1, -1, -1, 0, 0, 0, 0, 1, 2, 2]; // angled
// var n6y=[ 3,  4,  5,  2,  3,  6,  1,  3,  6, 1, 4, 5, 6, 1, 2, 3]; // angled
// var n7x=[-3, -2, -1, 0, 0, 1, 1, 2]; // angled
// var n7y=[ 5,  4,  3, 0, 3, 1, 3, 2]; // angled
// var n8x=[-3, -3, -2, -2, -1, -1, -1, 0, 0, 0, 1, 1, 2, 2]; // angled
// var n8y=[ 4,  5,  3,  6,  2,  3,  6, 1, 4, 5, 1, 4, 2, 3]; // angled
// var n9x=[-3, -3, -2, -1, -1, -1, 0, 0, 0, 1, 1, 1, 2, 2, 2]; // angled
// var n9y=[ 4,  5,  6,  2,  3,  6, 1, 4, 6, 1, 4, 5, 2, 3, 4]; // angled
// var n5x=[-3,-2,-1, 0, 1, 2, 2, 2, 1, 0,-1,-3,-2,-1, 0, 1, 2,-3,-3,-3,-3,-2]; // straight - regular
// var n5y=[ 6, 7, 7, 7, 7, 6, 5, 4, 3, 3, 3, 0, 0, 0, 0, 0, 0, 1, 2, 3, 3, 3]; // straight - regular
// var n6x=[-3,-2,-1, 0, 1, 2, 2, 2, 1, 0,-1,-2,-1, 0, 1, 2,-3,-3,-3,-3,-2, -3,-3]; // straight - regular
// var n6y=[ 6, 7, 7, 7, 7, 6, 5, 4, 3, 3, 3, 0, 0, 0, 0, 1, 1, 2, 3, 3, 3, 5, 4]; // straight - regular
var Ax=[-4, -3, -2, -1, -1, -1, 0, 0, 0, 1, 1, 1, 1];
var Ay=[ 4,  3,  3,  2,  4,  7, 2, 5, 6, 1, 2, 3, 4];
var Bx=[-4, -3, -3, -2, -2, -1, -1, -1, 0, 0, 0, 1, 1, 2, 2];
var By=[ 4,  3,  5,  2,  6,  1,  3,  6, 0, 4, 5, 1, 4, 2, 3];
var Cx=[-3, -3, -3, -2, -2, -1, -1, 0, 1, 2, 2];
var Cy=[ 3,  4,  5,  2,  6,  1,  6, 1, 1, 2, 3];
var Dx=[-4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2];
var Dy=[ 4,  3,  5,  2,  6,  1,  6, 0, 5, 1, 4, 2, 3];
var Ex=[-4, -3, -3, -2, -2, -1, -1, -1, 0, 0, 1, 2, 3];
var Ey=[ 4,  3,  5,  2,  6,  1,  3,  7, 0, 4, 1, 2, 3];
var Fx=[-4, -3, -2, -1, -1, 0, 0, 1, 2, 3];
var Fy=[ 4,  3,  2,  1,  3, 0, 4, 1, 2, 3];
var Gx=[-3, -3, -3, -2, -2, -1, -1, -1, 0, 0, 0, 1, 2, 2];
var Gy=[ 3,  4,  5,  2,  6,  1,  4,  6, 1, 5, 6, 1, 2, 3];
var Hx=[-4, -3, -2, -2, -1, -1, -1, 0, 0, 1, 2];
var Hy=[ 4,  3,  2,  6,  1,  3,  5, 0, 4, 3, 2];
var Ix=[-4, -3, -2, -1, 0];
var Iy=[ 4,  3,  2,  1, 0];
var Jx=[-3, -3, -3, -2, -1, 0, 0, 1, 1, 2, 2, 3];
var Jy=[ 3,  4,  5,  6,  6, 0, 6, 1, 5, 2, 4, 3];
var Kx=[-4, -3, -2, -2, -1, -1, -1, -1, 0, 0, 1, 2];
var Ky=[ 4,  3,  2,  6,  1,  3,  4,  5, 0, 3, 3, 2];
var Lx=[-4, -3, -3, -2, -2, -1, 0];
var Ly=[ 4,  3,  5,  2,  6,  1, 0];
var Mx=[-4, -3, -2, -1, -1, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3];
var My=[ 4,  3,  2,  1,  7, 0, 1, 2, 3, 6, 3, 5, 3, 4, 3];
var Nx=[-4, -3, -2, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 1, 2, 3];
var Ny=[ 4,  3,  2,  1,  4,  5,  6,  7, 0, 1, 2, 3, 6, 5, 4, 3];
var Ox=[-3, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2, 2];
var Oy=[ 3,  4,  5,  2,  6,  1,  6, 1, 6, 1, 5, 2, 3, 4];
var Px=[-4, -3, -2, -1, -1, 0, 0, 1, 1, 2, 2];
var Py=[ 4,  3,  2,  1,  3, 0, 4, 1, 4, 2, 3];
var Qx=[-3, -3, -3, -2, -2, -1, -1, -1, -1, 0, 0, 1, 1, 2, 2, 2];
var Qy=[ 3,  4,  5,  2,  6,  1,  5,  6,  7, 1, 6, 1, 5, 2, 3, 4];
var Rx=[-4, -3, -2, -1, -1, -1, -1, -1, -1, 0, 0, 1, 1, 2, 2];
var Ry=[ 4,  3,  2,  1,  3,  4,  5,  6,  7, 0, 4, 1, 4, 2, 3];
var Sx=[-3, -3, -2, -1, -1, -1, -1, 0, 0, 0, 0, 1, 2, 2];
var Sy=[ 4,  5,  6,  1,  2,  3,  6, 1, 4, 5, 6, 1, 2, 3];
var Tx=[-3, -2, -1, 0, 0, 1, 2];
var Ty=[ 5,  4,  3, 0, 2, 1, 2];
var Ux=[-3, -3, -3, -2, -2, -1, -1, 0, 0, 1, 2, 3];
var Uy=[ 3,  4,  5,  2,  6,  1,  6, 0, 6, 5, 4, 3];
var Vx=[-2, -2, -2, -2, -1, -1, -1, -1, 0, 0, 1, 2, 3];
var Vy=[ 3,  4,  5,  6,  1,  2,  3,  5, 0, 5, 4, 4, 3];
var Wx=[-3, -3, -2, -2, -1, -1, -1, -1, 0, 0, 0, 1, 2, 3];
var Wy=[ 3,  4,  2,  4,  1,  4,  5,  6, 0, 3, 6, 5, 4, 3];
var Xx=[-4, -3, -3, -2, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 1, 2, 2, 3];
var Xy=[ 4,  3,  4,  3,  1,  2,  3,  6,  7, 0, 1, 4, 5, 6, 4, 3, 4, 3];
var Yx=[-3, -2, -1, 0, 0, 0, 0, 1, 2, 3];
var Yy=[ 5,  4,  4, 0, 1, 2, 3, 3, 3, 3];
var Zx=[-4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2, 3];
var Zy=[ 4,  4,  5,  4,  6,  4,  7, 0, 3, 1, 3, 2, 3, 3];
var n0x=[-3,-3,-3,-3,-2,-2,-1,-1, 0, 0, 1, 1, 2, 2, 2, 2,-3,-1,-1, 0, 1, 2, 3]; // straight
var n0y=[ 3, 4, 2, 5, 1, 6, 0, 7, 0, 7, 1, 6, 2, 5, 3, 4, 7, 5, 4, 3, 2, 1, 0]; // straight
var n1x=[-3,-2, -1,-1,-1,-1,-1,-1,-1,-1, 0, 1,-2,-3]; // straight
var n1y=[ 7, 7,  7, 6, 5, 4, 3, 2, 1, 0, 7, 7, 1, 2]; // straight
var n2x=[-3,-2,-1, 0, 1, 2, 2, 1, 0,-1,-2,-3,-2,-1, 0, 1, 2]; // straight
var n2y=[ 1, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 7, 7]; // straight
var n3x=[-3,-2,-1, 0, 1, 2, 2, 1, 0,-1, 0, 1, 2, 2, 1, 0,-1,-2,-3]; // straight
var n3y=[ 1, 0, 0, 0, 0, 1, 2, 3, 3, 3, 3, 3, 4, 5, 6, 6, 6, 6, 5]; // straight
var n4x=[ 1, 1, 1, 1, 1, 1, 1, 1, 0,-1,-2,-3,-3,-2,-1, 0, 2, 3]; // straight
var n4y=[ 7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 5, 5, 5, 5, 5]; // straight
var n5x=[-3,-2,-1, 0, 1, 2,-3,-3,-3,-2,-1, 0, 1, 2, 2, 2,-3,-2,-1, 0, 1, 2]; // 7 segment
var n5y=[ 1, 1, 1, 1, 1, 1, 2, 3, 4, 4, 4, 4, 4, 4, 5, 6, 7, 7, 7, 7, 7, 7]; // 7 segment
var n6x=[-3,-2,-1, 0, 1, 2,-3,-3,-3,-2,-1, 0, 1, 2, 2, 2,-3,-2,-1, 0, 1, 2,-3,-3]; // 7 segment
var n6y=[ 1, 1, 1, 1, 1, 1, 2, 3, 4, 4, 4, 4, 4, 4, 5, 6, 7, 7, 7, 7, 7, 7, 5, 6]; // 7 segment
var n7x=[-3, -2, -1, 0, 0, 1, 1, 2];
var n7y=[ 5,  4,  3, 0, 3, 1, 3, 2];
var n8x=[-3,-2,-1, 0, 1, 2,-3,-3,-3,-2,-1, 0, 1, 2, 2, 2,-3,-2,-1, 0, 1, 2,-3,-3, 2, 2]; // 7 segment
var n8y=[ 1, 1, 1, 1, 1, 1, 2, 3, 4, 4, 4, 4, 4, 4, 5, 6, 7, 7, 7, 7, 7, 7, 5, 6, 2, 3]; // 7 segment
var n9x=[-3,-2,-1, 0, 1, 2,-3,-3,-3,-2,-1, 0, 1, 2, 2, 2,-3,-2,-1, 0, 1, 2, 2, 2]; // 7 segment
var n9y=[ 1, 1, 1, 1, 1, 1, 2, 3, 4, 4, 4, 4, 4, 4, 5, 6, 7, 7, 7, 7, 7, 7, 2, 3]; // 7 segment
}
var addSymbol=function(symbolX, symbolY, colCount, rowCount, color){
    typingPos=[padding+(colCount)*10, padding+(rowCount*12)];
    var background = [ // 10x10
        [0, 0, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, ],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    var xOffset = 4;
    var yOffset = 1;
    for(var i=0; i<symbolX.length; i++){
        background[symbolX[i]+xOffset][symbolY[i]+yOffset] = 1;
    }
    
    for (var i=0; i<background.length; i++) {
        for (var i2=0; i2<background[0].length; i2++) {
            if (background[i][i2] === 1) {
                MessageX.push(i+typingPos[0]);
                MessageY.push(i2+typingPos[1]);
                MessageColor.push(color);
            } else {
                BackgroundX.push(i+typingPos[0]);
                BackgroundY.push(i2+typingPos[1]);
                BackgroundColor.push(color+3);
            }
        }
    }
    // for(var i=0; i<symbolX.length; i++){
    //     MessageX.push(symbolX[i]+typingPos[0]);
    //     MessageY.push(symbolY[i]+typingPos[1]);
    // }
};

//Message construtcion
var addMessage=function(msg, col, color) {
    for(var i=0; i<msg.length; i++){
        switch(msg[i]){
            case "A":
                addSymbol(Ax,Ay,i,col,color);
                break;
            case "B":
                addSymbol(Bx,By,i,col,color);
                break;
            case "C":
                addSymbol(Cx,Cy,i,col,color);
                break;
            case "D":
                addSymbol(Dx,Dy,i,col,color);
                break;
            case "E":
                addSymbol(Ex,Ey,i,col,color);
                break;
            case "F":
                addSymbol(Fx,Fy,i,col,color);
                break;
            case "G":
                addSymbol(Gx,Gy,i,col,color);
                break;
            case "H":
                addSymbol(Hx,Hy,i,col,color);
                break;
            case "I":
                addSymbol(Ix,Iy,i,col,color);
                break;
            case "J":
                addSymbol(Jx,Jy,i,col,color);
                break;
            case "K":
                addSymbol(Kx,Ky,i,col,color);
                break;
            case "L":
                addSymbol(Lx,Ly,i,col,color);
                break;
            case "M":
                addSymbol(Mx,My,i,col,color);
                break;
            case "N":
                addSymbol(Nx,Ny,i,col,color);
                break;
            case "O":
                addSymbol(Ox,Oy,i,col,color);
                break;
            case "P":
                addSymbol(Px,Py,i,col,color);
                break;
            case "Q":
                addSymbol(Qx,Qy,i,col,color);
                break;
            case "R":
                addSymbol(Rx,Ry,i,col,color);
                break;
            case "S":
                addSymbol(Sx,Sy,i,col,color);
                break;
            case "T":
                addSymbol(Tx,Ty,i,col,color);
                break;
            case "U":
                addSymbol(Ux,Uy,i,col,color);
                break;
            case "V":
                addSymbol(Vx,Vy,i,col,color);
                break;
            case "W":
                addSymbol(Wx,Wy,i,col,color);
                break;
            case "X":
                addSymbol(Xx,Xy,i,col,color);
                break;
            case "Y":
                addSymbol(Yx,Yy,i,col,color);
                break;
            case "Z":
                addSymbol(Zx,Zy,i,col,color);
                break;
            case "0":
                addSymbol(n0x,n0y,i,col,color);
                break;
            case "1":
                addSymbol(n1x,n1y,i,col,color);
                break;
            case "2":
                addSymbol(n2x,n2y,i,col,color);
                break;
            case "3":
                addSymbol(n3x,n3y,i,col,color);
                break;
            case "4":
                addSymbol(n4x,n4y,i,col,color);
                break;
            case "5":
                addSymbol(n5x,n5y,i,col,color);
                break;
            case "6":
                addSymbol(n6x,n6y,i,col,color);
                break;
            case "7":
                addSymbol(n7x,n7y,i,col,color);
                break;
            case "8":
                addSymbol(n8x,n8y,i,col,color);
                break;
            case "9":
                addSymbol(n9x,n9y,i,col,color);
                break;
            default:
                break;
    }
}
};

addMessage(r0, 0, 1);
addMessage(r1, 1, 2);
addMessage(r2, 2, 3);

//Message typing - check if coordinate exists
var hledej=function(pozX, pozY){
    for(var k=0; k<MessageX.length; k++){
        if(MessageX[k]===pozX && MessageY[k]===pozY){
            return MessageColor[k];
        }
    }
    for(var k=0; k<BackgroundX.length; k++){
        if (BackgroundX[k]===pozX && BackgroundY[k]===pozY){
            return BackgroundColor[k];
        }
    }
    return 0;
};
var selectGreen=function(){
    odstin=random()*255;
    while(odstin<greenLow || odstin>greenTop){
        odstin=random()*255;
    }
    satur=random()*8;
    if(satur>1) {satur=255;}
    satur = 255;
};
var selectNotGreen=function(){
    odstin=random()*255;
    satur=255;
    while(!(odstin<greenLow || odstin>greenTop)){
        odstin=random()*255;
    }
};
var selectBlue=function(){
    odstin=random()*255;
    while(odstin<blueLow || odstin>blueTop){
        odstin=random()*255;
    }
    satur=random()*8;
    if(satur>1) {satur=255;}
};
var selectNotBlue=function(){
    odstin=random()*255;
    satur=255;
    while(!(odstin<blueLow || odstin>blueTop)){
        odstin=random()*255;
    }
};
var selectRed=function(){
    odstin=random()*255;
    while(odstin>redTop && odstin<purpleLow){
        odstin=random()*255;
    }
    satur=random()*8;
    if(satur>1) {satur=255;}
};
var selectNotRed=function(){
    odstin=random()*255;
    while(!(odstin>redTop && odstin<purpleLow)){
        odstin=random()*255;
    }
};
var selectNeutral=function(){
    odstin=random()*255;
    satur = 255;
};

var selectColor = function(assignedColor) {
    switch (assignedColor) {
        case 1:
            selectNotRed(); // message
            break;
        case 2:
            selectNotBlue();
            break;
        case 3:
            selectNotGreen();
            break;
        case 4:
            selectRed();
            break;
        case 5:
            selectBlue();
            break;
        case 6:
            selectGreen();
            break;
        default:
            selectNeutral();
            break;
    }
};

var pom=0;
for(var i=0; i<width/pixel; i++){
    for(var j=0; j<width/pixel; j++){
        odstin=random()*255;
        satur=255;
        pom=random()*100;
        var assignedColor = hledej(i,j);
        if(assignedColor > 0){
            if (pom>difficulty){
                selectColor(assignedColor); // message
            } else {
                selectColor(assignedColor); // background
            }
        } else if((abs(i-j)<7 && abs(i*pixel+j*pixel-width)<(width-1.9*pixel*(padding)))|| odstin<155) { 
            if (pom>difficulty){
                selectColor(assignedColor); // background
            } else {
                selectColor(assignedColor); // message
            }
        } else{
            if(pom<50) {
                selectColor(assignedColor); // message
            } else {
                selectColor(assignedColor); // background
            }
        }
        fill(odstin,satur,255);
        rect(pixel*i,pixel*j,pixel,pixel);
    }
}
