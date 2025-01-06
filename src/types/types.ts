export interface TreeNodeType {
  id: string;
  name: string;
  children: TreeNodeType[];
}

export interface TreeProps {
  title: string;
  value: TreeNodeType;
  onChange: (value: TreeNodeType) => void;
  editable: boolean;
}

export interface TreeNodeProps {
  node: TreeNodeType;
  editable: boolean;
  onAdd: (parentId: string, name: string) => void;
  onDelete: (id: string) => void;
  expandAll: boolean
}