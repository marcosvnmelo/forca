// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Gibbet from './Gibbet';
import LittleSnake, { Direction } from './LittleSnake';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Keyboard extends cc.Component {
  @property(Gibbet)
  game: Gibbet = null;

  @property(LittleSnake)
  snake: LittleSnake = null;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    // this.debugLetters();
    this.getDirectionsFromKeyboard();
  }

  start() {}

  // update (dt) {}

  debugLetters() {
    cc.systemEvent.on(
      cc.SystemEvent.EventType.KEY_DOWN,
      (event: cc.Event.EventKeyboard) => {
        console.log(event.keyCode);
      },
      this
    );
  }

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
          case cc.macro.KEY.w || 38:
            this.snake.direction = Direction.UP;
            break;
          case cc.macro.KEY.s || 40:
            this.snake.direction = Direction.DOWN;
            break;
          case cc.macro.KEY.a || 37:
            this.snake.direction = Direction.LEFT;
            break;
          case cc.macro.KEY.d || 39:
            this.snake.direction = Direction.RIGHT;
            break;
        }
      },
      this
    );
  }
}
