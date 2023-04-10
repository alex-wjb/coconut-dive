export class Player {
  constructor(game) {
    this.game = game;
    this.collisionX = this.game.width * 0.5;
    this.collisionY = this.game.height * 0.075;
    this.boundaryY = 100;
    this.x = this.game.width * 0.5;
    this.y = this.boundaryY;
    this.velocityX = 0;
    this.velocityY = 0;
    this.image = document.getElementById("coco1");

    this.boundaryXLeft = 150;
    this.boundaryXRight = this.game.width - 150;
    this.accelerationX = 0;
    this.accelerationY = 0;
    this.friction = 0.9;
    this.keyListener(); //needs to be before move obj declaration (Refactor)
    this.move = {
      up: false,
      down: false,
      left: false,
      right: false,
      floatUp: false,
    };

    this.movePlayer();
  }
  movePlayer() {
    //calculate final velocity
    this.velocityX += this.accelerationX;
    this.velocityY += this.accelerationY;

    //simulate friction, eventually slows velocity to 0 when no acceleration.
    this.velocityX *= this.friction;
    this.velocityY *= this.friction;

    //calculate new position
    this.x = this.x + this.velocityX;
    this.y = this.y + this.velocityY;

    //stop floating up past top of game
    if (this.y < this.boundaryY) {
      this.move.floatUp = false;
      this.accelerationY = 0;
      this.y = this.boundaryY;
      this.velocityY = 0;
    }
  }
  update() {
    this.movePlayer();

    if (this.move.down && this.y < this.game.height - this.boundaryY - 100) {
      this.move.floatUp = false;
      this.accelerationY = 1.5;
    } else {
      this.accelerationY = 0;
    }

    if (!this.move.down && this.y > this.boundaryY) {
      this.move.floatUp = true;
    }
    if (this.move.floatUp && !this.move.down) {
      this.accelerationY = -1.5;
    }

    //ORGINAL MOVEMENT
    if (this.move.left && this.x > this.boundaryXLeft) {
      this.accelerationX = -1.5;
    } else if (this.move.right && this.x < this.boundaryXRight) {
      this.accelerationX = 1.5;
    } else {
      this.accelerationX = 0;
    }


    //MORE FUN?
    //works if add bouncing off walls feature
    // if (this.move.left && this.x > this.boundaryXLeft) {
    //   this.accelerationX = -1.5;
    // }
    // else if (this.move.right && this.x < this.boundaryXRight) {
    //   this.accelerationX = 1.5;
    // }
    // else {
    //   this.accelerationX *= 0.95;
    // }
  }
  draw(context) {
    context.drawImage(
      this.image,
      Math.round(this.x - this.image.width / 2),
      Math.round(this.y - this.image.height / 2)
    );
  }

  keyListener() {
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowDown":
          this.move.down = true;
          this.move.floatUp = false;
          break;
        case "ArrowLeft":
          this.move.left = true;
          break;
        case "ArrowRight":
          this.move.right = true;
        default:
          return;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.move.up = false;
          break;
        case "ArrowDown":
          this.move.down = false;
          this.move.floatUp = true;
          break;
        case "ArrowLeft":
          this.move.left = false;
          break;
        case "ArrowRight":
          this.move.right = false;
        default:
          return;
      }
    });
  }
}
