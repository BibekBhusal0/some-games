import { cn } from "@/lib/utils";
import { color } from "./colors";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

function getFontSize(number: number, rows: number): string {
  const fontSizeMap: { [key: number]: string } = {
    1: "2.2rem",
    2: "2rem",
    3: "1.8rem",
    4: "1.5rem",
    5: "1.3rem",
    6: "1rem",
    7: "0.8rem",
    8: "0.75rem",
    9: "0.72rem",
    10: "0.65rem",
    11: "0.61rem",
  };

  const length = number.toString().length;
  const baseSize = fontSizeMap[length] || "0.5rem";
  const rowFactor = Math.max(rows / 4, 1);
  return `calc(${baseSize} / ${rowFactor})`;
}

function Tiles({
  number = 0,
  x,
  y,
  rows = 4,
}: {
  number: number;
  rows?: number;
  x: number;
  y: number;
}) {
  const tileSize = 100 / rows;
  const padding = 8;
  const getCoor = (x: number) => {
    return `calc(${x * tileSize}% + ${padding / 2}px)`;
  };
  const top = getCoor(y);
  const left = getCoor(x);

  const prevState = useRef<{ n: number; top?: string }>({
    n: 0,
    top: undefined,
  });
  useEffect(() => {
    if (prevState.current.n !== number && number !== 0) {
      prevState.current.n = number;
    }
    prevState.current.top = top;
  }, [number, top, prevState]);

  const merged =
    number !== 0 && prevState.current.n !== 0 && number !== prevState.current.n;
  const prevTop = prevState.current.top;
  const width = `calc(${tileSize}% - ${padding}px)`;

  const common_class = "absolute aspect-square rounded-md";
  const empty = (
    <div
      className={cn(common_class, "bg-default-200 z-0")}
      style={{ top, left, width }}></div>
  );

  if (!number) {
    return empty;
  }

  const threshold = 4194304;
  var tileColor = color[number];
  if (!tileColor) {
    tileColor = color[threshold];
  }
  const isNewTile = prevTop === undefined && x;

  return (
    <>
      <motion.div
        className={cn(common_class, "absolute flex-center font-semibold z-10")}
        style={{
          ...tileColor,
          fontSize: getFontSize(number, rows),
          width,
          top,
          left,
        }}
        initial={{
          scale: isNewTile ? 0 : 1,
        }}
        animate={{
          top,
          left,
          scale: merged ? [1.2, 1] : 1,
        }}
        exit={{ opacity: 0, scale: 1.2, transition: { delay: 0.1 } }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          duration: 0.2,
          delay: isNewTile ? 0.1 : 0,
        }}
        //
      >
        {number}
      </motion.div>
      {empty}
    </>
  );
}

export default Tiles;
