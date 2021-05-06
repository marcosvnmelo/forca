// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Apple from './Apple';
import LittleSnake from './LittleSnake';
import Main from './Main';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Spawner extends cc.Component {
  @property(cc.Prefab)
  apple: cc.Prefab = null;

  @property(Main)
  game: Main = null;

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}
  start() {
    this.spawnApple();
  }

  spawnApple() {
    const silvio = cc.instantiate(this.apple);

    const x = this.getRandomInt(100, 860 * 1.5);
    const y = this.getRandomInt(100, 540 * 1.5);
    silvio.x = x;
    silvio.y = y;
    silvio.getComponent(Apple).game = this.game;
    this.node.addChild(silvio);

    console.log(
      silvio.getComponent(cc.BoxCollider).size.width +
        '  ' +
        silvio.getComponent(cc.BoxCollider).size.height
    );
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // update (dt) {}
}
