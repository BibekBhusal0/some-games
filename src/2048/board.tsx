import { board2048Type } from "@/types";
import Tiles from "./tiles";

const empty4x4 = [
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
];

function flattenBoard(board: board2048Type, ids?: board2048Type) {
  const flatBoard = [];
  const n_row = board[0].length;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < n_row; j++) {
      const cell = board[i][j];
      const id = ids?.[i]?.[j];

      flatBoard.push({
        id: id ?? `${i}-${j}`,
        number: cell,
        x: j,
        y: i,
      });
    }
  }

  return flatBoard;
}

function Board({
  board = empty4x4,
  ids,
}: {
  board?: board2048Type;
  ids?: board2048Type;
}) {
  const rows = board[0].length;
  const flatBoard = flattenBoard(board, ids);

  return (
    <div className="w-full aspect-square bg-default-300 rounded-md p-2">
      <div className="relative size-full ">
        {flatBoard.map(({ id, number, x, y }) => (
          <Tiles key={id} number={number} rows={rows} x={x} y={y} />
        ))}
      </div>
    </div>
  );
}

export default Board;
