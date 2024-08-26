import Board from "@/sliding_puzzle/board";
import ScoreCard from "@/games/score";
import { useEffect, useState } from "react";
import SlidingPuzzle from "@/sliding_puzzle/logic";
import useControls from "@/hooks/use-controls";

const imageUrl = "/sliding_puzzle/bird.jpg";

function Puzzle() {
  const [game, setGame] = useState(new SlidingPuzzle(3));
  const [board, setBoard] = useState(game.board);

  useEffect(() => {
    if (game.win) {
      console.log("you win");
    }
  }, [game.win]);

  const reRender = () => {
    setGame(game);
    const b = [...game.board];
    setBoard(b);
  };
  useControls((key) => {
    if (game.move(key)) {
      reRender();
    }
  }, game.win);

  return (
    <div className="flex flex-col">
      <ScoreCard
        score={game.moves}
        score_title="Moves"
        best_title="Fastest"
        onUndo={() => {
          game.undo();
          reRender();
        }}
        onReset={() => {
          game.reset();
          reRender();
        }}
      />
      <Board size={game.size} board={board} imageUrl={imageUrl} />
    </div>
  );
}

export default Puzzle;
