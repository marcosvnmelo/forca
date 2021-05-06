// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import LittleSnake from './LittleSnake';
import Spawner from './Spawner';

export enum CollisionTags {
  SNAKE = 0,
  APPLE = 1,
  BORDER = 2,
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {
  score: number = 0;

  @property(cc.Label)
  scoreLabel: cc.Label = null;

  @property(cc.Label)
  messageLabel: cc.Label = null;

  @property(Spawner)
  spawner: Spawner = null;

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {
    this.setUp();
  }

  setUp() {
    cc.director.getCollisionManager().enabled = true;
    cc.director.getCollisionManager().enabledDebugDraw = true;
    cc.director.getCollisionManager().enabledDrawBoundingBox = true;

    this.scoreLabel.string = 'Score: ' + this.score;
    this.messageLabel.string = '';
  }

  incrementScore() {
    this.score++;
    this.scoreLabel.string = 'Score: ' + this.score;
    this.spawner.spawnApple();
  }

  lose() {
    this.messageLabel.string = 'Perdeu';
  }

  // update (dt) {}
}
