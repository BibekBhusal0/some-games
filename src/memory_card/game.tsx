import { useEffect, useState } from "react";
import { MemoryCard } from "./logic";
import { BsFillLightbulbFill } from "react-icons/bs";
import ScoreCard from "@/games/score";
import Board from "./board";
import { useGameContext } from "@/games/provider";
import TerminationDialog from "@/components/termination-dialog";

function MemoryCardGame({ game_ = new MemoryCard() }: { game_?: MemoryCard }) {
  const [game] = useState(game_);
  const [board, setBoard] = useState(game.board);

  const {
    dispatch,
    state: { high_score },
  } = useGameContext();

  const fastest = high_score["memoryCard"]?.[game.difficulty] ?? Infinity;

  const reRender = () => {
    if (game.win) {
      if (game.turns < fastest) {
        dispatch({
          type: "SET_HIGH_SCORE",
          game: "memoryCard",
          variant: game.difficulty,
          score: game.turns,
        });
      }
      dispatch({ type: "EMPTY_HISTORY", game: "memoryCard" });
    } else {
      dispatch({
        type: "SET_HISTORY",
        game: "memoryCard",
        variant: game.difficulty,
        history: game.getState(),
      });
    }
    setBoard([...game.board]);
  };
  const reset = () => {
    game.reset();
    reRender();
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
        onReset={reset}
        score_title="Turns"
        best={fastest === Infinity ? 0 : fastest}
        best_title="Fastest"
        score={game.turns}
        undo_disabled={game.win}
        undo_icon={<BsFillLightbulbFill />}
        undo_text="Hint"
        onUndo={() => {
          game.hint();
          reRender();
        }}
      />
      <Board game={game} onClick={handleFlip} />
      {game.win && (
        <TerminationDialog
          delay={0.5}
          title="You Win"
          buttons={[{ onPress: reset, children: "Play Again" }]}
        />
      )}
    </>
  );
}

export default MemoryCardGame;
