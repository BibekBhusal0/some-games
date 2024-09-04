import MemoryCardGame from "@/memory_card/game";
import { useGameContext } from "@/games/provider";
import SelectionTemplate from "@/games/selection_template";
import { difficultyType } from "@/types";
import { useState } from "react";
import DifficultySelector from "@/components/difficulty_selector";
import { MemoryCard } from "@/memory_card/logic";

function PageMemoryCard() {
  const [selecting, setSelecting] = useState(true);
  const [variation, setVariation] = useState<difficultyType>("easy");
  const [game, setGame] = useState(new MemoryCard(variation));

  const {
    state: { history },
  } = useGameContext();
  const variants_history = history["memoryCard"] || {};

  const hasKeys = Object.keys(variants_history).length > 0;
  const firstKey = hasKeys ? Object.keys(variants_history)[0] : undefined;

  const continue_action = () => {
    if (variants_history && firstKey) {
      const history = variants_history[firstKey as difficultyType];
      if (history) {
        game.setState(history);
        setSelecting(false);
      }
    }
  };
  const handleDifficultyChange = (e: difficultyType) => {
    setVariation(e);
    setGame(new MemoryCard(e));
  };

  return (
    <>
      {selecting ? (
        <SelectionTemplate
          select_text="Select Game"
          setSelecting={() => {
            setSelecting(false);
          }}
          continue_action={continue_action}
          continue_variation={firstKey}
          //
        >
          <DifficultySelector
            selectedDifficulty={variation}
            onDifficultyChange={handleDifficultyChange}
          />
        </SelectionTemplate>
      ) : (
        <MemoryCardGame game_={game} />
      )}
    </>
  );
}

export default PageMemoryCard;
