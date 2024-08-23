import { ReactNode, useState } from "react";
import ShinyButton from "@/components/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Carousel from "@/components/carousel";
import { Button } from "@nextui-org/button";

function HTPButton({
  className,
  helper,
}: {
  className?: string;
  helper?: ReactNode[];
}) {
  const [open, setOpen] = useState(false);
  const calculateX = (grid = 1, gaps = 1) => {
    return `calc((${grid / 12} * (100% - 1rem )) + ${0.5 * gaps}rem)`;
  };

  const close_button = (
    <Button color="primary" onPress={() => setOpen(false)} className="text-xl">
      Got it
    </Button>
  );

  return (
    <>
      <ShinyButton
        onClick={() => setOpen(true)}
        className={cn(className, "text-3xl w-full font-semibold")}>
        ?
      </ShinyButton>
      {open && (
        <motion.div
          key="backdrop"
          className="absolute z-20 top-0 left-0 size-full backdrop-blur-sm"
          //
        >
          <motion.div
            key="wrapper"
            className="absolute z-40"
            initial={{
              width: calculateX(2, 0),
              height: "44px",
              top: "76px",
              left: calculateX(4, 1),
            }}
            exit={{
              width: calculateX(2, 0),
              height: "44px",
              top: "76px",
              left: calculateX(4, 1),
            }}
            animate={{
              width: "80%",
              height: "80%",
              top: "10%",
              left: "10%",
            }}
            transition={{ duration: 0.25 }}
            //
          >
            <motion.div
              key="gradient-bg"
              initial={{
                background:
                  "linear-gradient(135deg, #3BC4F2, #7A69F9, #F26378, #F5833F)",
              }}
              animate={{
                background: [
                  "linear-gradient(0deg, #3BC4F2, #7A69F9, #F26378, #F5833F)",
                  "linear-gradient(360deg, #3BC4F2, #7A69F9, #F26378, #F5833F)",
                ],
              }}
              transition={{
                duration: 3,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
              }}
              className="size-full rounded-md p-[3px]"
              //
            >
              <div className="size-full bg-default-200 rounded-inherit">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 0.25,
                    duration: 0.1,
                    ease: "easeInOut",
                  }}
                  className="size-full p-5 relative flex justify-around flex-col">
                  <div className="text-2xl font-slab">
                    {!helper && "Figure Out Yourself"}
                  </div>

                  {helper ? (
                    <Carousel slides={helper} close_button={close_button} />
                  ) : (
                    close_button
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export default HTPButton;
