import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@nextui-org/button";

function TerminationDialog({
  children = undefined,
  title,
  buttons = undefined,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  buttons?: ButtonProps[];
}) {
  return (
    <div
      className={cn(
        "w-[80%] aspect-square absolute top-[30%] left-[10%] flex-center gap-5 flex-col p-2 ",
        "bg-yellow-400 text-gray-800 bg-opacity-80 text-xl z-10",
        className
      )}>
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
    </div>
  );
}

export default TerminationDialog;
