// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Main from './Main';

const { ccclass, property } = cc._decorator;

export enum DIRECTION {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export enum SNAKE_STATE {
  IDLE,
  WALKING,
}

@ccclass
export default class LittleSnake extends cc.Component {
  private aux: number = 0;
  private speed: number = 0;

  direction: keyof typeof DIRECTION = 'UP';
  state: keyof typeof SNAKE_STATE = 'IDLE';

  @property(Main)
  game: Main = null;

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {
    // this.schedule(this.move, 0.01, cc.macro.REPEAT_FOREVER, 0);
    this.schedule(
      () => {
        switch (this.direction) {
          case 'UP':
            this.node.y += this.speed;
            break;
          case 'DOWN':
            this.node.y -= this.speed;
            break;
          case 'LEFT':
            this.node.x -= this.speed;
            break;
          case 'RIGHT':
            this.node.x += this.speed;
            break;
        }
      },
      0.01,
      cc.macro.REPEAT_FOREVER,
      0
    );
  }

  // update(dt: number) {}

  // move() {
  //   switch (this.direction) {
  //     case 'UP':
  //       this.node.y += this.speed;
  //       break;
  //     case 'DOWN':
  //       this.node.y -= this.speed;
  //       break;
  //     case 'LEFT':
  //       this.node.x -= this.speed;
  //       break;
  //     case 'RIGHT':
  //       this.node.x += this.speed;
  //       break;
  //   }
  // }

  // stop() {
  //   this.unschedule(this.move);
  // }

  move() {
    if (this.state == 'IDLE') {
      this.speed = 5;
      this.node.getComponent(cc.Animation).play('Snake_walking');
      this.state = 'WALKING';
    }
  }

  stop() {
    if (this.state == 'WALKING') {
      this.speed = 0;
      this.node.getComponent(cc.Animation).play('Snake_idle');
      this.state = 'IDLE';
    }
  }

  die() {
    this.stop();
    this.game.lose();
  }
}
