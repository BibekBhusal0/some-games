import { board2048Type } from "@/types";
import Tiles from "./tiles";
import { getEmptyBoard } from "./logic";

function flattenBoard(board: board2048Type, ids?: board2048Type) {
  const flatBoard = [];
  const n_row = board[0].length;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < n_row; j++) {
      const cell = board[i][j];
      const id = ids?.[i]?.[j];
      var cell_id = id === undefined || id === 0 ? `${i}-${j}` : id;
      flatBoard.push({
        // id: id ?? `${i}-${j}`,
        id: cell_id,
        number: cell,
        x: j,
        y: i,
      });
    }
  }

  return flatBoard;
}

function Board({
  board = getEmptyBoard(4),
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
