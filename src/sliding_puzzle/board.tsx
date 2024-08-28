import { cn } from "@/lib/utils";
import { sliding_puzzle_type } from "@/types";

import { useAutoAnimate } from "@formkit/auto-animate/react";

function Board({
  board,
  size,
  imageUrl = undefined,
  animate = true,
}: {
  board: sliding_puzzle_type;
  size: number;
  imageUrl?: string;
  animate?: boolean;
}) {
  const cellSize = 100 / size;
  const [animationParent, enableAnimations] = useAutoAnimate({
    duration: 100,
    easing: "ease-in-out",
  });
  enableAnimations(animate);
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
            "bg-success-700 text-secondary-100  cursor-pointer relative":
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
                  : "w-full flex-center text-4xl font-bold"
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
