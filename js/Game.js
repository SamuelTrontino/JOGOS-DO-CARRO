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
    if ((players[0].ranking === 0 && players[1].ranking === 0)
        || players[0].ranking === 1){
      // &emsp;    Essa etiqueta é usada para exibir quatro espaços.
      //exibe o texto na tela por ordem de jogador
      leader1 = players[0].ranking +
                "&emsp;" + players[0].name +
                "&emsp;" + players[0].score;

      leader2 = players[1].ranking +
                "&emsp;" + players[1].name +
                "&emsp;" + players[1].score;
    }

    //verifica se o jogador 2 está no rank 1
    if (players[1].ranking === 1) {
      leader1 = players[1].ranking +
                "&emsp;" + players[1].name +
                "&emsp;" + players[1].score;

      leader2 = players[0].ranking +
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

          this.handlecoins(index)
          this.handlefuel(index)
          
        camera.position.x=carros[index-1].position.x
        camera.position.y=carros[index-1].position.y
        
          }

      }
      this.controle()
      drawSprites()

    }


  }
  handlefuel(index){
    carros[index-1].overlap(gasolina,function(collector,collected){
      player.fuel = 185
      collected.remove
    })
  }
  handlecoins(index){
    carros[index-1].overlap(moeda,function(collector,collected){
      player.score+=10
      player.update
      collected.remove

    })}
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
  addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
    for (var i = 0; i < numberOfSprites; i++) {
      var x, y;

      //Se a matriz NÃO  estiver vazia
      // adicionar as posições da matriz à x e y
      if (positions.length > 0) {
        x = positions[i].x;
        y = positions[i].y;
        spriteImage = positions[i].image;

      } else {

        //aleatório para as metades da tela em x e y
      x = random(width / 2 + 150, width / 2 - 150);
      y = random(-height * 4.5, height - 400);

      }

      //criar sprite nas posições aleatórias
      var sprite = createSprite(x, y);
      sprite.addImage("sprite", spriteImage);

      sprite.scale = scale;
      spriteGroup.add(sprite);

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
    gasolina = new Group()
    moeda = new Group()
    obstaculos = new Group()

    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: pneuimg},
      { x: width / 2 - 150, y: height - 1300, image: coneimg },
      { x: width / 2 + 250, y: height - 1800, image: coneimg },
      { x: width / 2 - 180, y: height - 2300, image: pneuimg },
      { x: width / 2, y: height - 2800, image: pneuimg },
      { x: width / 2 - 180, y: height - 3300, image: coneimg },
      { x: width / 2 + 180, y: height - 3300, image: pneuimg },
      { x: width / 2 + 250, y: height - 3800, image: pneuimg },
      { x: width / 2 - 150, y: height - 4300, image: coneimg },
      { x: width / 2 + 250, y: height - 4800, image: pneuimg },
      { x: width / 2, y: height - 5300, image: coneimg },
      { x: width / 2 - 180, y: height - 5500, image: pneuimg }
    ];
    this.addSprites(moeda,10,moedaimg,0.05)
    this.addSprites(gasolina,3,gasolinaimg,0.03)
    this.addSprites(obstaculos,obstaclesPositions.length,pneuimg,0.03,obstaclesPositions)
  }

}
