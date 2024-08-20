import { directions } from "@/2048/logic";
import { useEffect } from "react";

function useKeyboardControls(
  callback: (direction: directions) => void,
  disabled = false
) {
  useEffect(() => {
    if (!disabled) {
      const handleKeyPress = (event: KeyboardEvent) => {
        const direction = event.key
          .replace("Arrow", "")
          .toLowerCase() as directions;
        if (
          direction === "left" ||
          direction === "right" ||
          direction === "up" ||
          direction === "down"
        ) {
          callback(direction);
        }
      };

      window.addEventListener("keydown", handleKeyPress);

      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [callback, disabled]);
}

export default useKeyboardControls;
