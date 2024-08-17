import { cn } from "@/lib/utils";
import { color } from "./colors";

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
  rows = 4,
}: {
  number?: number;
  rows?: number;
}) {
  const common_class = "w-full aspect-square rounded-md";
  const empty = <div className={cn(common_class, "bg-default-100")}></div>;
  if (!number) {
    return empty;
  }
  const threshold = 4194304;
  var tileColor = color[number];
  if (!tileColor) {
    if (number <= threshold) {
      return empty;
    } else tileColor = color[threshold];
  }
  return (
    <div
      className={cn(common_class, "flex-center drop-shadow-2xl font-semibold")}
      style={{
        ...tileColor,
        fontSize: getFontSize(number, rows),
      }}>
      {number}
    </div>
  );
}

export default Tiles;
