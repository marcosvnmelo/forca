// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Gibbet extends cc.Component {
  private guessWord: string = null;
  private lifes: number = null;

  @property(cc.String)
  public word: string = '';

  @property(cc.Label)
  guessWordLabel: cc.Label = null;

  @property(cc.Label)
  lifesWordLabel: cc.Label = null;

  @property(cc.Label)
  winMessageLabel: cc.Label = null;

  @property(cc.Button)
  restartButton: cc.Button = null;

  @property(cc.Sprite)
  winImage: cc.Sprite = null;

  @property(cc.Sprite)
  loseImage: cc.Sprite = null;

  @property(cc.AudioSource)
  loseAudio: cc.AudioSource = null;

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {
    this.setupGame();
  }

  // update (dt) {}

  setupGame(): void {
    this.lifes = 6;

    let newGuessWord = '';
    for (let index = 0; index < this.word.length; index++) {
      newGuessWord += '_';
    }
    this.guessWord = newGuessWord;
    this.guessWordLabel.string = this.guessWord;

    this.lifesWordLabel.string = 'Vidas: ' + this.lifes;

    this.winMessageLabel.string = '';

    this.restartButton.node.opacity = 0;
    this.restartButton.node.active = false;

    this.winImage.node.opacity = 0;
    this.loseImage.node.opacity = 0;
  }

  verifyLetter(letra: string): boolean {
    let exists = false;

    for (let i = 0; i < this.word.length; i++) {
      if (this.word.charAt(i) == letra) {
        exists = true;
        break;
      }
    }
    return exists;
  }

  addToGuessWord(letra: string): void {
    let novaPalavraDita = '';

    for (let i = 0; i < this.word.length; i++) {
      novaPalavraDita +=
        this.word.charAt(i) == letra ? letra : this.guessWord.charAt(i);
    }

    this.guessWord = novaPalavraDita;

    if (this.lifes > 0) {
      this.guessWordLabel.string = this.guessWord;
    }

    if (this.guessWord == this.word) {
      this.win();
    }
  }

  loselife(): void {
    if (this.lifes > 0) {
      this.lifes--;
      this.lifesWordLabel.string = 'Vidas: ' + this.lifes;
    }

    if (this.lifes == 0) {
      this.lose();
    }
  }

  win(): void {
    this.winMessageLabel.string = 'Ganhou!';
    this.restartButton.node.opacity = 255;
    this.restartButton.node.active = true;

    this.winImage.node.opacity = 255;
  }

  lose(): void {
    this.winMessageLabel.string = 'Perdeu Otário!';
    this.restartButton.node.opacity = 255;
    this.restartButton.node.active = true;

    this.loseImage.node.opacity = 255;
    this.loseAudio.play();
  }
}
