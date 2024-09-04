import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@nextui-org/switch";
import { motion } from "framer-motion";

type CustomSwitchProps = SwitchProps & {
  children?: React.ReactNode;
};

export const CustomSwitch = ({ children, ...props }: CustomSwitchProps) => {
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch(props);

  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              "w-12 text-2xl h-12 relative",
              "flex items-center justify-center",
              "rounded-lg bg-default-100 hover:bg-default-200",
            ],
          })}>
          <svg
            viewBox="0 0 100 100"
            strokeWidth={10}
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full absolute text-danger">
            <motion.line
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isSelected ? 0 : 1 }}
              x1="0"
              y1="0"
              x2="100"
              y2="100"
              stroke="currentColor"
            />
          </svg>
          {children}
        </div>
      </Component>
    </div>
  );
};
