import { cn } from "@/lib/utils";
import { color } from "./colors";
import { motion } from "framer-motion";
// import { CSSProperties } from "react";

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

const tileVariants = {
  initial: { opacity: 0, scale: 0.2, x: 0, y: 0 }, // Add x and y for initial position
  animate: { opacity: 1, scale: 1, x: 0, y: 0, transition: { duration: 0.1 } }, // Ensure animation to final position
};

function Tiles({
  number = undefined,
  rows = 4,
  x = 0,
  y = 0,
}: {
  number?: number;
  rows?: number;
  x?: number;
  y?: number;
}) {
  const common_class = "w-full aspect-square rounded-md";
  const empty = <div className={cn(common_class, "bg-default-200")}></div>;
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
      className={cn(common_class, "flex-center drop-shadow-2xl font-semibold")}
      style={{
        ...tileColor,
        fontSize: getFontSize(number, rows),
        gridRowStart: y + 1,
        gridColumnStart: x + 1,
      }}
      variants={tileVariants}
      initial="initial"
      animate="animate">
      {number}
    </motion.div>
  );
}

export default Tiles;
