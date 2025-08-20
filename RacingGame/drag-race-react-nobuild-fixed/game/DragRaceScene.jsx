window.DR = window.DR || {}; window.DR.game = window.DR.game || {};

window.DR.game.DragRaceScene = class DragRaceScene extends window.Phaser.Scene {
  constructor(opts) {
    super('DragRace');
    this.opts = opts; // { selectedTrack, selectedCar, finishDistance, onSpeed }
    this.finished = false;
  }

  preload() {
    const { selectedTrack, selectedCar } = this.opts;
    this.load.image('track', `images/${selectedTrack}.png`);
    this.load.image('car',   `images/${selectedCar}.png`);
    const opponentAsset = selectedCar === 'car' ? 'car2' : 'car';
    this.load.image('car2',  `images/${opponentAsset}.png`);
  }

  create() {
    const { finishDistance } = this.opts;

    this.physics.world.setBounds(0, 0, this.scale.width, finishDistance);
    this.add.tileSprite(0, 0, this.scale.width, finishDistance, 'track')
      .setOrigin(0,0).setScrollFactor(1);

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

    this.physics.add.overlap(this.car, this.finishLine, this.playerWins, undefined, this);
    this.physics.add.overlap(this.opponent, this.finishLine, this.opponentWins, undefined, this);

    // ✅ Listen for React -> Phaser events
    this.onStartGame = () => {
      this.game.registry.set('gameStartedFlag', true);
      this.finished = false;
      this.car.setAccelerationY(0);
      this.opts.onSpeed?.(0);
    };

    this.onRestartGame = () => {
      // Stop race and reset HUD speed
      this.game.registry.set('gameStartedFlag', false);
      this.finished = false;
      this.opts.onSpeed?.(0);

      // Restart scene to reset positions/physics cleanly
      this.scene.restart();
    };

    this.game.events.on('start-game', this.onStartGame);
    this.game.events.on('restart-game', this.onRestartGame);

    // 🧹 Cleanup to avoid duplicate listeners after scene restarts/destroys
    this.events.once('shutdown', () => {
      this.game.events.off('start-game', this.onStartGame);
      this.game.events.off('restart-game', this.onRestartGame);
    });
    this.events.once('destroy', () => {
      this.game.events.off('start-game', this.onStartGame);
      this.game.events.off('restart-game', this.onRestartGame);
    });
  }

  update() {
    if (this.finished) return;
    const maxSpeed = 700 / 3.6;
    const acceleration = 200;

    if (this.game.registry.get('gameStartedFlag')) {
      if (this.keys.W.isDown) {
        if (this.car.body.velocity.y > -maxSpeed) this.car.setAccelerationY(-acceleration);
        else this.car.setAccelerationY(0);
      } else {
        this.car.setAccelerationY(0);
        this.car.setDragY(300);
      }

      if (this.opponent.body.velocity.y > -maxSpeed * 0.9) this.opponent.setAccelerationY(-150);
      else this.opponent.setAccelerationY(0);

      const speedKmh = Math.round(Math.abs(this.car.body.velocity.y) * 3.6);
      this.opts.onSpeed?.(speedKmh);
    }
  }

  playerWins = () => {
    if (!this.finished) {
      this.finished = true;
      alert('🏁 You Win!');
      this.game.registry.set('gameStartedFlag', false);
    }
  }

  opponentWins = () => {
    if (!this.finished) {
      this.finished = true;
      alert('💥 Opponent Wins!');
      this.game.registry.set('gameStartedFlag', false);
    }
  }
};
