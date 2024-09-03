import FlipCard from "@/components/flip";
import { difficultyType, MemoryCardCardType } from "@/types";
import { MemoryCard } from "./logic";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function Board({
  game,
  onClick = () => {},
}: {
  game: MemoryCard;
  onClick?: (i: number) => void;
}) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (game.turns === 0) {
      setHide(true);
      setTimeout(() => {
        setHide(false);
      }, 600);
    }
  }, [game]);

  const { board, images_mapping, images_variant } = game;

  return (
    <div
      className={cn(
        ["grid h-[360px] w-full px-3  gap-y-2"],
        game.difficulty === "hard"
          ? "grid-cols-5 gap-x-2"
          : "grid-cols-4 gap-x-4"
      )}>
      {board.map((card, i) => (
        <Card
          key={i}
          card={card}
          onClick={() => onClick(i)}
          difficulty={game.difficulty}
          hidden_image={
            hide
              ? "#"
              : `memory_card/foreground/${images_mapping[card.number]}/${images_variant}.png`
          }
        />
      ))}
    </div>
  );
}

interface CardProps {
  card: MemoryCardCardType;
  onClick?: () => void;
  hidden_image?: string;
  difficulty?: difficultyType;
}

function Card({
  card,
  onClick = () => {},
  hidden_image = undefined,
  difficulty = "easy",
}: CardProps) {
  const color = "#2563eb";
  var size = 13;
  var border = "border-5";
  if (difficulty === "medium") {
    size = 11;
    border = "border-4";
  } else if (difficulty === "hard") {
    size = 10;
    border = "border-3";
  }

  return (
    <div className="size-full text-center" onClick={onClick}>
      <FlipCard
        classNames={{
          front: cn("bg-blue-500 border-green-500 rounded-md border-2", border),
          back: cn(
            "bg-blue-300 border-green-500 text-secondary-50 text-4xl rounded-md",
            border
          ),
        }}
        front={
          <div
            className="size-full bg-"
            style={{
              background: `linear-gradient(135deg, ${color} 25%, transparent 25%) -${size}px 0,
              linear-gradient(225deg, ${color} 25%, transparent 25%) -${size}px 0,
              linear-gradient(315deg, ${color} 25%, transparent 25%),
              linear-gradient(45deg, ${color} 25%, transparent 25%)`,
              backgroundSize: `calc(2 * ${size}px) calc(2 * ${size}px)`,
            }}></div>
        }
        back={
          <div
            className="size-full flex-center bg-no-repeat bg-center bg-contain"
            style={{
              backgroundImage: hidden_image
                ? `url(${hidden_image})`
                : undefined,
            }}>
            {hidden_image ? null : card.number}
          </div>
        }
        flipped={card.flipped}
      />
    </div>
  );
}

export default Board;
