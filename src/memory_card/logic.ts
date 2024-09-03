import {
  difficultyType,
  images_mapping_type,
  images_variation_type,
  MemoryCardType,
  images_name,
  images_variation,
  MemoryCardStateType,
} from "@/types";

export const difficultySizeMap: Record<difficultyType, number> = {
  easy: 3,
  medium: 4,
  hard: 5,
};

export class MemoryCard {
  public difficulty: difficultyType = "easy";
  public board: MemoryCardType = [];
  public turns: number = 0;
  public images_variant: images_variation_type = "color";
  public images_mapping: images_mapping_type = {};
  public win: boolean = false;
  public needToHide: boolean = false;

  constructor(difficulty: difficultyType = "easy") {
    this.reset(difficulty);
  }

  public reset(difficulty: difficultyType = this.difficulty) {
    this.turns = 0;
    this.difficulty = difficulty;
    this.board = this.generateBoard();
    this.shuffle();

    this.images_mapping = this.generateImagesMapping();
    this.images_variant = this.generateImagesVariation();
    this.needToHide = false;
    this.win = false;
  }
  private generateBoard() {
    const n_cards = difficultySizeMap[this.difficulty] * 4;
    const cards: MemoryCardType = Array(n_cards)
      .fill(null)
      .map((_, index) => {
        return {
          number: Math.floor(index / 2),
          flipped: false,
          solved: false,
        };
      });
    return cards;
  }
  private shuffle(arr: any[] = this.board) {
    arr.sort(() => Math.random() - 0.5);
  }
  private generateImagesMapping() {
    const I_N = [...images_name];
    this.shuffle(I_N);
    const images_mapping: images_mapping_type = {};
    for (let i = 0; i < this.board.length / 2; i++) {
      images_mapping[i] = I_N[i];
    }
    return images_mapping;
  }
  private generateImagesVariation() {
    const random_index = Math.floor(Math.random() * images_variation.length);
    return images_variation[random_index];
  }
  private getUnsolvedIndex() {
    const i: number[] = [];
    for (let index = 0; index < this.board.length; index++) {
      if (this.board[index].flipped && !this.board[index].solved) {
        i.push(index);
      }
    }
    return i;
  }
  public hideUnsolved() {
    this.board = this.board.map((card) => {
      return {
        ...card,
        flipped: card.solved ? card.flipped : false,
      };
    });
    this.needToHide = false;
  }

  private countFlippedUnsolved() {
    return this.board.filter((card) => !card.solved && card.flipped).length;
  }

  public getState(): MemoryCardStateType {
    return {
      difficulty: this.difficulty,
      cards: this.board,
      turns: this.turns,
      images_mapping: this.images_mapping,
      images_variant: this.images_variant,
    };
  }

  public setState(state: MemoryCardStateType) {
    this.difficulty = state.difficulty;
    this.board = state.cards;
    this.turns = state.turns;
    this.images_mapping = state.images_mapping;
    this.images_variant = state.images_variant;
  }

  public flip(index: number) {
    if (this.countFlippedUnsolved() === 2) {
      return;
    }
    const crr = this.board[index];
    if (crr.solved) {
      return;
    }
    crr.flipped = !crr.flipped;
    if (crr.flipped) {
      this.turns++;
    }

    const unsolved = this.countFlippedUnsolved();
    if (unsolved === 2) {
      const indices = this.getUnsolvedIndex();
      const c0 = this.board[indices[0]];
      const c1 = this.board[indices[1]];
      if (c0.number === c1.number) {
        c0.solved = true;
        c1.solved = true;

        this.win = this.checkWin();
      } else {
        this.needToHide = true;
      }
    }
  }

  public hint() {
    this.board = this.board.map((card) => {
      if (!card.flipped) {
        this.turns++;
      }
      return {
        ...card,
        flipped: true,
      };
    });

    this.needToHide = true;
  }

  public checkWin() {
    return this.board.every((card) => card.solved);
  }
}
