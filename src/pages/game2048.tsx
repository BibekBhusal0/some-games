import Board from "@/2048/board";
import { directions, TwentyFourtyEight } from "@/2048/logic";
import ScoreCard from "@/games/score";
import useControls from "@/hooks/use-controls";
import useSwipe from "@/hooks/use-swipe";
import { useState } from "react";

export default function Game2048() {
  const [game, setGame] = useState(new TwentyFourtyEight(4));
  const [board, setBoard] = useState(game.getBoard());

  const reRender = () => {
    setGame(game);
    setBoard(game.getBoard());
  };

  const handleMove = (key: directions) => {
    if (game.move(key)) {
      reRender();
    }
  };

  useControls((key) => {
    handleMove(key);
  });

  useSwipe((direction) => {
    handleMove(direction as directions);
  });

  return (
    <>
      <ScoreCard
        score={game.score}
        onReset={() => {
          game.reset_board();
          reRender();
        }}
      />
      <Board board={board} />
      <div className="flex-center flex-wrap py-2 gap-2" id="controls"></div>
    </>
  );
}
