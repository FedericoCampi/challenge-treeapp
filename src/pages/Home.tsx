import React, { useState } from "react";
import Tree from "../components/Tree";
import { getTreeData, setTreeData } from "../services/localStorageService";
import { Switch } from "@mui/material";

const Home: React.FC = () => {
  const [treeData, setTree] = useState(getTreeData("tree") || { id: "root", name: "Root", children: [] });
  const [editable, setEditable] = useState(false);

  const handleTreeChange = (newValue: any) => {
    setTree(newValue);
    setTreeData("tree", newValue);
  };

  return (
    <div>
      <h1>Tree Page</h1>
      <Switch checked={editable} onChange={() => setEditable(!editable)} />
      <Tree
        title="Tree Example"
        value={treeData}
        onChange={handleTreeChange}
        editable={editable}
      />
    </div>
  );
};

export default Home;