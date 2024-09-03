import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ClassValue } from "clsx";

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  flipped?: boolean;
  classNames?: { front?: ClassValue; back?: ClassValue; base?: ClassValue };
}

export default function FlipCard({
  front,
  back,
  flipped = false,
  classNames = undefined,
}: FlipCardProps) {
  const cls =
    " absolute size-full [backface-visibility:hidden] [transform-origin:center] flex-center cursor-pointer";
  return (
    <motion.div
      animate={{ rotateY: flipped ? "180deg" : "0deg" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "[transform-style:preserve-3d] relative perspective-1000 size-full",
        classNames && classNames.base
      )}
      //
    >
      {/* Front */}
      <div id="front" className={cn(cls, classNames && classNames.front)}>
        {front}
      </div>

      {/* Back */}
      <div
        id="back"
        className={cn(
          cls,
          "[transform:rotateY(180deg)]",
          classNames && classNames?.back
        )}
        //
      >
        {back}
      </div>
    </motion.div>
  );
}
