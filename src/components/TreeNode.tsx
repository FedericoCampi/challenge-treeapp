import React, { useEffect, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { Add, Delete, ExpandLess, ExpandMore } from "@mui/icons-material";
import { TreeNodeProps, TreeNodeType } from "../types/types";

const TreeNode: React.FC<TreeNodeProps> = ({ node, editable, onAdd, onDelete, expandAll }) => {

  const [isExpanded, setIsExpanded] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newNodeName, setNewNodeName] = useState("");

  const handleAdd = () => {

    // Verifica que el nombre del nodo no esté vacío o solo contenga espacios.
    if (newNodeName.trim()) {

      // Llama a la función `onAdd` pasando el ID del nodo actual y el nombre del nuevo nodo.
      onAdd(node.id, newNodeName);

      setNewNodeName("");

      // Cierra el formulario de adición.
      setIsAdding(false);
    }
  };

  useEffect(() => {
    setIsExpanded(expandAll);
  }, [expandAll]);

  return (
    <li>
      <div>
        {node.children && node.id !== "root" && (
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )}
        {node.name}
        {editable && (
          <>
            <IconButton onClick={() => setIsAdding(!isAdding)} aria-label="Add">
              <Add />
            </IconButton>
            {node.id !== "root" && (
              <IconButton onClick={() => onDelete(node.id)} aria-label="Delete">
                <Delete />
              </IconButton>
            )}
          </>
        )}
      </div>
      {isAdding && (
        <div>
          <TextField
            value={newNodeName}
            onChange={(e) => setNewNodeName(e.target.value)}
            size="small"
          />
          <button onClick={handleAdd}>Agregar</button>
          <button onClick={() => setIsAdding(false)}>Cancel</button>
        </div>
      )}
      {(node.id === "root" || isExpanded) && node.children && (
        <ul>
          {node.children.map((child: TreeNodeType) => (
            <TreeNode
              key={child.id}
              node={child}
              editable={editable}
              onAdd={onAdd}
              onDelete={onDelete}
              expandAll={expandAll}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;