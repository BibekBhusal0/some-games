import { Fragment } from "react/jsx-runtime";
import Tiles from "./tiles";
import { boardType } from "./logic";

const empty4x4 = [
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
];

function Board({
  board = empty4x4,
  ids = undefined,
  position = undefined,
  prevPosition = undefined,
}: {
  board?: boardType;
  ids?: boardType;
  position?: Map<number, [number, number]>;
  prevPosition?: Map<number, [number, number]>;
}) {
  const n_row = board[0].length;

  return (
    <div className="w-full aspect-square bg-default-300 rounded-md p-2">
      <div className="relative size-full ">
        {/* <AnimatePresence> */}
        {board.map((row, i) => (
          <Fragment key={i}>
            {row.map((cell, j) => {
              if (
                ids === undefined ||
                position === undefined ||
                prevPosition === undefined
              ) {
                return (
                  <Tiles
                    key={`${i}-${j}`}
                    number={cell}
                    rows={n_row}
                    x={j}
                    y={i}
                  />
                );
              }

              const id = ids[i][j];
              const currentPos = id === undefined ? [i, j] : position.get(id);
              const previousPos =
                id === undefined ? [i, j] : prevPosition.get(id);
              return (
                <Tiles
                  key={`${i}-${j}`}
                  number={cell}
                  rows={n_row}
                  x={currentPos?.[1] || j}
                  y={currentPos?.[0] || i}
                  prevX={previousPos?.[1] || j}
                  prevY={previousPos?.[0] || i}
                />
              );
            })}
          </Fragment>
        ))}
        {/* </AnimatePresence> */}
      </div>
    </div>
  );
}
export default Board;
