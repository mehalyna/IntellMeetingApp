import { useState } from 'react';

interface BaseItem {
  id: string;
}

interface UseItemManagerOptions<T extends BaseItem> {
  initialItems?: T[];
  defaultItems?: T[];
  onAdd?: (item: T) => void;
  onUpdate?: (item: T) => void;
  onDelete?: (id: string) => void;
}

export default function useItemManager<T extends BaseItem>({
  initialItems = [],
  defaultItems = [],
  onAdd,
  onUpdate,
  onDelete
}: UseItemManagerOptions<T>) {
  const [items, setItems] = useState<T[]>(
    initialItems.length > 0 ? initialItems : defaultItems
  );

  const addItem = (newItem: T) => {
    setItems([...items, newItem]);
    
    if (onAdd) {
      onAdd(newItem);
    }
  };

  const updateItem = (updatedItem: T) => {
    const updatedItems = items.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    );
    
    setItems(updatedItems);
    
    if (onUpdate) {
      onUpdate(updatedItem);
    }
  };

  const updateItemField = <K extends keyof T>(id: string, field: K, value: T[K]) => {
    const itemIndex = items.findIndex(item => item.id === id);
    
    if (itemIndex === -1) return;
    
    const updatedItem = { 
      ...items[itemIndex], 
      [field]: value 
    };
    
    const updatedItems = [...items];
    updatedItems[itemIndex] = updatedItem;
    
    setItems(updatedItems);
    
    if (onUpdate) {
      onUpdate(updatedItem);
    }
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    
    if (onDelete) {
      onDelete(id);
    }
  };

  return {
    items,
    addItem,
    updateItem,
    updateItemField,
    deleteItem
  };
}