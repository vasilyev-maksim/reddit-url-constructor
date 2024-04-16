import { useEffect, useState } from "react";

export interface IMemoryStore {
  items: string[];
  saveItem: (val: string) => void;
  deleteItem: (val: string) => void;
}

export function useMemory(
  key: string,
  defaultValue: string[] = []
): IMemoryStore {
  let persistedMemory = defaultValue;

  try {
    persistedMemory = JSON.parse(localStorage.getItem(key) || "");
  } catch (error) {
    /* empty */
  }

  const [items, setItems] = useState<string[]>(persistedMemory);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(items));
  }, [items, key]);

  return {
    items,
    saveItem: (val: string): void => {
      setItems((x) => (x ? [...x, val] : [val]));
    },
    deleteItem: (val: string): void => {
      setItems((x) => x.filter((y) => y !== val));
    },
  };
}
