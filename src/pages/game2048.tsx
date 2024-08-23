import Board from "@/2048/board";
import { instructions } from "@/2048/instructions";
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
        helper={instructions}
      />
      <Board board={board} ids={game.id} />
    </>
  );
}
