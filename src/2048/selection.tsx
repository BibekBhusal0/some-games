import Board from "./board";
import { Slider } from "@nextui-org/slider";
import { getEmptyBoard } from "./logic";
import SelectionTemplate from "@/games/selection_template";
import { useGameContext } from "@/games/provider";

function Selection({
  n,
  setN,
  setSelecting,
}: {
  n: number;
  setN: Function;
  setSelecting: Function;
}) {
  const emptyBoard = getEmptyBoard(n);

  const { state } = useGameContext();

  const test = state.history["2048"];
  const hasKeys = test !== undefined && Object.keys(test).length > 0;
  const firstKey = hasKeys ? Object.keys(test)[0] : undefined;
  console.log(firstKey);
  return (
    <SelectionTemplate
      select_text="Select Size"
      setSelecting={setSelecting}
      continue_action={() => {}}
      continue_text={firstKey}>
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
        onChange={(e) => setN(e)}
      />
    </SelectionTemplate>
  );
}

export default Selection;
