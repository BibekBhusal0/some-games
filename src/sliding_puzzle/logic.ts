import {
  difficultyType,
  directions,
  sliding_puzzle_history,
  sliding_puzzle_type,
  sliding_puzzle_variations_obj,
} from "@/types";

export const difficultyRow: Record<difficultyType, number> = {
  easy: 3,
  medium: 4,
  hard: 5,
};

export default class SlidingPuzzle {
  public board: sliding_puzzle_type = [];
  public win_board: sliding_puzzle_type = [];
  public moves: number = 0;
  public size: number = 0;
  public win: boolean = false;
  public variant: sliding_puzzle_variations_obj = {
    type: "image",
    difficulty: "easy",
  };

  public history: sliding_puzzle_history[] = [
    {
      moves: this.moves,
      board: [...this.board],
    },
  ];
  constructor(
    varaintion: sliding_puzzle_variations_obj = {
      type: "image",
      difficulty: "easy",
    }
  ) {
    this.variant = varaintion;
    this.size = difficultyRow[varaintion.difficulty];

    this.reset();
  }

  public reset() {
    this.board = Array(this.size * this.size)
      .fill(1)
      .map((_, i) => i + 1);

    this.board[this.size * this.size - 1] = 0;
    this.win_board = [...this.board];

    this.shuffle(this.size * 20);
  }
  private is_valid_move(
    direction: directions,
    board: sliding_puzzle_type = this.board
  ) {
    const zero = board.indexOf(0);
    if (
      (direction === "left" && zero % this.size !== this.size - 1) ||
      (direction === "right" && zero % this.size !== 0) ||
      (direction === "down" && Math.floor(zero / this.size) !== 0) ||
      (direction === "up" && Math.floor(zero / this.size) !== this.size - 1)
    ) {
      return true;
    }
    return false;
  }
  private checkWin() {
    return this.board.toString() === this.win_board.toString();
  }
  public get_valid_moves(board: sliding_puzzle_type = this.board) {
    const all_directions: directions[] = ["right", "left", "up", "down"];
    return all_directions.filter((direction) =>
      this.is_valid_move(direction, board)
    );
  }
  public print(board = this.board) {
    for (let i = 0; i < this.size; i++) {
      let row = "";
      for (let j = 0; j < this.size; j++) {
        row += board[i * this.size + j] + " ";
      }
      console.log(row);
    }
    console.log("-------------");
  }
  public shuffle(turns: number = this.size * 20) {
    let prev: directions | null = null;
    const moves: Record<directions, directions> = {
      right: "left",
      left: "right",
      up: "down",
      down: "up",
    };

    for (let _ = 0; _ < turns; _++) {
      const tempMoves = Object.keys(moves).filter(
        (move) => !prev || move !== moves[prev]
      ) as directions[];

      const validMoves = tempMoves.filter((move) =>
        this.is_valid_move(move, this.board)
      );
      if (validMoves.length) {
        const currMove =
          validMoves[Math.floor(Math.random() * validMoves.length)];
        this.move(currMove, false);
        prev = currMove;
      }
    }
    this.moves = 0;
    this.win = false;
    this.history = [
      {
        moves: 0,
        board: [...this.board],
      },
    ];
  }
  private save_history() {
    if (this.history.length > 10) {
      this.history.shift();
    }

    this.history.push({ moves: this.moves, board: [...this.board] });
  }
  public load_history(history: sliding_puzzle_history[]) {
    this.history = history;
    const game = this.history[this.history.length - 1];
    this.moves = game.moves;
    this.board = game.board;
  }
  public move(direction: directions, playing = true) {
    const zero = this.board.indexOf(0);

    if (this.is_valid_move(direction) && zero !== -1) {
      const direction_mapping: Record<directions, number> = {
        up: this.size,
        down: -this.size,
        left: 1,
        right: -1,
      };

      const index = zero + direction_mapping[direction];
      const n = this.board[index];
      this.board[index] = 0;
      this.board[zero] = n;

      if (playing) {
        this.moves++;
        this.win = this.checkWin();
        this.save_history();
      }

      return true;
    }
    return false;
  }
  public undo() {
    if (this.history.length > 1) {
      this.history.pop();
      const index = this.history.length - 1;
      const game = { ...this.history[index] };
      this.board = [...game.board];
      this.moves = game.moves;
    }
  }
}
