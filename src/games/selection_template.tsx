import { Button } from "@nextui-org/button";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "@nextui-org/link";
import ShinyButton from "@/components/button";

function SelectionTemplate({
  setSelecting,
  children = undefined,
  select_text = "Select",
  continue_action = undefined,
  continue_variation = undefined,
}: {
  setSelecting: Function;
  children?: React.ReactNode;
  select_text?: string;
  continue_action?: Function;
  continue_variation?: string;
}) {
  return (
    <div className="flex-center  flex-col px-2 gap-3">
      <div className="flex justify-between w-full gap-4 items-center ">
        <Button as={Link} href="/" className="text-xl">
          <FaArrowLeft />
          Back
        </Button>
        <h1 className="text-3xl">{select_text}</h1>
      </div>
      {children}
      <div className="flex justify-around w-full items-center">
        <Button className="text-xl" onPress={() => setSelecting(false)}>
          Select
        </Button>
        {continue_action && continue_variation && (
          <ShinyButton onClick={() => continue_action()} className="text-xl ">
            <div className="px-4 py-2">Continue {continue_variation}</div>
          </ShinyButton>
        )}
      </div>
    </div>
  );
}

export default SelectionTemplate;
