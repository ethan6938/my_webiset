import Phaser from "phaser";
export default class DragRaceScene extends Phaser.Scene{
  constructor(opts){super("DragRace");this.opts=opts;this.finished=false;}
  preload(){
    const{selectedTrack,selectedCar}=this.opts;
    this.load.image("track", `/images/${selectedTrack}.png`);
    this.load.image("car", `/images/${selectedCar}.png`);
    const opp=selectedCar==="car"?"car2":"car";this.load.image("car2", `/images/${opp}.png`);
  }
  create(){
    const{finishDistance}=this.opts;
    this.physics.world.setBounds(0,0,this.scale.width,finishDistance);
    this.add.tileSprite(0,0,this.scale.width,finishDistance,"track").setOrigin(0,0).setScrollFactor(1);
    this.car=this.physics.add.sprite(this.scale.width/2-100,finishDistance-100,"car").setScale(0.25).setCollideWorldBounds(true);
    this.opponent=this.physics.add.sprite(this.scale.width/2+100,finishDistance-100,"car2").setScale(0.25).setCollideWorldBounds(true);
    this.cameras.main.startFollow(this.car);this.cameras.main.setBounds(0,0,this.scale.width,finishDistance);
    this.keys=this.input.keyboard.addKeys("W");
    this.finishLine=this.add.zone(this.scale.width/2,100,this.scale.width,20);this.physics.world.enable(this.finishLine);
    this.finishLine.body.setAllowGravity(false);this.finishLine.body.moves=false;
    this.physics.add.overlap(this.car,this.finishLine,this.playerWins,undefined,this);
    this.physics.add.overlap(this.opponent,this.finishLine,this.opponentWins,undefined,this);
    this.game.registry.set("gameStartedFlag",false);
    this.game.events.on("start-game",()=>{this.game.registry.set("gameStartedFlag",true);this.car.setAccelerationY(0);});
    this.game.events.on("restart-game",()=>{this.scene.restart();this.game.registry.set("gameStartedFlag",false);});
  }
  update(){
    if(this.finished)return;const max=700/3.6, acc=200;
    if(this.game.registry.get("gameStartedFlag")){
      if(this.keys.W.isDown){ if(this.car.body.velocity.y>-max){this.car.setAccelerationY(-acc);} else {this.car.setAccelerationY(0);} }
      else {this.car.setAccelerationY(0);this.car.setDragY(300);}
      if(this.opponent.body.velocity.y>-max*0.9){this.opponent.setAccelerationY(-150);} else {this.opponent.setAccelerationY(0);}
      const kmh=Math.round(Math.abs(this.car.body.velocity.y)*3.6); this.opts.onSpeed?.(kmh);
    }
  }
  playerWins=()=>{if(!this.finished){this.finished=true;alert("🏁 You Win!");this.game.registry.set("gameStartedFlag",false);}};
  opponentWins=()=>{if(!this.finished){this.finished=true;alert("💥 Opponent Wins!");this.game.registry.set("gameStartedFlag",false);}};
}
