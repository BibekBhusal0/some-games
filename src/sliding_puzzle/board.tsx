import { cn } from "@/lib/utils";
import { sliding_puzzle_type } from "./logic";

import { useAutoAnimate } from "@formkit/auto-animate/react";

function Board({
  board,
  size,
  imageUrl = undefined,
}: {
  board: sliding_puzzle_type;
  size: number;
  imageUrl?: string;
}) {
  const cellSize = 100 / size;
  const [animationParent] = useAutoAnimate({
    duration: 100,
    easing: "ease-in-out",
  });
  return (
    <div
      ref={animationParent}
      className={cn("grid", { "gap-1": !imageUrl })}
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      //
    >
      {board.map((cell) => (
        <div
          className={cn("w-full aspect-square flex-center text-center", {
            "bg-danger-700 text-success-200  cursor-pointer relative":
              cell !== 0,
          })}
          style={
            imageUrl && cell !== 0
              ? {
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: `${size * (100 / size + 100)}% ${size * (100 / size + 100)}%`,
                  backgroundPosition: `${((cell - 1) % size) * cellSize}% ${Math.floor((cell - 1) / size) * cellSize}%`,
                  backgroundRepeat: "no-repeat",
                }
              : undefined
          }
          key={cell}
          //
        >
          {cell === 0 ? (
            ""
          ) : (
            <div
              className={cn(
                "top-0 left-0 absolute aspect-square",
                imageUrl
                  ? "bg-danger-900 rounded-full text-md font-semibold mt-1 ml-2 w-6"
                  : "w-full flex-center text-4xl "
              )}>
              {cell}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Board;
