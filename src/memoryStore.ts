import { useEffect, useState } from "react";

export interface IMemoryStore {
  items: string[];
  saveItem: (val: string) => void;
  deleteItem: (val: string) => void;
}

export function useMemory(key: string): IMemoryStore {
  let persistedMemory;

  try {
    persistedMemory = JSON.parse(localStorage.getItem(key) || "");
  } catch (error) {
    persistedMemory = [];
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
