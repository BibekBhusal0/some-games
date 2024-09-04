import { useState } from "react";
import SlidingPuzzle from "./logic";
import Board from "./board";
import ScoreCard from "@/games/score";
import useControls from "@/hooks/use-controls";
import { SlidingPuzzleGameProps, SPvarioationObj2Str } from "@/types";
import { useGameContext } from "@/games/provider";
import TerminationDialog from "@/components/termination-dialog";
import { variationSwitchMap } from "@/pages/sliding_puzzle";

const imageURL = "sliding_puzzle/bird.jpg";

export default function SlidingPuzzleGame({
  game = new SlidingPuzzle(),
}: SlidingPuzzleGameProps) {
  const [board, setBoard] = useState(game.board);
  const {
    dispatch,
    state: { high_score },
  } = useGameContext();
  const crrVariant = SPvarioationObj2Str(game.variant);
  const fastest = high_score["slidingPuzzle"]?.[crrVariant] ?? Infinity;
  const whatToShow = variationSwitchMap[game.variant.type];

  const reRender = () => {
    if (game.win) {
      if (game.moves < fastest) {
        dispatch({
          type: "SET_HIGH_SCORE",
          game: "slidingPuzzle",
          variant: crrVariant,
          score: game.moves,
        });
      }
      dispatch({ type: "EMPTY_HISTORY", game: "slidingPuzzle" });
    } else {
      dispatch({
        type: "SET_HISTORY",
        game: "slidingPuzzle",
        variant: crrVariant,
        history: game.history,
      });
    }
    setBoard([...game.board]);
  };

  useControls((key) => {
    if (game.move(key)) {
      reRender();
    }
  }, game.win);

  if (game.win) {
    console.log("you win");
  }
  const reset = () => {
    game.reset();
    reRender();
  };

  return (
    <div className="flex flex-col relative">
      <ScoreCard
        score={game.moves}
        score_title="Moves"
        best_title="Fastest"
        undo_disabled={game.win || game.history.length <= 1}
        best={fastest === Infinity ? 0 : fastest}
        onUndo={() => {
          if (!game.win) {
            game.undo();
            reRender();
          }
        }}
        onReset={reset}
      />
      <Board
        imageUrl={whatToShow.image ? imageURL : undefined}
        showNumbers={whatToShow.number ? true : false}
        size={game.size}
        board={board}
      />
      {game.win && (
        <TerminationDialog
          title="You Win"
          buttons={[{ onPress: reset, children: "Play Again" }]}
          delay={0.1}
        />
      )}
    </div>
  );
}
