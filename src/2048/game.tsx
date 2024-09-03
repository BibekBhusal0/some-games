import Board from "@/2048/board";
import { instructions } from "@/2048/instructions";
import { TwentyFortyEight } from "@/2048/logic";
import TerminationDialog from "@/components/termination-dialog";
import { useGameContext } from "@/games/provider";
import ScoreCard from "@/games/score";
import useControls from "@/hooks/use-controls";
import { variants2048Mapping } from "@/types";
import { useEffect, useRef, useState } from "react";

export default function TwentyFortyEightGame({
  game = new TwentyFortyEight(4),
}: {
  game?: TwentyFortyEight;
}) {
  const [board, setBoard] = useState(game.board);
  const n_row = game.size;
  const {
    dispatch,
    state: { high_score },
  } = useGameContext();
  const prevWin = useRef(true);
  const [showWin, setShowWin] = useState(false);

  const game_hs = high_score["2048"]?.[variants2048Mapping[n_row]] ?? 0;

  useEffect(() => {
    if (prevWin.current !== game.win && game.win) {
      setShowWin(true);
    } else {
      setShowWin(false);
    }
    prevWin.current = game.win;
  }, [game, board]);

  const reRender = () => {
    dispatch({
      type: "SET_HISTORY",
      game: "2048",
      variant: variants2048Mapping[n_row],
      history: game.history,
    });

    if (game.score > game_hs) {
      dispatch({
        type: "SET_HIGH_SCORE",
        game: "2048",
        variant: variants2048Mapping[n_row],
        score: game.score,
      });
    }
    setBoard(game.board);
  };

  useControls((direction) => {
    if (game.move(direction)) {
      reRender();
    }
  });
  const reset = () => {
    game.reset_board();
    reRender();
  };

  const undo = () => {
    game.undo();
    reRender();
  };

  return (
    <>
      <ScoreCard
        score={game.score}
        onReset={reset}
        onUndo={undo}
        helper={instructions}
        undo_disabled={game.history.length <= 1}
        best={game_hs}
      />
      <Board board={board} ids={game.id} />
      {showWin && (
        <TerminationDialog
          title="You Win"
          buttons={[
            { onPress: reset, children: "New Game Again" },
            { onPress: undo, children: "Undo" },
          ]}
        />
      )}
      {game.gameOver && (
        <TerminationDialog
          title="Game Over"
          buttons={[
            {
              onPress: reset,
              children: "New Game",
            },
            { onPress: undo, children: "undo" },
          ]}></TerminationDialog>
      )}
    </>
  );
}
