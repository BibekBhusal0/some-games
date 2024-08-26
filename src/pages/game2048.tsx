import Board from "@/2048/board";
import Game from "@/2048/game";
import { getEmptyBoard, TwentyFourtyEight } from "@/2048/logic";
import { useGameContext } from "@/games/provider";
import SelectionTemplate from "@/games/selection_template";
import { variants2048 } from "@/types";
import { Slider } from "@nextui-org/slider";
import { useState } from "react";

function Game2048() {
  const [selecting, setSelecting] = useState(true);
  const [n, setN] = useState(4);
  const [game, setGame] = useState(new TwentyFourtyEight(n));
  const emptyBoard = getEmptyBoard(n);

  const { state } = useGameContext();
  const test = state.history["2048"];

  const hasKeys = test !== undefined && Object.keys(test).length > 0;
  const firstKey = hasKeys ? Object.keys(test)[0] : undefined;

  return (
    <>
      {selecting ? (
        <SelectionTemplate
          select_text="Select Size"
          setSelecting={setSelecting}
          continue_action={() => {
            if (test && firstKey) {
              const history = test[firstKey as variants2048];
              if (history) {
                game.load_history(history);
                setSelecting(false);
              }
            }
          }}
          continue_variation={firstKey}>
          <div className="w-10/12">
            <Board board={emptyBoard}></Board>
          </div>
          <Slider
            getValue={(e) => `${e} x ${e}`}
            label="Size"
            classNames={{
              label: "text-xl",
              value: "text-xl",
            }}
            maxValue={6}
            minValue={3}
            value={n}
            onChange={(e) => {
              setN(e as number);
              setGame(new TwentyFourtyEight(e as number));
            }}
          />
        </SelectionTemplate>
      ) : (
        <Game game_={game} />
      )}
    </>
  );
}

export default Game2048;
