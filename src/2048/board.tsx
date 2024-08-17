import { cn } from "@/lib/utils";
import { Fragment } from "react/jsx-runtime";

function Board2048() {
  const board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const n_row = board[0].length;
  return (
    <div
      className={cn(
        "w-full grid gap-2",
        `grid-cols-${n_row}`,
        `grid-row-${n_row}`
      )}>
      {board.map((row, i) => (
        <Fragment key={i}>
          {row.map((cell, j) => (
            <div
              key={j}
              style={{
                backgroundColor: "#F2B17A",
                aspectRatio: 1,
                color: "#000",
              }}
              className="text-4xl font-semibold rounded-md text-center justify-center align-middle "
              //
            >
              <div className="flex items-center justify-center h-full">
                {cell}
              </div>
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  );
}
export default Board2048;
