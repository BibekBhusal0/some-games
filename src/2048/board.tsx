import { cn } from "@/lib/utils";
import { Fragment } from "react/jsx-runtime";
import Tiles from "./tiles";
import { boardType } from "./logic";
import { AnimatePresence } from "framer-motion";

const empty4x4 = [
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
];

function Board({ board = empty4x4 }: { board?: boardType }) {
  const n_row = board[0].length;
  return (
    <div
      style={{ gridTemplateColumns: `repeat(${n_row}, 1fr) ` }}
      className={cn(
        "w-full aspect-square bg-default-300 p-2 rounded-md",
        "grid gap-2",
        "relative"
      )}>
      <AnimatePresence>
        {board.map((row, i) => (
          <Fragment key={i}>
            {row.map((cell, j) => (
              <Tiles key={j} number={cell} rows={board.length} x={j} y={i} />
            ))}
          </Fragment>
        ))}
      </AnimatePresence>
    </div>
  );
}
export default Board;
