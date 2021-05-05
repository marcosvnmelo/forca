// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import LittleSnake from './LittleSnake';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Border extends cc.Component {
  @property(LittleSnake)
  snake: LittleSnake = null;

  onCollisionEnter(other: cc.Collider, _self: cc.Collider) {
    if (other.tag == this.snake.getComponent(cc.BoxCollider).tag) {
      this.snake.die();
    }
  }

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {}

  // update (dt) {}
}
