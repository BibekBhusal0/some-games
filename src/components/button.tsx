import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function ShinyButton({
  children,
  className = "",
  onClick = () => {},
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "bg-default-300 relative rounded-full overflow-hidden group active:scale-95 transition-transform",
        className,
        "p-0.5"
      )}>
      <motion.span
        initial={{ top: 0, left: 0 }}
        animate={{
          top: ["50%", "0%", "50%", "100%", "50%"],
          left: ["0%", "50%", "100%", "50%", "0%"],
          // top: ["10%", "0%", "15%", "85%", "90%", "80%", "10%"],
          // left: ["10%", "50%", "85%", "85%", "50%", "0%", "10%"],
        }}
        transition={{
          duration: 3,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
        id="shiny"
        className="absolute size-8 z-10 -translate-x-1/2 -translate-y-1/2 blur-sm group-hover:scale-[3] duration-300 transition-transform transform-gpu">
        <motion.span
          animate={{
            rotate: ["0deg", "360deg"],
          }}
          transition={{
            duration: 3,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
          className="rounded-full size-full transform-gpu block"
          style={{
            background:
              "linear-gradient(135deg, #3BC4F2, #7A69F9, #F26378, #F5833F)",
          }}
        />
      </motion.span>
      <span
        className="relative z-10 rounded-inherit size-full bg-default-100 flex-center"
        //
      >
        <motion.span
          animate={{
            backgroundImage: [
              "linear-gradient(90deg, #3BC4F2, #7A69F9, #F26378, #F5833F)",
              "linear-gradient(90deg, #F5833F,#3BC4F2, #7A69F9, #F26378)",
              "linear-gradient(90deg, #F26378, #F5833F,#3BC4F2, #7A69F9)",
              "linear-gradient(90deg, #7A69F9, #F26378, #F5833F,#3BC4F2)",
              "linear-gradient(90deg, #3BC4F2, #7A69F9, #F26378, #F5833F)",
            ],
          }}
          transition={{
            duration: 1,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
          className="bg-clip-text group-hover:text-transparent text-default-800 tracking-tighter transition-colors transform-gpu duration-500">
          {children}
        </motion.span>
      </span>
    </button>
  );
}
