import useSwipe from "./use-swipe";
import useKeyboardControls from "./use-kbd";
import { directions } from "@/types";

function useControls(
  callback: (direction: directions) => void,
  disabled = false
) {
  useSwipe(callback, disabled);
  useKeyboardControls(callback, disabled);
}

export default useControls;
