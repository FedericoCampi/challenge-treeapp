import React, { useState } from "react";
import TreeNode from "./TreeNode";
import { TreeNodeType, TreeProps } from "../types/types";
import { Alert, Snackbar } from "@mui/material";

const Tree: React.FC<TreeProps> = ({ title, value, onChange, editable }) => {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [expandAll, setExpandAll] = useState(true);

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleAdd = (parentId: string, name: string) => {
    // Crea una copia profunda del árbol para evitar mutaciones directas.
    const newValue = JSON.parse(JSON.stringify(value)); 

    // Función recursiva para buscar un nodo por su ID.
    const findNode = (node: TreeNodeType): TreeNodeType | null => {
      
      // Devuelve el nodo si el ID coincide con el `parentId` o sigue buscando.
      if (node.id === parentId) {
        return node;
      }

      for (let child of node.children || []) {
        
        // Llama recursivamente para buscar en los hijos.
        const found = findNode(child); 
        
        if (found) return found; 
      }
      return null; 
    };

     // Encuentra el nodo padre al que se le agregará el nuevo hijo.
    const parentNode = findNode(newValue); 

    if (!parentNode) {
      console.error("Nodo padre no encontrado");
      return;
    }

    parentNode.children = [
      // Asegura que `children` sea un array y agrega el nuevo hijo.
      ...(parentNode.children || []), 
      // Crea un nuevo nodo hijo con un ID único, nombre y un array vacío de hijos.
      { id: Date.now().toString(), name, children: [] } 
    ];

    onChange(newValue);
    showSnackbar(`Nodo "${name}" agregado correctamente.`);
  };

  const handleDelete = (id: string) => {

    // Crea una copia profunda del árbol para evitar mutaciones directas.
    const newValue = JSON.parse(JSON.stringify(value)); 
    
    // Función recursiva para eliminar un nodo y sus hijos.
    const removeNode = (nodes: TreeNodeType[], nodeId: string): TreeNodeType[] =>
      nodes
        // Filtra los nodos para excluir el nodo con el ID dado.
        .filter((node: TreeNodeType) => node.id !== nodeId)
        // Copia el nodo actual.
        .map((node: TreeNodeType) => ({
          ...node, 

          // Llama recursivamente para procesar los hijos.
          children: removeNode(node.children || [], nodeId) 
      }));

    onChange({ ...newValue, children: removeNode(newValue.children || [], id) });
    showSnackbar("Nodo eliminado correctamente.");
  };

  const toggleExpandAll = () => {
    setExpandAll((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggleExpandAll}>
        {expandAll ? "Colapsar Todos" : "Expandir Todos"}
      </button>
      <h3>{title}</h3> 
      <ul>
        <TreeNode
          node={value}
          editable={editable} 
          onAdd={handleAdd} 
          onDelete={handleDelete} 
          expandAll={expandAll}
        />

    <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
      </ul>
    </div>
  );
};


export default Tree;