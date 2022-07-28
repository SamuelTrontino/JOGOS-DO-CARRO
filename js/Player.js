class Player {
  constructor() {
    this.name = null
    this.index = null
    this.positionX = 0
    this.positionY = 0
    this.score = 0
    this.ranking = 0
  }
  getCount(){
    var bancocount = database.ref("playerCount")
    bancocount.on("value",data=>{
      playerCount = data.val()
    })
  }
  updateCount(contar){
    database.ref("/").update({
      playerCount:contar
    })



  }
  update(){
    var playerIndex="players/player"+this.index
    database.ref(playerIndex).update({
      positionX:this.positionX,
      positionY:this.positionY,
      ranking:this.ranking,
      score:this.score
    })

  }
  static getinfo(){
    var playerinfo = database.ref("players")
    playerinfo.on("value",data=>{
      allPlayers = data.val()
    })

  }
  addPlayer(){
    var playerIndex = "players/player"+this.index
    if(this.index===1){
      this.positionX = width/2-100

    }else{
      this.positionX = width/2+100

    }
    database.ref(playerIndex).set({
      name:this.name,
      positionX:this.positionX,
      positionY:this.positionY,
      ranking:this.ranking,
      score:this.score
    })
  }
  getdistance(){
    var playerdistance = database.ref("players/player"+this.index)
    playerdistance.on("value",data=>{
      var data = data.val()
      this.positionX=data.positionX
      this.positionY=data.positionY})
  }
}
