"use client";

import { useSyncExternalStore, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const getSnapshot = () => {
    if (typeof window === "undefined") return JSON.stringify(initialValue);
    const value = window.localStorage.getItem(key);
    return value !== null ? value : JSON.stringify(initialValue);
  };

  const subscribe = (callback: () => void) => {
    window.addEventListener("storage", callback);
    window.addEventListener("local-storage", callback);
    return () => {
      window.removeEventListener("storage", callback);
      window.removeEventListener("local-storage", callback);
    };
  };

  const getServerSnapshot = () => {
    return JSON.stringify(initialValue);
  };

  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const currentRaw = window.localStorage.getItem(key);
        const current = currentRaw !== null ? (JSON.parse(currentRaw) as T) : initialValue;
        const valueToStore = value instanceof Function ? value(current) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        window.dispatchEvent(new Event("local-storage"));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, initialValue]
  );

  let parsedValue: T;
  try {
    parsedValue = JSON.parse(store) as T;
  } catch {
    parsedValue = initialValue;
  }

  return [parsedValue, setValue] as const;
}
