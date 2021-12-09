class Game {
  constructor(){
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");
    this.leaderboardTitle = createElement("h2");
    this.leader1Title = createElement("h2");
    this.leader2Title = createElement("h2")
  }
 getState(){
  var gameStateRef = database.ref("gameState");
  gameStateRef.on("value",function(data){
    gameState = data.val();
  })
  }
  update(State){
    database.ref("/").update({
      gameState:State
    })
  }
  start() {
    player = new Player();
    playerCount = player.getCount();
    form = new Form();
    form.display();
    car1 = createSprite(width/2-50,height-100)
    car1.addImage("car1",car1_Img);
    car1.scale = 0.07;
    car2 = createSprite(width/2+100,height-100)
    car2.addImage("car2",car2_Img);
    car2.scale = 0.07;
    cars = [car1,car2];
  }
  handleElements(){
    form.hide();
    form.titleImg.position(40,50)
    form.titleImg.class("gameTitleAterEffect");

    this.resetTitle.html("RESET GAME");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width/2+200,40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width/2+230,100);

    this.leaderboardTitle.html("LEADER BOARD");
    this.leaderboardTitle.class("resetText");
    this.leaderboardTitle.position(width/3-60,40);

    this.leader1Title.class("leadersText");
    this.leader1Title.position(width/3-50,80);

    this.leader2Title.class("leadersText");
    this.leader2Title.position(width/3-50,80);
  }
  play(){
    this.handleElements();
    this.handleResetButton();

    Player.getPlayersInfo();

    if(allPlayers !== undefined){
      
      this.showLeaderBoard();

      image(track,0,-height*5,width,height*6);
      var index = 0;
          
      for(var plr in allPlayers){
       index = index+1;

       var x = allPlayers[plr].positionX;
       var y = height - allPlayers[plr].positionY;

       cars[index-1].position.x = x;
       cars[index-1].position.y = y;

        if(index == player.index){
         stroke(10);
         fill("red");
         ellipse(x,y,60,60);
        
         camera.position.y = cars[index-1].position.y;
        }
      }
      this.handlePlayerControls()
      drawSprites();
    }
  }

  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {}
      });
      window.location.reload();
    });
  }

  showLeaderBoard(){
    var leader1,leader2;
    var players = Object.values(allPlayers);
    if(
      (players[0].rank === 0 && players[1].rank  === 0) || players[0].rank === 1
    ){
      leader1 =
       players[0].rank +
       "&emsp;" + 
       players[0].name +
       "&emsp;" + 
       players[0].score ;

       leader2 =
       players[1].rank +
       "&emsp;" + 
       players[1].name +
       "&emsp;" + 
       players[1].score ;
    }
    if(players[1].rank == 1){
      leader1 =
       players[1].rank +
       "&emsp;" + 
       players[1].name +
       "&emsp;" + 
       players[1].score ;

       leader2 =
       players[0].rank +
       "&emsp;" + 
       players[0].name +
       "&emsp;" + 
       players[0].score ;
    }
    this.leader1Title.html(leader1);
    this.leader2Title.html(leader2);
  }
  handlePlayerControls(){
    if(keyIsDown(UP_ARROW)){
      player.positionY += 10;
      player.update();
    }
    if(keyIsDown(LEFT_ARROW) && player.positionX>width/3-50){
      player.positionX -= 5;
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW) && player.positionX>width/3+50){
      player.positionX += 5;
      player.update();
    }
  } 

}


