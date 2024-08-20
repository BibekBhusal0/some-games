import Board from "@/2048/board";
import { TwentyFourtyEight } from "@/2048/logic";
import ScoreCard from "@/games/score";
import useControls from "@/hooks/use-controls";
import { useState } from "react";

export default function Game2048() {
  const [game, setGame] = useState(new TwentyFourtyEight(4));
  const [board, setBoard] = useState(game.board);

  const reRender = () => {
    setGame(game);
    setBoard(game.board);
  };

  useControls((direction) => {
    if (game.move(direction)) {
      reRender();
    }
  });

  return (
    <>
      <ScoreCard
        score={game.score}
        onReset={() => {
          game.reset_board();
          reRender();
        }}
        onUndo={() => {
          game.undo();
          reRender();
        }}
      />
      <Board
        board={board}
        ids={game.id}
        position={game.idMap}
        prevPosition={
          game.history.length > 1
            ? game.history[game.history.length - 2].idMap
            : undefined
        }
      />
    </>
  );
}
