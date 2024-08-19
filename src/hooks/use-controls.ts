import { directions } from "@/2048/logic";
import { useEffect } from "react";

function useControls(callback: (direction: directions) => void) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const direction = event.key
        .replace("Arrow", "")
        .toLowerCase() as directions;
      callback(direction);
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [callback]);
}

export default useControls;
