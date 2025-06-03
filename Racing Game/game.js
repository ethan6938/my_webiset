class PreloadScene extends Phaser.Scene {
    constructor() {
      super('PreloadScene');
    }
    preload() {
      // Load car images - fallback to colored rectangles if images fail to load
      this.load.image('ferrari', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Ferrari_488_GTB_-_Geneva_Motor_Show_2015_-_003.jpg/240px-Ferrari_488_GTB_-_Geneva_Motor_Show_2015_-_003.jpg');
      this.load.image('lamborghini', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Lamborghini_Huracan_performante_front_20170610_01.jpg/240px-Lamborghini_Huracan_performante_front_20170610_01.jpg');
      this.load.image('porsche', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/2015_Porsche_911_Carrera_S_Genf_2015_IMG_0471.jpg/240px-2015_Porsche_911_Carrera_S_Genf_2015_IMG_0471.jpg');
      this.load.image('bugatti', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Bugatti_Chiron_IMG_0214.jpg/240px-Bugatti_Chiron_IMG_0214.jpg');
      this.load.image('tesla', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Tesla_Model_S_02_2013.jpg/240px-Tesla_Model_S_02_2013.jpg');
  
      // Track images (these are royalty free/safe)
      this.load.image('desert', 'https://cdn.pixabay.com/photo/2016/12/22/00/36/desert-1922331_1280.jpg');
      this.load.image('city', 'https://cdn.pixabay.com/photo/2016/11/29/02/09/buildings-1867765_1280.jpg');
      this.load.image('mountain', 'https://cdn.pixabay.com/photo/2016/11/29/05/03/mountains-1867577_1280.jpg');
  
      // Trophy image
      this.load.image('trophy', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Trophy_icon.svg/512px-Trophy_icon.svg.png');
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
      // Responsive dimensions
      this.W = this.scale.width;
      this.H = this.scale.height;
  
      // Data arrays
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
      this.bgBox = this.add.rectangle(this.W/2, this.H/2, this.W*0.9, this.H*0.9, 0x000000, 0.6).setStrokeStyle(3, 0xffffff);
  
      // Title
      this.add.text(this.W/2, this.H*0.07, '🏁 Ultimate Racing', { fontSize: Math.min(this.W/15, 48) + 'px', fill: '#ffd700', fontStyle: 'bold' }).setOrigin(0.5);
  
      // --- Car Selection ---
      this.add.text(this.W*0.12, this.H*0.15, 'Select Your Car:', { fontSize: Math.min(this.W/40, 24) + 'px', fill: '#ffffff', fontWeight: '600' });
      this.carTexts = [];
      this.carPreviews = [];
  
      this.cars.forEach((car, i) => {
        let y = this.H*0.20 + i * (this.H*0.10);
  
        // Car preview image
        let carImg = this.add.image(this.W*0.1, y + this.H*0.035, car.key).setScale(0.8).setOrigin(0, 0.5);
        this.carPreviews.push(carImg);
  
        // Car name + stats
        let txt = this.add.text(this.W*0.18, y, `${car.name}\nSpeed: ${car.speed} km/h\nHandling: ${car.handling}`, {
          fontSize: Math.min(this.W/55, 18) + 'px',
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
      this.add.text(this.W*0.7, this.H*0.15, 'Select Track:', { fontSize: Math.min(this.W/40, 24) + 'px', fill: '#ffffff', fontWeight: '600' });
      this.trackTexts = [];
      this.trackPreviews = [];
  
      this.tracks.forEach((track, i) => {
        let y = this.H*0.20 + i * (this.H*0.16);
  
        // Track preview image bigger
        let trackImg = this.add.image(this.W*0.72, y + this.H*0.06, track.key).setScale(0.65).setOrigin(0.5);
        this.trackPreviews.push(trackImg);
  
        let txt = this.add.text(this.W*0.67, y + this.H*0.12, track.name, {
          fontSize: Math.min(this.W/40, 22) + 'px',
          fill: i === this.selectedTrack ? '#ffd700' : '#a0ffa0',
          fontWeight: '600',
        }).setInteractive({ useHandCursor: true });
  
        txt.on('pointerover', () => txt.setStyle({ fill: '#ffff00' }));
        txt.on('pointerout', () => txt.setStyle({ fill: i === this.selectedTrack ? '#ffd700' : '#a0ffa0' }));
        txt.on('pointerdown', () => this.selectTrack(i));
  
        this.trackTexts.push(txt);
      });
  
      // --- Difficulty Selection ---
      this.add.text(this.W*0.12, this.H*0.77, 'Select Difficulty:', { fontSize: Math.min(this.W/40, 24) + 'px', fill: '#ffffff', fontWeight: '600' });
      this.difficultyTexts = [];
      this.difficulties.forEach((diff, i) => {
        let txt = this.add.text(this.W*0.15 + i * (this.W*0.15), this.H*0.83, diff, {
          fontSize: Math.min(this.W/40, 22) + 'px',
          fill: i === this.selectedDifficulty ? '#ffd700' : '#a0ffa0',
          fontWeight: '700',
          backgroundColor: i === this.selectedDifficulty ? '#222222' : 'transparent',
          padding: { x: 25, y: 10 },
          align: 'center',
          cursor: 'pointer',
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
      this.add.text(this.W*0.7, this.H*0.77, 'AI Opponents:', { fontSize: Math.min(this.W/40, 24) + 'px', fill: '#ffffff', fontWeight: '600' });
      this.playerCountText = this.add.text(this.W*0.82, this.H*0.83, this.selectedPlayerCount.toString(), {
        fontSize: Math.min(this.W/30, 28) + 'px',
        fill: '#00ff00',
        fontWeight: '700',
        backgroundColor: '#222222',
        padding: { x: 15, y: 12 },
        align: 'center',
        cursor: 'pointer',
        stroke: '#000',
        strokeThickness: 3,
      }).setInteractive({ useHandCursor: true });
  
      this.playerCountText.on('pointerdown', () => {
        this.selectedPlayerCount++;
        if (this.selectedPlayerCount > this.maxPlayers) this.selectedPlayerCount = 1;
        this.playerCountText.setText(this.selectedPlayerCount.toString());
      });
      this.playerCountText.on('pointerover', () => this.playerCountText.setStyle({ fill: '#ffff00', backgroundColor: '#333333' }));
      this.playerCountText.on('pointerout', () => this.playerCountText.setStyle({ fill: '#00ff00', backgroundColor: '#222222' }));
  
      // --- Start button ---
      this.startButton = this.add.text(this.W/2, this.H*0.92, 'Start Race!', {
        fontSize: Math.min(this.W/15, 48) + 'px',
        fill: '#00ff00',
        fontWeight: 'bold',
        backgroundColor: '#004400',
        padding: { x: 40, y: 20 },
        stroke: '#000',
        strokeThickness: 5,
        shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 4, stroke: true, fill: true },
        cursor: 'pointer'
      }).setOrigin(0.5);
  
      this.startButton.setInteractive({ useHandCursor: true });
      this.startButton.on('pointerover', () => this.startButton.setStyle({ fill: '#00ffcc', backgroundColor: '#006666' }));
      this.startButton.on('pointerout', () => this.startButton.setStyle({ fill: '#00ff00', backgroundColor: '#004400' }));
      this.startButton.on('pointerdown', () => {
        this.scene.start('RaceScene', {
          carIndex: this.selectedCar,
          trackIndex: this.selectedTrack,
          difficulty: this.selectedDifficulty,
          playerCount: this.selectedPlayerCount,
        });
      });
  
      // Selection helpers
      this.selectCar(this.selectedCar);
      this.selectTrack(this.selectedTrack);
      this.selectDifficulty(this.selectedDifficulty);
  
      // Resize handling (optional, you can expand for responsiveness)
      this.scale.on('resize', (gameSize) => {
        // For more advanced, reposition UI here.
      });
    }
  
    selectCar(i) {
      this.selectedCar = i;
      this.carTexts.forEach((txt, idx) => {
        txt.setFill(idx === i ? '#ffd700' : '#a0ffa0');
      });
    }
  
    selectTrack(i) {
      this.selectedTrack = i;
      this.trackTexts.forEach((txt, idx) => {
        txt.setFill(idx === i ? '#ffd700' : '#a0ffa0');
      });
    }
  
    selectDifficulty(i) {
      this.selectedDifficulty = i;
      this.difficultyTexts.forEach((txt, idx) => {
        txt.setFill(idx === i ? '#ffd700' : '#a0ffa0');
        txt.setBackgroundColor(idx === i ? '#222222' : 'transparent');
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
      this.W = this.scale.width;
      this.H = this.scale.height;
  
      // Background Track image full screen
      this.add.image(this.W/2, this.H/2, ['desert', 'city', 'mountain'][this.trackIndex]).setDisplaySize(this.W, this.H).setAlpha(0.8);
  
      // Overlay dark for contrast
      this.add.rectangle(this.W/2, this.H/2, this.W, this.H, 0x000000, 0.5);
  
      // Display selected car bigger in bottom-left
      this.playerCar = this.add.image(this.W*0.15, this.H*0.85, ['ferrari', 'lamborghini', 'porsche', 'bugatti', 'tesla'][this.carIndex]).setScale(1.3).setDepth(2);
  
      // Lap info
      this.lap = 1;
      this.totalLaps = 3;
  
      this.lapText = this.add.text(this.W*0.8, this.H*0.05, `Lap: ${this.lap} / ${this.totalLaps}`, {
        fontSize: Math.min(this.W/25, 36) + 'px',
        fill: '#ffff00',
        fontWeight: '700',
        stroke: '#000',
        strokeThickness: 5,
        shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 3, stroke: true, fill: true }
      }).setDepth(5);
  
      // Info panel top-left
      this.infoText = this.add.text(this.W*0.05, this.H*0.05,
        `Track: ${['Desert Rally', 'City Circuit', 'Mountain Pass'][this.trackIndex]}\n` +
        `Difficulty: ${['Easy', 'Medium', 'Hard'][this.difficulty]}\n` +
        `AI Opponents: ${this.playerCount}`,
        { fontSize: Math.min(this.W/60, 20) + 'px', fill: '#ffffff', lineSpacing: 8 }
      ).setDepth(5);
  
      // Controls hint bottom-center
      this.controlsText = this.add.text(this.W/2, this.H*0.95, 'Press SPACE to advance laps', {
        fontSize: Math.min(this.W/35, 22) + 'px',
        fill: '#fff',
        fontStyle: 'italic',
        stroke: '#000',
        strokeThickness: 3
      }).setOrigin(0.5).setDepth(5);
  
      // Space key advances laps
      this.input.keyboard.on('keydown-SPACE', () => {
        this.lap++;
        if (this.lap > this.totalLaps) {
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
      this.W = this.scale.width;
      this.H = this.scale.height;
  
      this.cameras.main.setBackgroundColor('#000000');
  
      this.add.text(this.W/2, this.H*0.2, '🏆 Race Winner! 🏆', {
        fontSize: Math.min(this.W/12, 64) + 'px',
        fill: '#ffd700',
        fontWeight: 'bold',
        stroke: '#000',
        strokeThickness: 8,
        shadow: { offsetX: 4, offsetY: 4, color: '#000', blur: 6 }
      }).setOrigin(0.5);
  
      // Trophy with bounce animation
      this.trophy = this.add.image(this.W/2, this.H/2 - 50, 'trophy').setScale(0.8);
      this.tweens.add({
        targets: this.trophy,
        y: this.H/2 - 90,
        duration: 800,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
  
      // Show winner car below trophy
      this.winnerCar = this.add.image(this.W/2, this.H/2 + 130, ['ferrari', 'lamborghini', 'porsche', 'bugatti', 'tesla'][this.carIndex]).setScale(1.4);
  
      // Restart text
      this.add.text(this.W/2, this.H*0.85, 'Press R to Restart', {
        fontSize: Math.min(this.W/25, 28) + 'px',
        fill: '#00ff00',
        fontWeight: 'bold',
        stroke: '#000',
        strokeThickness: 4,
        cursor: 'pointer'
      }).setOrigin(0.5);
  
      this.input.keyboard.on('keydown-R', () => {
        this.scene.start('MenuScene');
      });
    }
  }
  
  const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [PreloadScene, MenuScene, RaceScene, VictoryScene],
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    backgroundColor: '#000',
  };
  
  const game = new Phaser.Game(config);
  
  // Optional: handle window resize
  window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
  });
  