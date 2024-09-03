import { useEffect, useState } from "react";
import { MemoryCard } from "./logic";
import { BsFillLightbulbFill } from "react-icons/bs";
import ScoreCard from "@/games/score";
import Board from "./board";

function MemoryCardGame({ game_ = new MemoryCard() }: { game_?: MemoryCard }) {
  const [game] = useState(game_);
  const [board, setBoard] = useState(game.board);

  const reRender = () => {
    setBoard([...game.board]);
  };

  useEffect(() => {
    if (game.needToHide) {
      setTimeout(() => {
        game.hideUnsolved();
        reRender();
      }, 1000);
    }
  }, [game, board]);
  const handleFlip = (i: number) => {
    game.flip(i);
    reRender();
  };

  return (
    <>
      <ScoreCard
        onReset={() => {
          game.reset();
          reRender();
        }}
        score={game.turns}
        undo_disabled={game.win}
        undo_icon={<BsFillLightbulbFill />}
        undo_text="Hint"
        onUndo={() => {
          console.log("pressed hint");
          game.hint();
          reRender();
        }}
      />
      <Board game={game} onClick={handleFlip} />
    </>
  );
}

export default MemoryCardGame;
