import { Player } from "/player.js";
export class Game {
  //public class fields
  fpsLimit = 70;
  //calc ms for 1 frame at set fps
  minFrameTime = 1000 / this.fpsLimit;
  timer = 0;
  bgOffsetY = 0;
  bgScrollSpeed = 3;
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.player = new Player(this);
  }
  //INSTANCE METHODS
  #drawBackground(ctx) {
    //create scrolling background
    this.canvas.height = window.innerHeight;
    ctx.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    ctx.canvas.width = window.innerWidth;
    if (this.canvas.width >= 800) {
      this.canvas.width = 800;
    }

    const seaTile = document.getElementById("seaTileSprite");
    const pattern = ctx.createPattern(seaTile, "repeat");
    ctx.fillStyle = pattern;

    ctx.transform(1, 0, 0, 1, 0, -this.bgOffsetY);

    //draw backgrounds
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillRect(0, this.canvas.height, this.canvas.width, this.canvas.height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    this.bgOffsetY += this.bgScrollSpeed;

    //loop backgrounds by resetting offset
    if (this.bgOffsetY > this.canvas.height) {
      //calculating modulus ensures sprite pattern's match when rects are looped, as end of sprite pattern depends on canvas height.
      this.bgOffsetY = this.canvas.height % seaTile.height;
    }
  }
  render(ctx, deltaAnimateTime) {
    //deltaAnimateTime = time elapsed since last call of animation loop
    //prevents frame render any faster than minFrameTime
    if (this.timer > this.minFrameTime) {
      //clear canvas
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      //draw scrolling background
      this.#drawBackground(ctx);

      //draw objects
      this.player.draw(ctx);
      this.player.update(ctx);
      this.timer = 0;
    }
    this.timer += deltaAnimateTime;
  }
}
