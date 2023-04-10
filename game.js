import { Player} from "/player.js"
export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.fpsLimit = 70;
    this.player = new Player(this);
    //calc ms for 1 frame at set fps
    this.minFrameTime = 1000 / this.fpsLimit;
    this.timer = 0;
  }
  render(ctx, deltaAnimateTime) {
    //deltaAnimateTime = time elapsed since last call of animation loop
    //prevents frame render any faster than minFrameTime
    if (this.timer > this.minFrameTime) {
      //clear canvas
      ctx.clearRect(0, 0, this.width, this.height);
      //draw background
      const pattern = ctx.createPattern(document.getElementById("seaTile"), "repeat");
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //draw objects
      this.player.draw(ctx);
      this.player.update();
      this.timer = 0;
    }
    this.timer += deltaAnimateTime;
  }
}