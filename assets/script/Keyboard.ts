// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Gibbet from './Gibbet';
import LittleSnake from './LittleSnake';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Keyboard extends cc.Component {
  @property(Gibbet)
  game: Gibbet = null;

  @property(LittleSnake)
  snake: LittleSnake = null;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.getDirectionsFromKeyboard();
  }

  start() {}

  // update (dt) {}

  getLettersFromKeyboard() {
    cc.systemEvent.on(
      cc.SystemEvent.EventType.KEY_DOWN,
      (event: cc.Event.EventKeyboard) => {
        this.addLetter(String.fromCharCode(event.keyCode).toLowerCase());
      },
      this
    );
  }

  addLetter(letter: string): void {
    if (this.game.verifyLetter(letter)) {
      this.game.addToGuessWord(letter);
    } else {
      this.game.loselife();
    }
  }

  getDirectionsFromKeyboard() {
    cc.systemEvent.on(
      cc.SystemEvent.EventType.KEY_DOWN,
      (event: cc.Event.EventKeyboard) => {
        switch (event.keyCode) {
          case cc.macro.KEY.w || cc.macro.KEY.up:
            this.snake.direction = 'up';
            break;
          case cc.macro.KEY.s || cc.macro.KEY.down:
            this.snake.direction = 'down';
            break;
          case cc.macro.KEY.a || cc.macro.KEY.left:
            this.snake.direction = 'left';
            break;
          case cc.macro.KEY.d || cc.macro.KEY.right:
            this.snake.direction = 'right';
            break;
        }
      },
      this
    );
  }
}
