import { FaArrowLeft, FaUndo, FaQuestionCircle } from "react-icons/fa";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { cn } from "@/lib/utils";
import { IoIosUndo } from "react-icons/io";
import ShinyButton from "@/components/button";

function ScoreCard() {
  const score_class =
    "col-span-3 row-span-2 flex-col flex-center gap-1 uppercase bg-warning-50 text-lg font-semibold rounded-md";
  const big_button = "col-span-4 h-full flex-center text-md capitalize";
  const small_button = "col-span-2 h-full min-w-6 rounded-md text-md";

  return (
    <div className="w-full grid gap-2 grid-cols-12 grid-rows-2 h-24 mb-3">
      <Button size="sm" id="menu" className={cn(big_button)}>
        <FaArrowLeft />
        <div>menu</div>
      </Button>

      <Tooltip id="reset" content="reset">
        <Button size="sm" className={cn(small_button)}>
          <FaUndo />
        </Button>
      </Tooltip>

      <div id="score" className={score_class}>
        <div>score</div>
        <div>123</div>
      </div>

      <div id="best" className={score_class}>
        <div>best</div>
        <div>123</div>
      </div>

      <Button size="sm" id="undo" className={cn(big_button, "bg-default-400")}>
        <IoIosUndo />
        <div>Undo</div>
      </Button>

      <Tooltip id="help" placement="bottom" content="How to Play">
        <div className={cn(small_button)}>
          <ShinyButton
            className={cn(small_button, "text-2xl w-full font-semibold")}>
            ?
          </ShinyButton>
        </div>
      </Tooltip>
    </div>
  );
}

export default ScoreCard;
