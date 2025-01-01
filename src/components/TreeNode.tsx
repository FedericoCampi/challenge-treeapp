import React, { useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { Add, Delete, ExpandLess, ExpandMore } from "@mui/icons-material";

interface TreeNodeProps {
  node: any;
  editable: boolean;
  onAdd: (parentId: string, name: string) => void;
  onDelete: (id: string) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, editable, onAdd, onDelete }) => {

  const [isExpanded, setIsExpanded] = useState(true); 
  const [isAdding, setIsAdding] = useState(false); 
  const [newNodeName, setNewNodeName] = useState(""); 

  const handleAdd = () => {
    // Maneja la acción de agregar un nuevo nodo.
    if (newNodeName.trim()) {
      // Verifica que el nombre del nodo no esté vacío o solo contenga espacios.
      onAdd(node.id, newNodeName); 
      // Llama a la función `onAdd` pasando el ID del nodo actual y el nombre del nuevo nodo.
      setNewNodeName(""); 
      // Limpia el campo de texto.
      setIsAdding(false); 
      // Cierra el formulario de adición.
    }
  };

  return (
    <li>
      <div>
        {node.children && (
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )}
        {node.name}
        {editable && (
          <>
            <IconButton onClick={() => setIsAdding(!isAdding)}>
              <Add />
            </IconButton>
            <IconButton onClick={() => onDelete(node.id)}>
              <Delete />
            </IconButton>
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
          <button onClick={handleAdd}>Add</button>
          <button onClick={() => setIsAdding(false)}>Cancel</button>
        </div>
      )}
      {isExpanded && node.children && (
        <ul>
          {node.children.map((child: any) => (
            <TreeNode
              key={child.id}
              node={child}
              editable={editable}
              onAdd={onAdd}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;