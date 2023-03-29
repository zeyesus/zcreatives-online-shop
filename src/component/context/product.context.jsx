import { createContext, useState } from "react";
import PRODUCT from "../../product.json";

export const ProductsContext = createContext({
  products: [],
});

export const ProductContextProvider = ({ children }) => {
  const [products, setProduct] = useState(PRODUCT);
  const Value = { products };
  return (
    <ProductsContext.Provider value={Value}>
      {children}
    </ProductsContext.Provider>
  );
};
