import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@nextui-org/button";
import { motion } from "framer-motion";

function TerminationDialog({
  children = undefined,
  title,
  buttons = undefined,
  className = "",
  delay = 0,
}: {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  buttons?: ButtonProps[];
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ scale: 0.3, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, transition: { duration: 0.2, delay } }}
      className={cn(
        "w-[80%] aspect-square absolute top-[30%] left-[10%] flex-center gap-5 flex-col p-2 ",
        "bg-yellow-400 text-gray-800 bg-opacity-80 text-xl z-10 rounded-md",
        className
      )}
      //
    >
      {title && <h1 className="text-4xl pb-5 font-semibold">{title}</h1>}
      {children}
      {buttons &&
        buttons.map((button_prop, i) => (
          <Button
            key={i}
            size="lg"
            color="primary"
            className="text-2xl"
            {...button_prop}
          />
        ))}
    </motion.div>
  );
}

export default TerminationDialog;
