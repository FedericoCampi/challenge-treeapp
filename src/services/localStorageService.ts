import { TreeNodeType } from "../types/types";

export const getTreeData = (key: string): TreeNodeType => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };
  
  export const setTreeData = (key: string, value: TreeNodeType): void => {
    localStorage.setItem(key, JSON.stringify(value));
  };