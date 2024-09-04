import { difficultyType, difficulties } from "@/types";
import { Slider } from "@nextui-org/slider";

const DifficultySelector = ({
  onDifficultyChange,
  selectedDifficulty,
}: {
  onDifficultyChange: (difficulty: difficultyType) => void;
  selectedDifficulty: difficultyType;
}) => {
  const handleChange = (e: number | number[]) => {
    onDifficultyChange(difficulties[(e as number) - 1]);
  };

  return (
    <div className="w-full">
      <img
        src={`difficulty/${selectedDifficulty}.svg`}
        className="w-10/12 mx-auto"
      />
      <Slider
        label="Difficulty"
        minValue={1}
        classNames={{ label: "text-xl", value: "text-xl capitalize" }}
        maxValue={3}
        getValue={(e) => difficulties[(e as number) - 1]}
        value={difficulties.indexOf(selectedDifficulty) + 1}
        onChange={handleChange}
      />
    </div>
  );
};

export default DifficultySelector;
