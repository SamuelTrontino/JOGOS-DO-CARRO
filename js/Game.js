class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leadeboardTitle = createElement("h2");

    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
  }
  getState(){
    var bancogame = database.ref("gameState")
    bancogame.on("value",function(data){
      gameState = data.val()

    })
  }
  update(estado){
    database.ref("/").update({
      gameState:estado
    })
  }
  handleelements(){
    form.hide()
    form.titleImg.position(40,50)
    form.titleImg.class("gameTitleAfterEffect")
    this.resetTitle.html("Reinicar Jogo");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);

    this.leadeboardTitle.html("Placar");
    this.leadeboardTitle.class("resetText");
    this.leadeboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130);

  }
  botaoreset(){
    this.resetButton.mousePressed(()=>{
      database.ref("/").set({
        playerCount:0,
        gameState:0,
        players:{}
      })
      window.location.reload()
    })
  }
  showLeaderboard() {
    var leader1, leader2;
    //retorna matriz de valores enumeraveis dos objetos
    var players = Object.values(allPlayers);
    //verifica se o jogador 1 está no rank 1
    if ((players[0].rank === 0 && players[1].rank === 0)
        || players[0].rank === 1){
      // &emsp;    Essa etiqueta é usada para exibir quatro espaços.
      //exibe o texto na tela por ordem de jogador
      leader1 = players[0].rank +
                "&emsp;" + players[0].name +
                "&emsp;" + players[0].score;

      leader2 = players[1].rank +
                "&emsp;" + players[1].name +
                "&emsp;" + players[1].score;
    }

    //verifica se o jogador 2 está no rank 1
    if (players[1].rank === 1) {
      leader1 = players[1].rank +
                "&emsp;" + players[1].name +
                "&emsp;" + players[1].score;

      leader2 = players[0].rank +
                "&emsp;" + players[0].name +
                "&emsp;" + players[0].score;
    }

    //passar lideres como elementos html
    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }
  //carro branco não esta atualizando a camera
  play(){
    this.handleelements()
    this.botaoreset()
    Player.getinfo()
    if(allPlayers!==undefined){
      image(pista,0,-height*5,width,height*6)
      this.showLeaderboard()
      var index = 0 
      for(var jogadores in allPlayers){
        index+=1
        console.log("index1"+index)
        var x  = allPlayers	[jogadores].positionX
        var y  = height-allPlayers	[jogadores].positionY
        carros[index-1].position.x=x
        console.log("index2"+index)
        carros[index-1].position.y=y
        if(index===player.index){
          stroke("black")
          fill("green")
          ellipse(x,y,60,60)

        }
        camera.position.x=carros[index-1].position.x
        camera.position.y=carros[index-1].position.y
        console.log(camera.position.y)

      }
      this.controle()
      drawSprites()

    }

  }
  controle(){
    if(keyIsDown(UP_ARROW)){
      player.positionY+=10
      player.update()

    }
    if(keyIsDown(RIGHT_ARROW)&&player.positionX<width/2+300){
      player.positionX+=5
      player.update()

    }
    if(keyIsDown(LEFT_ARROW)&&player.positionX>width/3-50){
      player.positionX-=5
      player.update()
}

  }
  start() {
    form = new Form();
    form.display();
    player = new Player();
    playerCount = player.getCount()
    car1=createSprite(width/2-100,height-100)
    car2=createSprite(width/2+100,height-100)
    car1.addImage("carro1",car1img)
    car2.addImage("carro2",car2img)
    car1.scale = 0.08
    car2.scale = 0.08
    carros=[car1,car2]
    
  }

}
