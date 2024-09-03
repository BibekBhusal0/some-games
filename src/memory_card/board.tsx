import FlipCard from "@/components/flip";
import { MemoryCardCardType } from "@/types";
import { MemoryCard } from "./logic";

function Board({
  game,
  onClick = () => {},
}: {
  game: MemoryCard;
  onClick?: (i: number) => void;
}) {
  const { board, images_mapping, images_variant } = game;

  return (
    <div
      style={{
        gridTemplateRows: `repeat(${Math.floor(board.length / 4)}, 1fr)`,
      }}
      className="grid grid-cols-4 w-full h-80">
      {board.map((card, i) => (
        <Card
          key={i}
          card={card}
          onClick={() => onClick(i)}
          back_image={`memory_card/foreground/${images_mapping[card.number]}/${
            images_mapping[card.number]
          }-dynamic-${images_variant}.png`}
          front_image={`memory_card/background/${images_variant}.svg`}
        />
      ))}
    </div>
  );
}

interface CardProps {
  card: MemoryCardCardType;
  onClick?: () => void;
  back_image?: string;
  front_image?: string;
}

function Card({
  card,
  onClick = () => {},
  back_image = undefined,
  front_image = undefined,
}: CardProps) {
  return (
    <div className="size-full text-center" onClick={onClick}>
      <FlipCard
        classNames={{
          front: "bg-red-500 size-full border-2 border-primary-800",
          back: "bg-primary-800 text-secondary-50 text-4xl",
        }}
        front={
          <div
            className="size-full"
            style={{
              backgroundImage: front_image ? `url(${front_image})` : undefined,
              backgroundPosition: "center",
            }}
            //
          ></div>
        }
        back={
          <div
            className="size-full flex-center bg-no-repeat bg-contain"
            style={{
              backgroundImage: back_image ? `url(${back_image})` : undefined,
            }}
            //
          >
            {back_image ? null : card.number}
          </div>
        }
        flipped={card.flipped}
      />
    </div>
  );
}

export default Board;
