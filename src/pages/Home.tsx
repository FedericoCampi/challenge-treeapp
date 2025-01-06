import React, { useState } from "react";
import Tree from "../components/Tree";
import { getTreeData, setTreeData } from "../services/localStorageService";
import { Switch } from "@mui/material";
import { TreeNodeType } from "../types/types";

const Home: React.FC = () => {
  const [treeData, setTree] = useState<TreeNodeType>(
    getTreeData("tree") || { id: "root", name: "Root", children: [] }
  );
  const [editable, setEditable] = useState(false);

  const handleTreeChange = (newValue: TreeNodeType) => {
    setTree(newValue);
    setTreeData("tree", newValue);
  };

  return (
    <div>
      <h1>Tree Page</h1>
      <div className="divSwitch">
        <p>Editar</p>
        <Switch checked={editable} onChange={() => setEditable(!editable)} />
        
      </div>
      

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