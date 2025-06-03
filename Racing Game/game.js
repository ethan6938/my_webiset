class PreloadScene extends Phaser.Scene {
    constructor() {
      super('PreloadScene');
    }
    preload() {
      // Load car images - Using placeholders or free assets
      this.load.image('ferrari', 'https://i.imgur.com/0Zf9XOR.png');
      this.load.image('lamborghini', 'https://i.imgur.com/WbMOfMl.png');
      this.load.image('porsche', 'https://i.imgur.com/O3uT5Mz.png');
      this.load.image('bugatti', 'https://i.imgur.com/QdMzi0L.png');
      this.load.image('tesla', 'https://i.imgur.com/bXRXdlx.png');
  
      // Load track images
      this.load.image('desert', 'https://i.imgur.com/fI6hQjG.jpg');
      this.load.image('city', 'https://i.imgur.com/yNDrLtC.jpg');
      this.load.image('mountain', 'https://i.imgur.com/jbZ8rAk.jpg');
  
      // Trophy image
      this.load.image('trophy', 'https://i.imgur.com/2iG3Bq0.png');
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
        { key: 'ferrari', name: 'Ferrari F8', speed: 320, handling: 300 },
        { key: 'lamborghini', name: 'Lamborghini Huracán', speed: 325, handling: 280 },
        { key: 'porsche', name: 'Porsche 911 GT3', speed: 310, handling: 320 },
        { key: 'bugatti', name: 'Bugatti Chiron', speed: 420, handling: 260 },
        { key: 'tesla', name: 'Tesla Model S Plaid', speed: 300, handling: 340 },
      ];
  
      this.tracks = [
        { key: 'desert', name: 'Desert Rally' },
        { key: 'city', name: 'City Circuit' },
        { key: 'mountain', name: 'Mountain Pass' },
      ];
  
      this.difficulties = ['Easy', 'Medium', 'Hard'];
      this.maxPlayers = 5;
  
      this.selectedCar = 0;
      this.selectedTrack = 0;
      this.selectedDifficulty = 1; // Medium default
      this.selectedPlayerCount = 3; // 3 AI opponents default
  
      // Background overlay box
      this.add.rectangle(400, 300, 780, 580, 0x000000, 0.6).setStrokeStyle(2, 0xffffff);
  
      // Title
      this.add.text(400, 40, '🏁 Ultimate Racing', { fontSize: '42px', fill: '#ffd700', fontStyle: 'bold' }).setOrigin(0.5);
  
      // --- Car Selection ---
      this.add.text(100, 100, 'Select Your Car:', { fontSize: '24px', fill: '#ffffff', fontWeight: '600' });
      this.carTexts = [];
      this.carPreviews = [];
  
      this.cars.forEach((car, i) => {
        let y = 140 + i * 80;
  
        // Car preview image
        let carImg = this.add.image(80, y + 20, car.key).setScale(0.6).setOrigin(0, 0.5);
        this.carPreviews.push(carImg);
  
        // Car name + stats
        let txt = this.add.text(160, y, `${car.name}\nSpeed: ${car.speed} km/h\nHandling: ${car.handling}`, {
          fontSize: '18px',
          fill: i === this.selectedCar ? '#ffd700' : '#a0ffa0',
          fontStyle: 'italic',
          lineSpacing: 6,
        }).setInteractive({ useHandCursor: true });
  
        txt.on('pointerover', () => txt.setStyle({ fill: '#ffff00' }));
        txt.on('pointerout', () => txt.setStyle({ fill: i === this.selectedCar ? '#ffd700' : '#a0ffa0' }));
        txt.on('pointerdown', () => this.selectCar(i));
  
        this.carTexts.push(txt);
      });
  
      // --- Track Selection ---
      this.add.text(520, 100, 'Select Track:', { fontSize: '24px', fill: '#ffffff', fontWeight: '600' });
      this.trackTexts = [];
      this.trackPreviews = [];
  
      this.tracks.forEach((track, i) => {
        let y = 140 + i * 130;
  
        // Track preview image bigger
        let trackImg = this.add.image(600, y + 40, track.key).setScale(0.45).setOrigin(0.5);
        this.trackPreviews.push(trackImg);
  
        let txt = this.add.text(530, y + 100, track.name, {
          fontSize: '22px',
          fill: i === this.selectedTrack ? '#ffd700' : '#a0ffa0',
          fontWeight: '600',
        }).setInteractive({ useHandCursor: true });
  
        txt.on('pointerover', () => txt.setStyle({ fill: '#ffff00' }));
        txt.on('pointerout', () => txt.setStyle({ fill: i === this.selectedTrack ? '#ffd700' : '#a0ffa0' }));
        txt.on('pointerdown', () => this.selectTrack(i));
  
        this.trackTexts.push(txt);
      });
  
      // --- Difficulty Selection ---
      this.add.text(100, 560, 'Select Difficulty:', { fontSize: '24px', fill: '#ffffff', fontWeight: '600' });
      this.difficultyTexts = [];
      this.difficulties.forEach((diff, i) => {
        let txt = this.add.text(130 + i * 140, 600, diff, {
          fontSize: '22px',
          fill: i === this.selectedDifficulty ? '#ffd700' : '#a0ffa0',
          fontWeight: '700',
          backgroundColor: i === this.selectedDifficulty ? '#222222' : 'transparent',
          padding: { x: 20, y: 10 },
          align: 'center',
        }).setInteractive({ useHandCursor: true });
  
        txt.on('pointerover', () => txt.setStyle({ fill: '#ffff00', backgroundColor: '#333333' }));
        txt.on('pointerout', () => txt.setStyle({
          fill: i === this.selectedDifficulty ? '#ffd700' : '#a0ffa0',
          backgroundColor: i === this.selectedDifficulty ? '#222222' : 'transparent'
        }));
        txt.on('pointerdown', () => this.selectDifficulty(i));
  
        this.difficultyTexts.push(txt);
      });
  
      // --- Number of AI Players ---
      this.add.text(520, 560, 'AI Opponents:', { fontSize: '24px', fill: '#ffffff', fontWeight: '600' });
      this.playerCountText = this.add.text(680, 600, this.selectedPlayerCount.toString(), {
        fontSize: '28px',
        fill: '#00ff00',
        fontWeight: '700',
        backgroundColor: '#222222',
        padding: { x: 30, y: 10 },
        align: 'center',
        cursor: 'pointer',
      }).setInteractive({ useHandCursor: true });
  
      this.playerCountText.on('pointerdown', () => {
        this.selectedPlayerCount++;
        if (this.selectedPlayerCount > this.maxPlayers) this.selectedPlayerCount = 1;
        this.playerCountText.setText(this.selectedPlayerCount.toString());
      });
  
      this.playerCountText.on('pointerover', () => this.playerCountText.setStyle({ fill: '#a0ff00' }));
      this.playerCountText.on('pointerout', () => this.playerCountText.setStyle({ fill: '#00ff00' }));
  
      // --- Start Button ---
      this.startText = this.add.text(400, 670, 'START RACE', {
        fontSize: '40px',
        fill: '#ffd700',
        fontWeight: 'bold',
        backgroundColor: '#111111',
        padding: { x: 40, y: 20 },
        align: 'center',
        stroke: '#000000',
        strokeThickness: 6,
        shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 5, stroke: true, fill: true }
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });
  
      this.startText.on('pointerover', () => this.startText.setStyle({ fill: '#ffff00' }));
      this.startText.on('pointerout', () => this.startText.setStyle({ fill: '#ffd700' }));
  
      this.startText.on('pointerdown', () => {
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
      this.carTexts.forEach((txt, i) => {
        txt.setFill(i === index ? '#ffd700' : '#a0ffa0');
      });
    }
  
    selectTrack(index) {
      this.selectedTrack = index;
      this.trackTexts.forEach((txt, i) => {
        txt.setFill(i === index ? '#ffd700' : '#a0ffa0');
      });
    }
  
    selectDifficulty(index) {
      this.selectedDifficulty = index;
      this.difficultyTexts.forEach((txt, i) => {
        if(i === index) {
          txt.setFill('#ffd700');
          txt.setBackgroundColor('#222222');
        } else {
          txt.setFill('#a0ffa0');
          txt.setBackgroundColor('transparent');
        }
      });
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
      // Background track image fullscreen with dark overlay
      this.add.image(400, 300, ['desert','city','mountain'][this.trackIndex]).setDisplaySize(800, 600);
  
      const overlay = this.add.rectangle(400, 300, 800, 600, 0x000000, 0.35);
  
      // Display player's car bigger in bottom-left
      this.playerCar = this.add.image(120, 520, ['ferrari','lamborghini','porsche','bugatti','tesla'][this.carIndex]).setScale(1.2);
  
      // Lap & info text
      this.lap = 1;
      this.totalLaps = 3;
      this.lapText = this.add.text(650, 40, `Lap: ${this.lap} / ${this.totalLaps}`, {
        fontSize: '28px',
        fill: '#ffff00',
        fontWeight: '700',
        stroke: '#000',
        strokeThickness: 4,
        shadow: { offsetX: 1, offsetY: 1, color: '#000', blur: 2, stroke: true, fill: true }
      });
  
      this.infoText = this.add.text(20, 20,
        `Track: ${['Desert Rally', 'City Circuit', 'Mountain Pass'][this.trackIndex]}\n` +
        `Difficulty: ${['Easy', 'Medium', 'Hard'][this.difficulty]}\n` +
        `AI Opponents: ${this.playerCount}`,
        { fontSize: '18px', fill: '#ffffff', lineSpacing: 5 }
      );
  
      // Controls hint
      this.controlsText = this.add.text(400, 570, 'Press SPACE to advance laps', {
        fontSize: '22px', fill: '#fff', fontStyle: 'italic'
      }).setOrigin(0.5);
  
      // Advance lap on space
      this.input.keyboard.on('keydown-SPACE', () => {
        this.lap++;
        if(this.lap > this.totalLaps) {
          this.scene.start('VictoryScene', { carIndex: this.carIndex });
        } else {
          this.lapText.setText(`Lap: ${this.lap} / ${this.totalLaps}`);
        }
      });
    }
  }
  
  class VictoryScene extends Phaser.Scene {
    constructor() {
      super('VictoryScene');
    }
    init(data) {
      this.carIndex = data.carIndex;
    }
    create() {
      this.cameras.main.setBackgroundColor('#000000');
  
      this.add.text(400, 150, '🏆 Race Winner! 🏆', {
        fontSize: '48px',
        fill: '#ffd700',
        fontWeight: 'bold',
        stroke: '#000',
        strokeThickness: 6
      }).setOrigin(0.5);
  
      // Trophy with animation
      this.trophy = this.add.image(400, 350, 'trophy').setScale(0.7);
      this.tweens.add({
        targets: this.trophy,
        y: 310,
        duration: 800,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
  
      // Show winner car below trophy
      this.winnerCar = this.add.image(400, 480, ['ferrari','lamborghini','porsche','bugatti','tesla'][this.carIndex]).setScale(1.2);
  
      this.add.text(400, 540, 'Press R to Restart', {
        fontSize: '24px',
        fill: '#00ff00',
        fontStyle: 'bold',
        stroke: '#000',
        strokeThickness: 3,
      }).setOrigin(0.5);
  
      // Restart game on R
      this.input.keyboard.on('keydown-R', () => {
        this.scene.start('MenuScene');
      });
    }
  }
  
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: [PreloadScene, MenuScene, RaceScene, VictoryScene],
    backgroundColor: '#000000',
  };
  
  const game = new Phaser.Game(config);
  