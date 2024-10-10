import React, { createContext, useState, useContext } from 'react';

interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
  dateAdded: Date;
}

interface InventoryContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'dateAdded'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  deleteAllProducts: () => void;
  updateProductQuantity: (id: string, quantitySold: number) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (product: Omit<Product, 'id' | 'dateAdded'>) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      dateAdded: new Date(),
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, ...updates } : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const deleteAllProducts = () => {
    setProducts([]);
  };

  const updateProductQuantity = (id: string, quantitySold: number) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, quantity: product.quantity - quantitySold } : product
    ));
  };

  return (
    <InventoryContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, deleteAllProducts, updateProductQuantity }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};