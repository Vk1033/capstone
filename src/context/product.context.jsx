import { createContext } from "react";
import { useState } from "react";

import PRODUCTS from "../shopdata.json";

export const ProductsContext = createContext({
  products: [],
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  return <ProductsContext.Provider value={PRODUCTS}>{children}</ProductsContext.Provider>;
};
