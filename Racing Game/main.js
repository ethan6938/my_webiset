class Example extends Phaser.Scene {
    preload() {
      this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
      this.load.image('track', 'assets/particles/racetrack-bend.png');
      this.load.image('car', 'assets/sprites/car-red.png');
    }
  
    create() {
      this.add.image(450, 300, 'track').setScale(0.8);
  
      // Add the player car sprite, set origin to center for rotation
      this.car = this.physics.add.sprite(450, 500, 'car').setScale(0.5);
      this.car.setOrigin(0.5, 0.5);
  
      // Enable keyboard cursors
      this.cursors = this.input.keyboard.createCursorKeys();
  
      // Set max speed and acceleration
      this.carSpeed = 0;
      this.maxSpeed = 200;
      this.acceleration = 300;
      this.drag = 150;  // slows down when no input
      this.turnSpeed = 150; // degrees per second
    }
  
    update(time, delta) {
      const dt = delta / 1000; // convert ms to seconds
  
      // Accelerate / decelerate car
      if (this.cursors.up.isDown) {
        this.carSpeed += this.acceleration * dt;
      } else if (this.cursors.down.isDown) {
        this.carSpeed -= this.acceleration * dt;
      } else {
        // Gradually slow down if no input
        if (this.carSpeed > 0) {
          this.carSpeed -= this.drag * dt;
          if (this.carSpeed < 0) this.carSpeed = 0;
        } else if (this.carSpeed < 0) {
          this.carSpeed += this.drag * dt;
          if (this.carSpeed > 0) this.carSpeed = 0;
        }
      }
  
      // Clamp speed
      this.carSpeed = Phaser.Math.Clamp(this.carSpeed, -this.maxSpeed / 2, this.maxSpeed);
  
      // Rotate car left/right if moving
      if (this.carSpeed !== 0) {
        if (this.cursors.left.isDown) {
          this.car.angle -= this.turnSpeed * dt * (this.carSpeed > 0 ? 1 : -1);
        }
        if (this.cursors.right.isDown) {
          this.car.angle += this.turnSpeed * dt * (this.carSpeed > 0 ? 1 : -1);
        }
      }
  
      // Move car forward based on speed and rotation
      this.physics.velocityFromAngle(this.car.angle - 90, this.carSpeed, this.car.body.velocity);
  
      // Keep car within canvas bounds (simple bounding box)
      this.car.x = Phaser.Math.Clamp(this.car.x, 50, 800 - 50);
      this.car.y = Phaser.Math.Clamp(this.car.y, 50, 600 - 50);
    }
  }
  
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#0c5e03',
    parent: 'phaser-example',
    physics: {
      default: 'arcade',
    },
    scene: Example,
  };
  
  const game = new Phaser.Game(config);
  