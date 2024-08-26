export type directions = "up" | "down" | "left" | "right";

// 2048
export type row2048Type = (number | undefined)[];
export type board2048Type = row2048Type[];
export type rotationType = 0 | 90 | 180 | 270;
export type history2048Type = {
  board: board2048Type;
  score: number;
  id: board2048Type;
};
export type variants2048 = "3 x 3" | "4 x 4" | "5 x 5" | "6 x 6";
export const variants2048Mapping: Record<number, variants2048> = {
  3: "3 x 3",
  4: "4 x 4",
  5: "5 x 5",
  6: "6 x 6",
};

// sliding puzzle
export type sliding_puzzle_type = number[];
export type sliding_puzzle_history = {
  moves: number;
  board: sliding_puzzle_type;
};
