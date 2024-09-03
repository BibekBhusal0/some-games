import { useGameContext } from "@/games/provider";
import SelectionTemplate from "@/games/selection_template";
import SlidingPuzzleGame from "@/sliding_puzzle/game";
import SlidingPuzzle from "@/sliding_puzzle/logic";
import {
  difficulties,
  difficultyType,
  sliding_puzzle_variations_obj,
  sliding_puzzle_variations_str,
  SPvarioationStr2Obj,
} from "@/types";
import { useState } from "react";
import DifficultySelector from "@/components/difficulty_selector";

export default function PageSlidingPuzzle() {
  const [selecting, setSelecting] = useState(true);
  const [variation, setVariation] = useState<sliding_puzzle_variations_obj>({
    type: "image",
    difficulty: "easy",
  });
  const [game, setGame] = useState(new SlidingPuzzle(variation));

  const { state } = useGameContext();
  const variants_history = state.history["slidingPuzzle"] || {};

  const hasKeys = Object.keys(variants_history).length > 0;
  const firstKey = hasKeys ? Object.keys(variants_history)[0] : undefined;
  const label = firstKey
    ? SPvarioationStr2Obj(firstKey as sliding_puzzle_variations_str).difficulty
    : undefined;

  const continue_action = () => {
    if (variants_history && firstKey) {
      const history =
        variants_history[firstKey as sliding_puzzle_variations_str];
      if (history) {
        game.load_history(history);
        setSelecting(false);
      }
    }
  };
  const handleDifficultyChange = (e: difficultyType) => {
    setVariation({ ...variation, difficulty: e });
    setGame(new SlidingPuzzle({ ...variation, difficulty: e }));
  };

  return (
    <>
      {selecting ? (
        <SelectionTemplate
          select_text="Select Game"
          setSelecting={() => {
            game.shuffle();
            setSelecting(false);
          }}
          continue_action={continue_action}
          continue_variation={label}>
          <DifficultySelector
            selectedDifficulty={variation.difficulty}
            labels={difficulties}
            onDifficultyChange={handleDifficultyChange}
          />
        </SelectionTemplate>
      ) : (
        <SlidingPuzzleGame game={game} />
      )}
    </>
  );
}
