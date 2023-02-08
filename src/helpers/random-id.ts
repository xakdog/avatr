import { useState, useEffect } from "react";

const getRandomId = (prefix: string) =>
  `${prefix}${Math.random().toString(36).substring(2, 15)}`;

/**
 * Returns a random string to use as an element id.
 * Value is generated after the first render. This is useful
 * to avoid SSR mismatches.
 */
export const useRandomId = (prefix = "") => {
  const [randomId, setRandomId] = useState("");

  useEffect(() => {
    setRandomId(getRandomId(prefix));
  }, [setRandomId]);

  return randomId;
};
