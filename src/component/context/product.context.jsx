import { createContext, useEffect, useState } from "react";

import PRODUCT from "../../product.json";
import { GetProducts } from "../../utils/firebase/firebase.utils";

export const ProductsContext = createContext({
  products: [],
});

export const ProductContextProvider = ({ children }) => {
  useEffect(() => {
    const getProducts = async () => {
      const productLists = await GetProducts();
      setProduct(productLists);
    };
    getProducts();
  }, []);

  const [products, setProduct] = useState([]);
  const Value = { products };
  return (
    <ProductsContext.Provider value={Value}>
      {children}
    </ProductsContext.Provider>
  );
};
