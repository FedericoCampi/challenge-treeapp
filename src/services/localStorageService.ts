export const getTreeData = (key: string): any => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };
  
  export const setTreeData = (key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value));
  };