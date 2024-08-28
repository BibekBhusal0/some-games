import { useRadio, RadioProps } from "@nextui-org/radio";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { cn } from "@/lib/utils";

type CustomRadioProps = RadioProps & { cls?: string };
export const CustomRadio = ({ cls = "", ...props }: CustomRadioProps) => {
  const {
    Component,
    children,
    getBaseProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group flex-center hover:bg-content2 transition-all",
        "max-w-[300px] cursor-pointer border-2 border-default rounded-lg p-2",

        "data-[selected=true]:border-primary data-[selected=true]:bg-primary-200 data-[selected=true]:bg-opacity-30"
      )}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>

      <div {...getLabelWrapperProps()}>
        {children && <span {...getLabelProps()}>{children}</span>}
      </div>
    </Component>
  );
};
