// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Main from './Main';

const { ccclass, property } = cc._decorator;

export enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

@ccclass
export default class LittleSnake extends cc.Component {
  private aux: number = 0;
  private speed: number = 5;

  direction: Direction = Direction.UP;

  @property(Main)
  game: Main = null;

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {
    this.schedule(this.move, 0.005, cc.macro.REPEAT_FOREVER, 0);
    // this.scheduleOnce(() => {
    //   this.stop();
    // }, 3);
  }

  // update(dt: number) {}

  move() {
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
  }

  stop() {
    this.unschedule(this.move);
  }

  die() {
    this.stop();
    this.game.lose();
  }
}
