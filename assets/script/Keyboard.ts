// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Forca from './Forca';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Keyboard extends cc.Component {
  @property(Forca)
  game: Forca = null;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.systemEvent.on(
      cc.SystemEvent.EventType.KEY_DOWN,
      (event: cc.Event.EventKeyboard) => {
        this.addLetter(String.fromCharCode(event.keyCode).toLowerCase());
      },
      this
    );
  }

  start() {}

  // update (dt) {}

  addLetter(letter: string): void {
    if (this.game.verifyLetter(letter)) {
      this.game.addToGuessWord(letter);
    } else {
      this.game.loselife();
    }
  }
}
