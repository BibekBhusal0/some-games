import Board from "@/2048/board";
import { instructions } from "@/2048/instructions";
import { TwentyFourtyEight } from "@/2048/logic";
import { useGameContext } from "@/games/provider";
import ScoreCard from "@/games/score";
import useControls from "@/hooks/use-controls";
import { variants2048Mapping } from "@/types";
import { useState } from "react";

export default function Game({
  game_ = new TwentyFourtyEight(4),
}: {
  game_?: TwentyFourtyEight;
}) {
  const [game, setGame] = useState(game_);
  const [board, setBoard] = useState(game.board);
  const n_row = game.size;

  const reRender = () => {
    setGame(game);

    if (game.gameOver) {
      dispatch({ type: "EMPTY_HISTORY", game: "2048" });
    } else {
      dispatch({
        type: "SET_HISTORY",
        game: "2048",
        variant: variants2048Mapping[n_row],
        history: game.history,
      });
    }

    setBoard(game.board);
  };

  useControls((direction) => {
    if (game.move(direction)) {
      reRender();
    }
  });
  const { dispatch } = useGameContext();

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
