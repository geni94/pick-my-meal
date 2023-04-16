import { useEffect } from "react";

export const useOnClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  const listener = (event: MouseEvent | TouchEvent) => {
    const el = ref?.current;
    if (!el || el.contains(event.target as Node)) {
      return;
    }
    handler(event);
  };

  useEffect(() => {
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
