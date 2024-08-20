import { directions } from "@/2048/logic";
import useSwipe from "./use-swipe";
import useKeyboardControls from "./use-kbd";

function useControls(
  callback: (direction: directions) => void,
  disabled = false
) {
  useSwipe(callback, disabled);
  useKeyboardControls(callback, disabled);
}

export default useControls;
