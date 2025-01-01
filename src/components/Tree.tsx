import React from "react";
import TreeNode from "./TreeNode";

interface TreeProps {
  title: string;
  value: any;
  onChange: (value: any) => void;
  editable: boolean;
}

const Tree: React.FC<TreeProps> = ({ title, value, onChange, editable }) => {

  const handleAdd = (parentId: string, name: string) => {
    // Maneja la adición de un nuevo nodo hijo a un nodo existente.
    const newValue = JSON.parse(JSON.stringify(value)); 
    // Crea una copia profunda del árbol para evitar mutaciones directas.

    const findNode = (node: any): any => {
      // Función recursiva para buscar un nodo por su ID.
      if (node.id === parentId) {
        // Devuelve el nodo si el ID coincide con el `parentId`.
        return node;
      }
      for (let child of node.children || []) {
        // Itera sobre los hijos del nodo actual.
        const found = findNode(child); 
        // Llama recursivamente para buscar en los hijos.
        if (found) return found; 
        // Devuelve el nodo encontrado si coincide.
      }
      return null; 
      // Devuelve null si no encuentra el nodo en este nivel.
    };

    const parentNode = findNode(newValue); 
    // Encuentra el nodo padre al que se le agregará el nuevo hijo.

    parentNode.children = [
      ...(parentNode.children || []), 
      // Asegura que `children` sea un array y agrega el nuevo hijo.
      { id: Date.now().toString(), name, children: [] } 
      // Crea un nuevo nodo hijo con un ID único, nombre y un array vacío de hijos.
    ];

    onChange(newValue); 
    // Llama a `onChange` con la nueva estructura del árbol.
  };

  const handleDelete = (id: string) => {
    // Maneja la eliminación de un nodo por su ID.
    const newValue = JSON.parse(JSON.stringify(value)); 
    // Crea una copia profunda del árbol para evitar mutaciones directas.

    const removeNode = (nodes: any[], nodeId: string): any[] =>
      // Función recursiva para eliminar un nodo y sus hijos.
      nodes
        .filter((node: any) => node.id !== nodeId) 
        // Filtra los nodos para excluir el nodo con el ID dado.
        .map((node: any) => ({
          ...node, 
          // Copia el nodo actual.
          children: removeNode(node.children || [], nodeId) 
          // Llama recursivamente para procesar los hijos.
        }));

    onChange({ ...newValue, children: removeNode(newValue.children || [], id) });
    // Actualiza el árbol con los nodos modificados.
  };

  return (
    <div>
      <h3>{title}</h3> 
      <ul>
        <TreeNode
          node={value}
          editable={editable} 
          onAdd={handleAdd} 
          onDelete={handleDelete} 
        />
      </ul>
    </div>
  );
};


export default Tree;