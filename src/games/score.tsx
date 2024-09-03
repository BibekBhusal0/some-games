import { FaArrowLeft, FaUndo } from "react-icons/fa";
import { Tooltip } from "@nextui-org/tooltip";
import { cn } from "@/lib/utils";
import { IoIosUndo } from "react-icons/io";
import { Link } from "@nextui-org/link";
import { ReactNode } from "react";
import { Button } from "@nextui-org/button";
import HTPButton from "./how_to_play";

export interface ScoreCardProps {
  score?: number;
  best?: number;

  score_title?: string;
  best_title?: string;

  onReset?: () => void;
  onUndo?: () => void;
  undo_disabled?: boolean;
  undo_text?: string;
  undo_icon?: ReactNode;

  helper?: ReactNode[];
}

function ScoreCard({
  score = 0,
  best = 0,
  onReset = () => {},
  onUndo = () => {},
  undo_disabled = false,
  undo_text = "Undo",
  undo_icon = <IoIosUndo />,
  score_title = "score",
  best_title = "best",
  helper = undefined,
}: ScoreCardProps) {
  const score_class =
    "col-span-3 row-span-2 flex-col flex-center gap-1 uppercase bg-warning-50 text-lg font-semibold rounded-md";
  const big_button = "col-span-4 h-full flex-center text-lg capitalize";
  const small_button = "col-span-2 h-full min-w-6 rounded-md text-xl";

  return (
    <div className="w-full grid gap-2 grid-cols-12 grid-rows-2 h-24 mb-3">
      <Button size="sm" id="menu" href="/" as={Link} className={cn(big_button)}>
        <FaArrowLeft />
        <div>menu</div>
      </Button>

      <Tooltip id="reset" content="reset">
        <Button onPress={onReset} size="sm" className={cn(small_button)}>
          <FaUndo />
        </Button>
      </Tooltip>

      <div id="score" className={score_class}>
        <div>{score_title}</div>
        <div>{score}</div>
      </div>

      <div id="best" className={score_class}>
        <div>{best_title}</div>
        <div>{best}</div>
      </div>

      <Button
        onPress={onUndo}
        size="sm"
        id="undo"
        isDisabled={undo_disabled}
        className={cn(big_button, "bg-default-400")}>
        {undo_icon}
        <div>{undo_text}</div>
      </Button>

      <Tooltip id="help" placement="bottom" content="How to Play">
        <div className={cn(small_button)}>
          <HTPButton helper={helper} className={small_button} />
        </div>
      </Tooltip>
    </div>
  );
}

export default ScoreCard;
