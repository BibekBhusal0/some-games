import {
  board2048Type,
  directions,
  history2048Type,
  rotationType,
  row2048Type,
} from "@/types";

export const rotations: Record<directions, rotationType> = {
  left: 0,
  up: 90,
  right: 180,
  down: 270,
};

export const reverseRotations: Record<directions, rotationType> = {
  up: rotations.down,
  down: rotations.up,
  left: rotations.left,
  right: rotations.right,
};

export function getEmptyBoard(n: number): board2048Type {
  return Array(n)
    .fill(0)
    .map(() => new Array(n).fill(0));
}

export function are_changes_made(
  board: board2048Type,
  new_board: board2048Type
) {
  if (board === new_board) return false;

  if (board.length !== new_board.length) return true;

  for (let i = 0; i < board.length; i++) {
    if (board[i].length !== new_board[i].length) return true;
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] !== new_board[i][j]) return true;
    }
  }
  return false;
}

function move_empty_to_last(row: row2048Type, empty_val = 0): row2048Type {
  const non_zero = row.filter((cell) => cell !== empty_val);
  const zero_count = row.length - non_zero.length;
  return non_zero.concat(Array(zero_count).fill(empty_val));
}

function merge_row(
  row: row2048Type,
  id_row: row2048Type
): [scoreIncrement: number, newRow: row2048Type, id_row: row2048Type] {
  let scoreIncrement = 0;
  const new_row = move_empty_to_last(row);
  const new_id_row = move_empty_to_last(id_row);
  for (let i = 0; i < new_row.length - 1; i++) {
    if (new_row[i] !== 0 && new_row[i] === new_row[i + 1]) {
      scoreIncrement += new_row[i]! * 2;
      new_row[i] = new_row[i]! * 2;
      new_row[i + 1] = 0;
      new_id_row[i] = new_id_row[i + 1];
      new_id_row[i + 1] = 0;
    }
  }
  return [
    scoreIncrement,
    move_empty_to_last(new_row),
    move_empty_to_last(new_id_row),
  ];
}

function merge_board(
  board: board2048Type,
  id: board2048Type
): [
  scoreIncrement: number,
  newBoard: board2048Type,
  new_id_row: board2048Type,
] {
  let scoreIncrement = 0;
  let ids: board2048Type | 0 = [];
  const new_board = board.map((row, i) => {
    const [increment, newRow, new_id_row] = merge_row(row, id[i]);
    if (new_id_row) ids.push(new_id_row);
    scoreIncrement += increment;
    return newRow;
  });
  return [scoreIncrement, new_board, ids];
}

function rotate_board(
  board: board2048Type,
  angle: rotationType
): board2048Type {
  switch (angle) {
    case 0:
      return board.slice();
    case 90:
      return board[0].map((_, i) =>
        board.slice().map((row) => row[row.length - 1 - i])
      );
    case 180:
      return board.map((row) => row.slice().reverse()).reverse();
    case 270:
      return board[0].map((_, i) =>
        board
          .slice()
          .map((row) => row[i])
          .reverse()
      );
  }
}

export class TwentyFourtyEight {
  public id: board2048Type = [];
  private max_id = 0;
  public board: board2048Type = [];
  public gameOver: boolean = false;
  public score: number = 0;
  public size: number = 0;
  public win: boolean = false;

  public history: history2048Type[] = [
    {
      score: this.score,
      id: this.id,
      board: this.board,
    },
  ];

  constructor(size: number = 4) {
    this.reset_board(size);
  }
  public reset_board(size: number = this.size) {
    this.max_id = 0;
    this.board = getEmptyBoard(size);
    this.id = getEmptyBoard(size);

    this.size = size;
    this.win = false;
    this.gameOver = false;
    this.score = 0;
    this.addRandom();

    this.history = [
      {
        score: this.score,
        id: this.id,
        board: this.board,
      },
    ];
  }
  private getAllEmpty() {
    const empty: [number, number][] = [];
    this.board.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === 0) empty.push([i, j]);
      });
    });
    return empty;
  }
  private addRandom() {
    const empty: [number, number][] = this.getAllEmpty();
    if (empty.length === 0) return;
    const index = Math.floor(Math.random() * empty.length);
    const [x, y] = empty[index];
    const value = Math.random() < 0.9 ? 2 : 4;

    this.board[x][y] = value;
    this.max_id += 1;
    this.id[x][y] = this.max_id;
  }
  public print(board = this.board) {
    for (let i = 0; i < board.length; i++) {
      let row = "";
      for (let j = 0; j < board[i].length; j++) {
        const cell = board[i][j];
        if (cell === 0) {
          row += "_";
        } else {
          row += cell.toString();
        }
        if (j !== board[i].length - 1) row += "|";
      }
      console.log(row);
    }
  }
  private save_history() {
    if (this.history.length > 10) {
      this.history.shift();
    }
    this.history.push({
      score: this.score,
      board: this.board,
      id: this.id,
    });
  }
  public load_history(history: history2048Type[]) {
    this.history = history;
    if (this.history.length === 0) {
      this.reset_board();
      return;
    }
    const game = this.history[this.history.length - 1];
    this.score = game.score;
    this.board = game.board;
    this.size = this.board[0].length;
    this.id = game.id;
    this.max_id = Math.max(...this.id.flat().map((x) => x ?? 0)) + 1;
    this.gameOver = this.checkGameOver();
    this.win = this.checkWin();
  }
  public move(direction: directions) {
    if (!this.gameOver) {
      var new_board = rotate_board(this.board, rotations[direction]);
      var new_id = rotate_board(this.id, rotations[direction]);

      const [score, merged_board, merged_id] = merge_board(new_board, new_id);
      this.score += score;

      new_board = rotate_board(merged_board, reverseRotations[direction]);
      new_id = rotate_board(merged_id, reverseRotations[direction]);

      const changes_made = are_changes_made(this.board, new_board);

      if (changes_made) {
        this.board = new_board;
        this.id = new_id;

        this.addRandom();
        this.gameOver = this.checkGameOver();
        this.win = this.checkWin();

        this.save_history();
      }
      return changes_made;
    }
    return false;
  }
  public undo() {
    if (this.history.length > 1) {
      this.history.pop();
      const index = this.history.length - 1;
      const game = this.history[index];
      this.board = game.board;
      this.id = game.id;
      this.score = game.score;
      this.gameOver = this.checkGameOver();
    }
    this.win = this.checkWin();
  }

  public checkWin() {
    return JSON.stringify(this.board).includes("2048");
  }
  public checkGameOver() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === 0) {
          return false;
        }
        if (
          i < this.board.length - 1 &&
          this.board[i][j] === this.board[i + 1][j]
        ) {
          return false;
        }
        if (
          j < this.board[i].length - 1 &&
          this.board[i][j] === this.board[i][j + 1]
        ) {
          return false;
        }
      }
    }
    return true;
  }
}
