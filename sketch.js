var ball;
var database;
var loc;
var position;
function setup(){
    createCanvas(500,500);
    database = firebase.database();
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    loc = database.ref("Ball/Position");
    loc.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref("Ball/Position").set({
        "x":position.x+x,
        "y":position.y+y,
    })

}

function readPosition(data)
{
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function showError()
{
    console.log("It's an error");
}