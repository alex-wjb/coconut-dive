//TODO: close event listeners after use?
export class Player {
  image = document.getElementById("coco1");
  velocityX = 0;
  velocityY = 0;
  accelerationX = 0;
  accelerationY = 0;
  frictionX = 0.9;
  frictionY = 0.9;
  move = {
    up: false,
    down: false,
    left: false,
    right: false,
    floatUp: false,
  };
  constructor(game) {
    this.game = game;
    //set player boundaries
    this.boundaryXLeft = this.game.width / 6;
    this.boundaryXRight = this.game.width - this.game.width / 6;
    this.boundaryY = 100;
    this.touchX = null;
    this.touchY = "";
    this.moved = false;
    this.bottomBoundaryY = 200;

    //set player starting co-ords
    this.x = 0;
    this.currentX = 0;
    this.startX = null;
    this.y = this.boundaryY;
    this.#keyListener();
    this.#touchListener();
    this.#movePlayer();
  }
  #movePlayer() {
    //calculate final velocity
    this.velocityX += this.accelerationX;
    this.velocityY += this.accelerationY;

    //simulate friction, eventually slows velocity to 0 when no acceleration.
    this.velocityX *= this.frictionX;
    this.velocityY *= this.frictionY;

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
  update(ctx) {

        //TOUCH MOVEMENT
        if (this.touchX) { 
          if (this.touchX > this.currentX) {
            this.move.left = false;
            this.move.right = true;
          } 
          if(this.touchX < this.currentX){
            this.move.right = false;
            this.move.left = true;
          }
          }
          console.log(this.touchX);
          console.log(this.currentX);
          
          if (this.touchX <= this.currentX + 30 && this.touchX >= this.currentX - 30) {
            this.currentX = this.touchX;
            this.move.right = false;
            this.move.left = false;
            //slow down player
            this.accelerationX = 0;
            this.velocityX = this.velocityX*0.8;
          }
        
    // if (this.touchX) {
        
    //   if (this.touchX < this.currentX && !this.moved) {
    //     this.move.right = false;
    //     this.move.left = true;
    //     this.moved = true;
    //   }
    
     
    //   if (this.touchX > this.currentX && !this.moved) {
    //     this.move.right = true;
    //     this.move.left = false;
    //     this.moved = true;
    //   }

    //   if (this.touchX < this.currentX ) {
      
    //     this.move.right = false;
       
    //   }

    //   if (this.touchX > this.currentX) {
      
    //     this.move.left = false;
       
    //   }
    
     
    //   if (this.touchX > this.currentX && !this.moved) {
    //     this.move.right = true;
    //     this.move.left = false;
    //     this.moved = true;
    //   }
    // }
 


    this.#movePlayer();
    this.boundaryXLeft =
      ctx.canvas.width / 6 < 100 ? 100 : ctx.canvas.width / 6;
    this.boundaryXRight =
      ctx.canvas.width - ctx.canvas.width / 6 > ctx.canvas.width - 100
        ? ctx.canvas.width - 100
        : ctx.canvas.width - ctx.canvas.width / 6;
    // console.log(this.boundaryXRight);
    console.log(this.boundaryXLeft);
    this.friction = 0.9;







    if (this.move.down && this.y < ctx.canvas.height - this.bottomBoundaryY) {
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
    // console.log(this.currentX);
    if (this.move.left && this.currentX > this.boundaryXLeft) {
      this.accelerationX = -1.5;
    } else if (this.move.right && this.currentX < this.boundaryXRight) {
      this.accelerationX = 1.5;
    } else {
      this.accelerationX = 0;
    }

    if (this.currentX < this.boundaryXLeft) {
      this.frictionX = 0.8;
    }
    if (this.currentX < this.boundaryXLeft && this.move.right) {
      this.frictionX = 0.9;
    }

    if (this.currentX > this.boundaryXRight) {
      this.frictionX = 0.8;
    }
    if (this.currentX > this.boundaryXRight && this.move.left) {
      this.frictionX = 0.9;
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
  draw(ctx) {
    console.log(ctx.canvas.width);
    // console.log(this.game.width);
    // this.boundaryXRight = ctx.canvas.width - 200;

    let imageWidth = Math.round(this.image.width * (ctx.canvas.width * 0.0015));
    let imageHeight = Math.round(
      this.image.height * (ctx.canvas.width * 0.0015)
    );
    imageHeight =
      imageHeight < this.image.height ? imageHeight : this.image.height;
    imageWidth = imageWidth < this.image.width ? imageWidth : this.image.width;
    // console.log("x: " + this.x);
    // this.boundaryXLeft = ctx.canvas.width * 0.4

    this.boundaryXRight = ctx.canvas.width - ctx.canvas.width * 0.4;

   
    if (ctx.canvas.width < 450) {
      this.bottomBoundaryY = 250;
    }
    // console.log(ctx.canvas.width * 0.4);
    // console.log(ctx.canvas.width * 0.4);

    //initialise starting x co-ord
    // this.startX = ctx.canvas.width * 0.5;
    // this.currentX = (this.startX + this.x) + imageWidth / 2;

    this.startX = ctx.canvas.width * 0.5;
    this.currentX = Math.round(this.startX + this.x);
 

    ctx.drawImage(
      this.image,
      // Math.round(this.x - this.image.width / 2),
      Math.round(this.startX + this.x - imageWidth / 2),

      Math.round(this.y - imageHeight / 2),
      imageWidth,
      imageHeight
    );
  }

  #keyListener() {
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

  #touchListener() {
    // document.addEventListener("touchStart", (event) => {
    //   event.preventDefault();
    //   //could use pageX or screenX
    //   const touchX = event.touches[0].clientX;
    //   const touchY = event.touches[0].clientY;
    // });

    document.addEventListener("touchstart", (event) => {
      event.preventDefault();
      //could use pageX or screenX
      this.touchX = Math.round(event.touches[0].clientX);
      this.touchY = Math.round(event.touches[0].clientY);
      // if (this.touchX > this.currentX) {
      //   this.move.left = false;
      //   this.move.right = true;
      // } else {
      //   this.move.right = false;
      //   this.move.left = true;
      // }

      // if (this.touchX === this.currentX) {
      //   this.move.right = false;
      //   this.move.left = false;

      // }

      if (this.touchY > this.y) {
        this.move.down = true;
      } else {
        this.move.down = false;
      }
    });

    document.addEventListener("touchmove", (event) => {
      event.preventDefault();
      this.moved = false;
      //   //could use pageX or screenX
      this.touchX = Math.round(event.touches[0].clientX);
      this.touchY = Math.round(event.touches[0].clientY);
      // if (this.touchX > this.currentX) {
      //   this.move.left = false;
      //   this.move.right = true;
      // } else {
      //   this.move.right = false;
      //   this.move.left = true;
      // }

      if (this.touchY > this.y) {
        this.move.down = true;
      }
    });

    document.addEventListener("touchend", (event) => {
      event.preventDefault();
      //could use pageX or screenX
      this.move.right = false;
      this.move.left = false;
      this.move.down = false;
    });
  }
}
