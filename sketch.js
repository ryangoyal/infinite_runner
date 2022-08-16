var ghost, tornado;
var goldCoin;
var endIcon;
var background1;
var ghostImg, tornadoImg, goldCoinImg, endIconImg, background1Img;

var tornadoG, coinsG;

var coins = 0;

var invGr;

var gameState = "PLAY";


function preload() {
    ghostImg = loadImage("Ghost.png");
    background1Img = loadImage("bg.jpg");
    goldCoinImg = loadImage("Gold coin.png");
    tornadoImg = loadImage("Tornado.png");
    endIconImg = loadImage("restart icon.png");

    tornadoG = new Group();
    coinsG = new Group();
}

function setup() {
    createCanvas(600, 600);
    background1 = createSprite(300, 300);
    background1.addImage(background1Img);
    background1.velocityX = -1;
    background1.scale = 0.8;

    ghost = createSprite(300, 510);
    ghost.addImage(ghostImg);
    ghost.scale = 0.2;
    ghost.setCollider('circle', 0, 0, 350)
    invGr = createSprite(300, 580, 600, 5);
    invGr.visible = false;
}


function draw() {

    background(0);

    drawSprites();
    textSize(20);
    fill(255);
    if (gameState == "PLAY") {


        text("COINS: " + coins, 300, 300);


        if (background1.x < 200) {
            background1.x = 300;
        }

        if (keyDown("space")) {
            ghost.y = ghost.y - 20
        }

        if(goldCoin.isTouching(ghost)){
            coins = coins + 1;
        }
        if (tornadoG.isTouching(ghost)) {
            ghost.destroy();
            background1.velocityX = 0;
            tornadoG.setVelocityXEach(0);
            coinsG.setVelocityXEach(0);
            gameState = "END";
        }

        ghost.collide(invGr);
        ghost.y = ghost.y + 15
        spawnTornado();
        spawnCoins();
        //drawSprites();
    }
    if (gameState == "END") {
        stroke("yellow");
        fill("yellow");
        textSize(30);
        text("GAME OVER", 230, 250)
    }
}

function spawnTornado() {
    if (frameCount % 240 == 0) {
        tornado = createSprite(0, 480);
        tornado.addImage(tornadoImg);
        tornado.scale = 0.2;
        //tornado.x = Math.round(random(120, 400));
        tornado.velocityX = Math.round(random(2, 4));
        tornado.lifetime = 800;
        tornado.setCollider('circle', 0, 0, 300)
        tornadoG.add(tornado);
    }


}

function spawnCoins() {
    if (frameCount % 220 == 0) {
        goldCoin = createSprite(600, Math.round(random(50, 400)));
        goldCoin.addImage(goldCoinImg);
        goldCoin.scale = 0.05;
        goldCoin.velocityX = -2
        goldCoin.lifetime = 800;
        coinsG.add(goldCoin);
    }


}