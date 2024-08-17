import { cn } from "@/lib/utils";
import { pages_link } from "@/pages/all_pages";
import { FaArrowRight } from "react-icons/fa";

interface MenuAnimationProps {
  menuItems: string[];
}

export default function MenuAnimation({ menuItems }: MenuAnimationProps) {
  return (
    <div className="flex min-w-fit flex-col gap-2 overflow-hidden px-10">
      {menuItems.map((item, index) => (
        <a
          href={pages_link[item]}
          key={index}
          className="group flex items-center gap-2">
          <FaArrowRight
            className={cn(
              "size-5 -translate-x-full text-black opacity-0",
              "transition-all duration-300 ease-out hover:z-20",
              "group-hover:translate-x-0 group-hover:text-blue-500 group-hover:opacity-100"
            )}
          />
          <h1
            className={cn(
              "z-10 -translate-x-6 cursor-pointer ",
              "font-mono font-semibold text-black transition-transform duration-300 ease-out",
              "group-hover:translate-x-0 group-hover:text-blue-500 dark:text-white text-xl"
            )}>
            {item}
          </h1>
        </a>
      ))}
    </div>
  );
}
