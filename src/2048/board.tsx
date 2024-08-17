import { cn } from "@/lib/utils";
import { Fragment } from "react/jsx-runtime";
import Tiles from "./tiles";

const empty4x4 = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

function Board2048({ board = empty4x4 }: { board?: number[][] }) {
  const n_row = board[0].length;
  return (
    <div
      style={{ gridTemplateColumns: `repeat(${n_row}, 1fr)` }}
      className={cn(
        "w-full grid gap-2 bg-default-400 p-2 rounded-md"
        // `grid-cols-${n_row}`
      )}>
      {board.map((row, i) => (
        <Fragment key={i}>
          {row.map((cell, j) => (
            <Tiles key={j} number={cell} />
          ))}
        </Fragment>
      ))}
    </div>
  );
}
export default Board2048;
