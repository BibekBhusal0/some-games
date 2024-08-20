import { directions } from "@/2048/logic";
import { useEffect } from "react";

function useSwipe(callback: (direction: directions) => void, disabled = false) {
  useEffect(() => {
    if (!disabled) {
      let startX: number, startY: number;

      const handleStart = (clientX: number, clientY: number) => {
        startX = clientX;
        startY = clientY;
      };

      const handleEnd = (clientX: number, clientY: number) => {
        const endX = clientX;
        const endY = clientY;

        const diffX = endX - startX;
        const diffY = endY - startY;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
          callback(diffX > 0 ? "right" : "left");
        }
        if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 30) {
          callback(diffY > 0 ? "down" : "up");
        }
      };

      const handleTouchStart = (event: TouchEvent) => {
        const touch = event.touches[0];
        handleStart(touch.clientX, touch.clientY);
      };

      const handleTouchEnd = (event: TouchEvent) => {
        const touch = event.changedTouches[0];
        handleEnd(touch.clientX, touch.clientY);
      };

      const handleMouseDown = (event: MouseEvent) => {
        event.preventDefault();
        handleStart(event.clientX, event.clientY);
      };

      const handleMouseUp = (event: MouseEvent) => {
        event.preventDefault();
        handleEnd(event.clientX, event.clientY);
      };

      window.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("touchend", handleTouchEnd);
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchend", handleTouchEnd);
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [callback, disabled]);
}

export default useSwipe;
