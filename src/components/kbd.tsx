import { directions } from "@/types";
import { cn } from "@/lib/utils";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
} from "react-icons/fa";

interface kbdProps {
  children: React.ReactNode;
  onClick?: () => void;
  controlled?: boolean;
  active?: boolean;
}

export default function Kbd3d({
  children,
  controlled = false,
  active = false,
  onClick = () => {},
}: kbdProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "border border-neutral-500/50 bg-neutral-300 outline-none rounded-[16px]",
        "shadow-[-10px_0px_15px_rgba(255,255,255,1),3px_10px_12.5px_rgba(0,0,0,0.1)] transition-all transform-gpu duration-150 cursor-pointer",
        " dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-[-10px_0px_15px_rgba(0,0,0,0.3),3px_10px_12.5px_rgba(255,255,255,0.05)]",
        {
          "active:shadow-none": !controlled,
          "shadow-none": controlled && active,
        }
      )}>
      <span
        className={cn(
          "text-default-700 bg-default-100 py-1 px-3 block size-full rounded-[15px]",
          " shadow-[inset_0px_2px_4px_rgba(255,255,255,0.8)] transition-all transform-gpu duration-150",
          "  dark:shadow-[inset_0px_2px_4px_rgba(255,255,255,0.05)]  -translate-y-1 z-10 ",
          {
            "active:shadow-transparent active:translate-y-0": !controlled,
            "shadow-transparent translate-y-0": controlled && active,
          }
        )}>
        <span className="block ">{children}</span>
      </span>
    </div>
  );
}

export function ControlsKeys({
  active = [],
  className = "",
}: {
  active?: directions[];
  className?: string;
}) {
  const keysMapping = {
    up: { icon: <FaArrowUp />, cls: "col-start-2 row-start-1" },
    left: { icon: <FaArrowLeft />, cls: "col-start-1 row-start-2" },
    down: { icon: <FaArrowDown />, cls: "col-start-2 row-start-2" },
    right: { icon: <FaArrowRight />, cls: "col-start-3 row-start-2" },
  };
  return (
    <div className={cn("grid grid-cols-3  grid-rows-2 gap-1", className)}>
      {Object.entries(keysMapping).map(([key, { icon, cls }]) => (
        <div key={key} className={cn(cls, "text-center")}>
          <Kbd3d
            key={key}
            controlled
            active={active.includes(key as directions)}>
            {icon}
          </Kbd3d>
        </div>
      ))}
    </div>
  );
}
