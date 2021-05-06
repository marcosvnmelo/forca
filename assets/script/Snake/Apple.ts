// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import LittleSnake from './LittleSnake';
import Main, { CollisionTags } from './Main';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Apple extends cc.Component {
  game: Main;
  snake: LittleSnake;

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {}

  onCollisionEnter(other: cc.BoxCollider, _self: any) {
    if (other.tag == CollisionTags.SNAKE) {
      this.game.incrementScore();
      this.node.destroy();
    }
  }

  // update (dt) {}
}
