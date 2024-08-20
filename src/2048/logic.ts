export type rowType = (number | undefined)[];
export type boardType = rowType[];
export type directions = "up" | "down" | "left" | "right";
export type rotationType = 0 | 90 | 180 | 270;

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

export function are_changes_made(board: boardType, new_board: boardType) {
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

function move_empty_to_last(row: rowType, empty_val = undefined): rowType {
  const non_zero = row.filter((cell) => cell !== empty_val);
  const zero_count = row.length - non_zero.length;
  return non_zero.concat(Array(zero_count).fill(empty_val));
}

function merge_row(
  row: rowType,
  id_row: rowType
): [scoreIncrement: number, newRow: rowType, id_row: rowType] {
  let scoreIncrement = 0;
  const new_row = move_empty_to_last(row);
  const new_id_row = move_empty_to_last(id_row);
  for (let i = 0; i < new_row.length - 1; i++) {
    if (new_row[i] !== undefined && new_row[i] === new_row[i + 1]) {
      scoreIncrement += new_row[i]! * 2;
      new_row[i] = new_row[i]! * 2;
      new_row[i + 1] = undefined;
      new_id_row[i] = new_id_row[i + 1];
      new_id_row[i + 1] = undefined;
    }
  }
  return [scoreIncrement, move_empty_to_last(new_row), new_id_row];
}

function merge_board(
  board: boardType,
  id: boardType
): [scoreIncrement: number, newBoard: boardType, new_id_row: boardType] {
  let scoreIncrement = 0;
  let ids: boardType | undefined = [];
  const new_board = board.map((row, i) => {
    const [increment, newRow, new_id_row] = merge_row(row, id[i]);
    if (new_id_row) ids.push(new_id_row);
    scoreIncrement += increment;
    return newRow;
  });
  return [scoreIncrement, new_board, ids];
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

export function createPositionMap(
  board: boardType
): Map<number, [number, number]> {
  const positionMap = new Map<number, [number, number]>();
  board.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell !== undefined) {
        positionMap.set(cell, [i, j]);
      }
    });
  });
  return positionMap;
}

export class TwentyFourtyEight {
  public id: boardType = [];
  private max_id = 0;
  public board: boardType = [];
  public gameOver: boolean = false;
  public score: number = 0;
  public size: number = 0;
  public idMap: Map<number, [number, number]> = new Map();

  public history = [
    {
      score: this.score,
      id: this.id,
      board: this.board,
      idMap: this.idMap,
    },
  ];

  constructor(size: number = 4) {
    this.reset_board(size);
  }

  public reset_board(size: number = this.size) {
    this.max_id = 0;
    this.board = Array(size)
      .fill(undefined)
      .map(() => new Array(size).fill(undefined));
    this.id = Array(size)
      .fill(undefined)
      .map(() => new Array(size).fill(undefined));

    this.size = size;
    this.gameOver = false;
    this.score = 0;
    this.addRandom();

    this.idMap = createPositionMap(this.id);

    this.history = [
      {
        score: this.score,
        id: this.id,
        board: this.board,
        idMap: this.idMap,
      },
    ];
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
    this.max_id += 1;
    this.id[x][y] = this.max_id;
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
      var new_id = rotate_board(this.id, rotations[direction]);

      const [score, merged_board, merged_id] = merge_board(new_board, new_id);
      this.score += score;

      new_board = rotate_board(merged_board, reverseRotations[direction]);
      new_id = rotate_board(merged_id, reverseRotations[direction]);
      const changes_made = are_changes_made(this.board, new_board);

      if (changes_made) {
        this.board = new_board;
        this.id = new_id;
        this.gameOver = this.checkGameOver();

        this.addRandom();
        this.idMap = createPositionMap(this.board);

        if (this.history.length > 10) {
          this.history.shift();
        }
        this.history.push({
          score: this.score,
          board: this.board,
          id: this.id,
          idMap: this.idMap,
        });
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
      this.idMap = game.idMap;
      this.score = game.score;
      this.gameOver = this.checkGameOver();
    }
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
