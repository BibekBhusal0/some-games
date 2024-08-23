import { useEffect, useState } from "react";

function getSavedValue<T>(key: string, initialValue: T | (() => T)): T {
  const savedValue = localStorage.getItem(key);
  if (savedValue) {
    try {
      return JSON.parse(savedValue);
    } catch (error) {
      console.error("Error parsing saved value from localStorage:", error);
    }
  }
  return typeof initialValue === "function"
    ? (initialValue as () => T)()
    : initialValue;
}

export default function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T)
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => getSavedValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
