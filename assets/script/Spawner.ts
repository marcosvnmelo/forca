// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

import Apple from './Apple';

@ccclass
export default class Spawner extends cc.Component {
  @property(cc.SpriteFrame)
  appleAsset: cc.SpriteFrame = null;

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}
  start() {
    this.scheduleOnce(() => {
      const newNode = new cc.Node('Apple');

      const sprite = newNode.addComponent<cc.Sprite>(cc.Sprite);

      newNode.addComponent(Apple);

      sprite.spriteFrame = this.appleAsset;

      this.node.addChild(newNode);
    }, 3);
  }

  // update (dt) {}
}
