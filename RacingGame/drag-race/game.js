// Ensure menu is visible even if something hid it earlier
window.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('menu');
  menu.style.display = 'flex';
  menu.style.zIndex = 9999;
});

let selectedTrack = 'track';
let selectedCar = 'car';
let phaserGame;
let gameStartedFlag = false;
let sceneRef = null;

function getFinishDistance() {
  if (selectedTrack === 'track') return 1000;
  if (selectedTrack === 'track2') return 1800;
  if (selectedTrack === 'track3') return 2600;
  return 1400;
}

class DragRace extends Phaser.Scene {
  constructor() { super('DragRace'); this.finished = false; }

  preload() {
    this.load.image('track', `images/${selectedTrack}.png`);
    this.load.image('car',   `images/${selectedCar}.png`);
    const opp = selectedCar === 'car' ? 'car2' : 'car';
    this.load.image('car2',  `images/${opp}.png`);
  }

  create() {
    const finishDistance = getFinishDistance();
    this.physics.world.setBounds(0, 0, this.scale.width, finishDistance);
    this.add.tileSprite(0, 0, this.scale.width, finishDistance, 'track')
      .setOrigin(0, 0).setScrollFactor(1);
    this.car = this.physics.add.sprite(this.scale.width / 2 - 100, finishDistance - 100, 'car')
      .setScale(0.25).setCollideWorldBounds(true);
    this.opponent = this.physics.add.sprite(this.scale.width / 2 + 100, finishDistance - 100, 'car2')
      .setScale(0.25).setCollideWorldBounds(true);
    this.cameras.main.startFollow(this.car);
    this.cameras.main.setBounds(0, 0, this.scale.width, finishDistance);
    this.keys = this.input.keyboard.addKeys('W');
    this.finishLine = this.add.zone(this.scale.width / 2, 100, this.scale.width, 20);
    this.physics.world.enable(this.finishLine);
    this.finishLine.body.setAllowGravity(false);
    this.finishLine.body.moves = false;
    this.physics.add.overlap(this.car, this.finishLine, this.playerWins, null, this);
    this.physics.add.overlap(this.opponent, this.finishLine, this.opponentWins, null, this);
    sceneRef = this;
  }

  update() {
    if (this.finished || !gameStartedFlag) return;
    const maxSpeed = 700 / 3.6;
    const acc = 200;
    if (this.keys.W.isDown) {
      if (this.car.body.velocity.y > -maxSpeed) this.car.setAccelerationY(-acc);
      else this.car.setAccelerationY(0);
    } else {
      this.car.setAccelerationY(0);
      this.car.setDragY(300);
    }
    if (this.opponent.body.velocity.y > -maxSpeed * 0.9) {
      this.opponent.setAccelerationY(-150);
    } else {
      this.opponent.setAccelerationY(0);
    }
    const speedKmh = Math.round(Math.abs(this.car.body.velocity.y) * 3.6);
    document.getElementById('speedometer').textContent = `Speed: ${speedKmh} km/h`;
  }

  playerWins() {
    if (!this.finished) {
      this.finished = true;
      alert('🏁 You Win!');
      gameStartedFlag = false;
    }
  }
  opponentWins() {
    if (!this.finished) {
      this.finished = true;
      alert('💥 Opponent Wins!');
      gameStartedFlag = false;
    }
  }
}

function startGame() {
  if (phaserGame) { phaserGame.destroy(true); }
  const root = document.getElementById('phaser-root');
  root.innerHTML = '';
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { willReadFrequently: true });
  root.appendChild(canvas);
  phaserGame = new Phaser.Game({
    type: Phaser.CANVAS,
    canvas, context,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#111',
    parent: 'phaser-root',
    physics: { default: 'arcade', arcade: { gravity: { y: 0 }, debug: false } },
    scene: DragRace,
    scale: { mode: Phaser.Scale.RESIZE, autoCenter: Phaser.Scale.CENTER_BOTH }
  });
}

document.querySelectorAll('#track-choices img').forEach(img => {
  img.addEventListener('click', () => {
    document.querySelectorAll('#track-choices img').forEach(i => i.classList.remove('selected'));
    img.classList.add('selected'); selectedTrack = img.dataset.value;
  });
});
document.querySelectorAll('#car-choices img').forEach(img => {
  img.addEventListener('click', () => {
    document.querySelectorAll('#car-choices img').forEach(i => i.classList.remove('selected'));
    img.classList.add('selected'); selectedCar = img.dataset.value;
  });
});
document.getElementById('start-btn').addEventListener('click', () => {
  document.getElementById('menu').style.display = 'none';
  document.getElementById('phaser-root').style.display = 'block';
  document.getElementById('hud').style.display = 'flex';
  startGame();
});
document.getElementById('back-btn').addEventListener('click', () => { location.reload(); });
document.getElementById('game-start-btn').addEventListener('click', () => {
  gameStartedFlag = true;
  if (sceneRef) sceneRef.car.setAccelerationY(0);
});
document.getElementById('restart-btn').addEventListener('click', () => {
  gameStartedFlag = false;
  startGame();
  document.getElementById('speedometer').textContent = 'Speed: 0 km/h';
});
window.addEventListener('resize', () => {
  if (!phaserGame) return;
  phaserGame.scale.resize(window.innerWidth, window.innerHeight);
});
