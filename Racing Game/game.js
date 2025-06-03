class PreloadScene extends Phaser.Scene {
    constructor() {
      super('PreloadScene');
    }
    preload() {
      // Load images (replace URLs or use your own assets)
      this.load.image('car1', 'https://i.imgur.com/0Zf9XOR.png'); // example car
      this.load.image('car2', 'https://i.imgur.com/WbMOfMl.png'); // example car
      this.load.image('track1', 'https://i.imgur.com/fI6hQjG.jpg'); // example track
      this.load.image('track2', 'https://i.imgur.com/yNDrLtC.jpg'); // example track
      this.load.image('trophy', 'https://i.imgur.com/2iG3Bq0.png'); // trophy
    }
    create() {
      this.scene.start('MenuScene');
    }
  }
  
  class MenuScene extends Phaser.Scene {
    constructor() {
      super('MenuScene');
    }
    create() {
      this.cars = [
        { key: 'car1', name: 'Speedster', speed: 200, handling: 150 },
        { key: 'car2', name: 'Thunderbolt', speed: 180, handling: 180 },
      ];
  
      this.tracks = [
        { key: 'track1', name: 'Desert Dash' },
        { key: 'track2', name: 'City Sprint' },
      ];
  
      this.difficulties = ['Easy', 'Medium', 'Hard'];
      this.maxPlayers = 5;
  
      this.selectedCar = 0;
      this.selectedTrack = 0;
      this.selectedDifficulty = 1; // Medium default
      this.selectedPlayerCount = 3; // 3 AI opponents default
  
      this.add.text(320, 30, 'RACING GAME', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
  
      // --- Car Selection ---
      this.add.text(50, 80, 'Select Your Car:', { fontSize: '20px', fill: '#fff' });
      this.carTexts = [];
      this.cars.forEach((car, i) => {
        let txt = this.add.text(60, 110 + i * 40, `${car.name} (Speed: ${car.speed}, Handling: ${car.handling})`, {
          fontSize: '18px',
          fill: i === this.selectedCar ? '#ff0' : '#0f0',
        }).setInteractive().on('pointerdown', () => {
          this.selectCar(i);
        });
        this.carTexts.push(txt);
  
        // Add car preview sprite next to text
        this.add.image(250, 120 + i * 40, car.key).setScale(0.5);
      });
  
      // --- Track Selection ---
      this.add.text(400, 80, 'Select Track:', { fontSize: '20px', fill: '#fff' });
      this.trackTexts = [];
      this.tracks.forEach((track, i) => {
        let txt = this.add.text(410, 110 + i * 40, track.name, {
          fontSize: '18px',
          fill: i === this.selectedTrack ? '#ff0' : '#0f0',
        }).setInteractive().on('pointerdown', () => {
          this.selectTrack(i);
        });
        this.trackTexts.push(txt);
  
        // Track preview image
        this.add.image(600, 120 + i * 40, track.key).setScale(0.3);
      });
  
      // --- Difficulty Selection ---
      this.add.text(50, 220, 'Select Difficulty:', { fontSize: '20px', fill: '#fff' });
      this.difficultyTexts = [];
      this.difficulties.forEach((diff, i) => {
        let txt = this.add.text(60, 250 + i * 30, diff, {
          fontSize: '18px',
          fill: i === this.selectedDifficulty ? '#ff0' : '#0f0',
        }).setInteractive().on('pointerdown', () => {
          this.selectDifficulty(i);
        });
        this.difficultyTexts.push(txt);
      });
  
      // --- Number of AI Players ---
      this.add.text(400, 220, 'Number of AI Opponents:', { fontSize: '20px', fill: '#fff' });
      this.playerCountText = this.add.text(410, 250, this.selectedPlayerCount.toString(), {
        fontSize: '18px',
        fill: '#0f0'
      }).setInteractive().on('pointerdown', () => {
        this.selectedPlayerCount++;
        if (this.selectedPlayerCount > this.maxPlayers) this.selectedPlayerCount = 1;
        this.playerCountText.setText(this.selectedPlayerCount.toString());
      });
  
      // --- Start Button ---
      this.startText = this.add.text(320, 550, 'START RACE', {
        fontSize: '28px',
        fill: '#ff0'
      }).setOrigin(0.5).setInteractive().on('pointerdown', () => {
        this.scene.start('RaceScene', {
          carIndex: this.selectedCar,
          trackIndex: this.selectedTrack,
          difficulty: this.selectedDifficulty,
          playerCount: this.selectedPlayerCount
        });
      });
    }
  
    selectCar(index) {
      this.selectedCar = index;
      this.carTexts.forEach((txt, i) => txt.setFill(i === index ? '#ff0' : '#0f0'));
    }
  
    selectTrack(index) {
      this.selectedTrack = index;
      this.trackTexts.forEach((txt, i) => txt.setFill(i === index ? '#ff0' : '#0f0'));
    }
  
    selectDifficulty(index) {
      this.selectedDifficulty = index;
      this.difficultyTexts.forEach((txt, i) => txt.setFill(i === index ? '#ff0' : '#0f0'));
    }
  }
  
  class RaceScene extends Phaser.Scene {
    constructor() {
      super('RaceScene');
    }
    init(data) {
      this.carIndex = data.carIndex;
      this.trackIndex = data.trackIndex;
      this.difficulty = data.difficulty;
      this.playerCount = data.playerCount;
    }
    create() {
      // Show basic info
      this.add.text(400, 20, 'Race Starting...', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
  
      // Display chosen track
      this.add.image(400, 300, ['track1','track2'][this.trackIndex]).setScale(0.7);
  
      // Display player car
      this.playerCar = this.add.sprite(400, 500, ['car1', 'car2'][this.carIndex]).setScale(0.7);
  
      this.lapsTotal = 3;
      this.currentLap = 1;
      this.lapText = this.add.text(10, 10, `Lap: ${this.currentLap} / ${this.lapsTotal}`, { fontSize: '18px', fill: '#fff' });
  
      // Placeholder for player controls (arrow keys)
      this.cursors = this.input.keyboard.createCursorKeys();
  
      // Placeholder AI cars count display
      this.add.text(600, 10, `AI Opponents: ${this.playerCount}`, { fontSize: '18px', fill: '#fff' });
  
      // Simple race timer and end condition (simulate lap completion)
      this.lapTimer = this.time.addEvent({
        delay: 5000, // 5 seconds per lap for demo
        callback: this.nextLap,
        callbackScope: this,
        loop: true,
      });
    }
  
    nextLap() {
      this.currentLap++;
      if (this.currentLap > this.lapsTotal) {
        this.lapTimer.remove();
        this.scene.start('VictoryScene', { winner: 'You' });
      } else {
        this.lapText.setText(`Lap: ${this.currentLap} / ${this.lapsTotal}`);
      }
    }
  
    update() {
      // Basic left/right movement
      if (this.cursors.left.isDown) {
        this.playerCar.x -= 5;
      } else if (this.cursors.right.isDown) {
        this.playerCar.x += 5;
      }
    }
  }
  
  class VictoryScene extends Phaser.Scene {
    constructor() {
      super('VictoryScene');
    }
    init(data) {
      this.winner = data.winner || 'Player';
    }
    create() {
      this.add.text(400, 200, `${this.winner} Wins!`, { fontSize: '48px', fill: '#ff0' }).setOrigin(0.5);
  
      // Show trophy image with simple tween scale animation
      const trophy = this.add.image(400, 350, 'trophy').setScale(0);
      this.tweens.add({
        targets: trophy,
        scale: 1,
        duration: 2000,
        ease: 'Bounce.easeOut'
      });
  
      // Restart instruction
      this.add.text(400, 500, 'Click anywhere to restart', { fontSize: '20px', fill: '#fff' }).setOrigin(0.5);
  
      this.input.once('pointerdown', () => {
        this.scene.start('MenuScene');
      });
    }
  }
  
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#222',
    parent: 'game-container',
    physics: {
      default: 'arcade',
      arcade: { debug: false }
    },
    scene: [PreloadScene, MenuScene, RaceScene, VictoryScene]
  };
  
  const game = new Phaser.Game(config);
  