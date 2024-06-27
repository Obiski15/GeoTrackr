import { useEffect, useRef } from "react";

export function useOuterScrollAndClick(handler) {
  const ref = useRef();

  useEffect(() => {
    function handleScrollAndClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    const eventType = ["click", "scroll"];
    eventType.forEach((event) =>
      document.addEventListener(event, handleScrollAndClick, true)
    );
    return () =>
      eventType.forEach((event) =>
        document.addEventListener(event, handleScrollAndClick, true)
      );
  }, [handler]);

  return ref;
}
