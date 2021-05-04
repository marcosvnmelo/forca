// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class LittleSnake extends cc.Component {
  private aux: number = 0;
  private speed: number = 5;

  direction: 'up' | 'down' | 'left' | 'right' = 'up';

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {}

  update(dt: number) {
    // console.log(this.aux);

    if (this.aux >= 0.01 / (this.speed * 100)) {
      switch (this.direction) {
        case 'up':
          this.node.y += this.speed;
          break;
        case 'down':
          this.node.y -= this.speed;
          break;
        case 'left':
          this.node.x -= this.speed;
          break;
        case 'right':
          this.node.x += this.speed;
          break;
      }
      this.aux = 0;
    } else {
      this.aux += dt;
    }
  }
}
