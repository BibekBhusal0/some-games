import { cn } from "@/lib/utils";
import { color } from "./colors";
import { motion } from "framer-motion";

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
  number = undefined,
  x,
  y,
  rows = 4,
  prevX = undefined,
  prevY = undefined,
}: {
  number?: number;
  rows?: number;
  x: number;
  y: number;
  prevX?: number;
  prevY?: number;
}) {
  const tileSize = 100 / rows;
  const padding = 8;
  const getCoor = (x: number) => {
    return `calc(${x * tileSize}% + ${padding / 2}px)`;
    // calc(${y * tileSize}% + ${padding / 2}px)`;
  };
  const top = getCoor(y);
  const left = getCoor(x);
  const prevTop = prevY ? getCoor(prevY) : top;
  const prevLeft = prevX ? getCoor(prevX) : left;
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

  return (
    <motion.div
      className={cn(
        common_class,
        "absolute flex-center drop-shadow-2xl font-semibold z-10"
      )}
      style={{
        ...tileColor,
        fontSize: getFontSize(number, rows),
        width,
      }}
      initial={{
        // opacity: 0,
        // scale: 0.3,
        top: prevTop,
        left: prevLeft,
      }}
      animate={{
        top,
        left,
        // opacity: 1,
        // scale: 1,
      }}
      // exit={{ opacity: 0, scale: 0.8 }}
      // transition={{ type: "spring", stiffness: 300, damping: 400 }}
      //
    >
      {number}
    </motion.div>
  );
  {
    empty;
  }
}

export default Tiles;
