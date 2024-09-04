import { useGameContext } from "@/games/provider";
import SelectionTemplate from "@/games/selection_template";
import SlidingPuzzleGame from "@/sliding_puzzle/game";
import SlidingPuzzle from "@/sliding_puzzle/logic";
import {
  difficultyType,
  sliding_puzzle_types,
  sliding_puzzle_variations_obj,
  sliding_puzzle_variations_str,
  SPvarioationStr2Obj,
} from "@/types";
import { useState } from "react";
import DifficultySelector from "@/components/difficulty_selector";
import { CustomSwitch } from "@/components/custom-switch";
import { FaImage } from "react-icons/fa6";
import { GoNumber } from "react-icons/go";

type switches = "image" | "number";

export const variationSwitchMap: Record<
  sliding_puzzle_types,
  Record<switches, boolean>
> = {
  image: { image: true, number: false },
  number: { image: false, number: true },
  image_number: { image: true, number: true },
};

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
  const handleVariantChange = (type: switches) => {
    if (type !== variation.type) {
      var new_type: sliding_puzzle_types = "image_number";
      if (variation.type === "image_number") {
        if (type === "number") {
          new_type = "image";
        } else new_type = "number";
      }
      setVariation({ ...variation, type: new_type });
      setGame(new SlidingPuzzle({ ...variation, type: new_type }));
    }
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
          <div className="w-9/12 mx-auto">
            <DifficultySelector
              selectedDifficulty={variation.difficulty}
              onDifficultyChange={handleDifficultyChange}
            />
          </div>
          <div className="flex-center gap-4 w-full py-3">
            <CustomSwitch
              onValueChange={() => {
                handleVariantChange("image");
              }}
              isSelected={variationSwitchMap[variation.type].image}
              isDisabled={variation.type === "image"}
              //
            >
              <FaImage />
            </CustomSwitch>
            <CustomSwitch
              onValueChange={() => {
                handleVariantChange("number");
              }}
              isSelected={variationSwitchMap[variation.type].number}
              isDisabled={variation.type === "number"}
              //
            >
              <GoNumber />
            </CustomSwitch>
          </div>
        </SelectionTemplate>
      ) : (
        <SlidingPuzzleGame game={game} />
      )}
    </>
  );
}
