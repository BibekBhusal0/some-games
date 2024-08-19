export type boardType = (number | undefined)[][];
export type directions = "up" | "down" | "left" | "right";
type rotationType = 0 | 90 | 180 | 270;

const rotations: Record<directions, rotationType> = {
  left: 0,
  up: 90,
  right: 180,
  down: 270,
};

const reverseRotations: Record<directions, rotationType> = {
  up: rotations.down,
  down: rotations.up,
  left: rotations.left,
  right: rotations.right,
};

function are_changes_made(board: boardType, new_board: boardType) {
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

function move_empty_to_last(row: (number | undefined)[]) {
  const non_zero = row.filter((cell) => cell !== undefined);
  const zero_count = row.length - non_zero.length;
  return non_zero.concat(Array(zero_count).fill(undefined));
}

// function merge_row(row: (number | undefined)[]): (number | undefined)[] {
//   const new_row: (number | undefined)[] = move_empty_to_last(row);
//   for (let i = 0; i < new_row.length - 1; i++) {
//     if (new_row[i] !== undefined && new_row[i] === new_row[i + 1]) {
//       new_row[i] = new_row[i]! * 2;
//       new_row[i + 1] = undefined;
//     }
//   }
//   return move_empty_to_last(new_row);
// }

// function merge_board(board: boardType) {
//   return board.map((row) => merge_row(row));
// }

function merge_row(
  row: (number | undefined)[]
): [scoreIncrement: number, newRow: (number | undefined)[]] {
  let scoreIncrement = 0;
  const new_row: (number | undefined)[] = move_empty_to_last(row);
  for (let i = 0; i < new_row.length - 1; i++) {
    if (new_row[i] !== undefined && new_row[i] === new_row[i + 1]) {
      scoreIncrement += new_row[i]! * 2;
      new_row[i] = new_row[i]! * 2;
      new_row[i + 1] = undefined;
    }
  }
  return [scoreIncrement, move_empty_to_last(new_row)];
}

function merge_board(
  board: boardType
): [scoreIncrement: number, newBoard: boardType] {
  let scoreIncrement = 0;
  const new_board = board.map((row) => {
    const [increment, newRow] = merge_row(row);
    scoreIncrement += increment;
    return newRow;
  });
  return [scoreIncrement, new_board];
}

function rotate_board(board: boardType, angle: rotationType): boardType {
  switch (angle) {
    case 0:
      return board;
    case 90:
      return board[0].map((_, i) =>
        board.map((row) => row[row.length - 1 - i])
      );
    case 180:
      return board.map((row) => row.slice().reverse()).reverse();
    case 270:
      return board[0].map((_, i) => board.map((row) => row[i]).reverse());
  }
}

export class TwentyFourtyEight {
  private board: boardType = [];
  public gameOver: boolean = false;
  public score: number = 0;
  public size: number = 0;

  constructor(size: number = 4) {
    this.reset_board(size);
  }

  public reset_board(size: number = this.size) {
    this.board = Array(size)
      .fill(undefined)
      .map(() => new Array(size).fill(undefined));

    this.size = size;
    this.gameOver = false;
    this.score = 0;
    this.addRandom();
  }
  public getBoard() {
    return this.board;
  }
  public setBoard(board: boardType) {
    this.board = board;
  }

  public getAllEmpty() {
    const empty: [number, number][] = [];
    this.board.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === undefined) empty.push([i, j]);
      });
    });
    return empty;
  }

  public addRandom() {
    const empty: [number, number][] = this.getAllEmpty();
    if (empty.length === 0) return;
    const index = Math.floor(Math.random() * empty.length);
    const [x, y] = empty[index];
    const value = Math.random() < 0.9 ? 2 : 4;

    this.board[x][y] = value;
  }

  public print(board = this.board) {
    for (let i = 0; i < board.length; i++) {
      let row = "";
      for (let j = 0; j < board[i].length; j++) {
        const cell = board[i][j];
        if (cell === undefined) {
          row += "_";
        } else {
          row += cell.toString();
        }
        if (j !== board[i].length - 1) row += "|";
      }
      console.log(row);
    }
  }

  public move(direction: directions) {
    if (!this.gameOver) {
      var new_board = rotate_board(this.board, rotations[direction]);

      const [score, merged_board] = merge_board(new_board);
      this.score += score;
      new_board = rotate_board(merged_board, reverseRotations[direction]);
      const changes_made = are_changes_made(this.board, new_board);

      if (changes_made) {
        this.board = new_board;
        this.gameOver = this.checkGameOver();
        this.addRandom();
      }
      return changes_made;
    }
    return false;
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
