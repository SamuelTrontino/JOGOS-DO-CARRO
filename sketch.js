var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount,gameState,allPlayers;
var car1,car1img
var car2,car2img
var carros = []
var pista
var gasolina,gasolinaimg
var moeda,moedaimg
var obstaculos,coneimg,pneuimg

function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
  car1img = loadImage("assets/car1.png")
  car2img = loadImage("assets/car2.png")
  pista = loadImage("assets/PISTA.png")
  coneimg = loadImage("assets/obstacle1.png")
  pneuimg = loadImage("assets/obstacle2.png")
  moedaimg = loadImage("assets/goldCoin.png")
  gasolinaimg = loadImage("assets/fuel.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState()
  game.start();

}
//para começar o jogo
function draw() {
  background(backgroundImage);
  if(playerCount===2){
    game.update(1)

  }

  //começa o jogo
  if(gameState===1){
    game.play()

  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
