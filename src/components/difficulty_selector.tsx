import { cn } from "@/lib/utils";
import { difficultyType } from "@/types";
import { Radio, RadioGroup } from "@nextui-org/radio";

const DifficultySelector = ({
  labels,
  onDifficultyChange,
  selectedDifficulty,
}: {
  labels: difficultyType[];
  onDifficultyChange: (difficulty: difficultyType) => void;
  selectedDifficulty: difficultyType;
}) => {
  return (
    <RadioGroup
      classNames={{ wrapper: "gap-5" }}
      label="Difficulty"
      orientation="horizontal"
      value={selectedDifficulty}
      onValueChange={(e) => onDifficultyChange(e as difficultyType)}
      //
    >
      {labels.map((label) => (
        <Radio
          key={label}
          classNames={{
            base: cn(
              "group flex-center hover:bg-content2 transition-all",
              "max-w-[300px] cursor-pointer border-2 border-default rounded-lg p-2",
              "data-[selected=true]:border-primary data-[selected=true]:bg-primary-200 data-[selected=true]:bg-opacity-30"
            ),
            wrapper: "hidden",
          }}
          value={label}
          //
        >
          {label}
        </Radio>
      ))}
    </RadioGroup>
  );
};

export default DifficultySelector;
