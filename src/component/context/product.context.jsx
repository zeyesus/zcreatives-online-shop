import { createContext, useEffect, useState } from "react";

import PRODUCT from "../../product.json";
import { GetItems } from "../../utils/firebase/firebase.utils";

export const ProductsContext = createContext({
  products: [],
  setProduct: () => {},
  loading: true,
});

export const ProductContextProvider = ({ children }) => {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProducts = async () => {
      const productLists = await GetItems("products");
      setProduct(productLists);
      setLoading(false);
    };
    getProducts();
  }, []);

  const Value = { products, setProduct, loading };
  return (
    <ProductsContext.Provider value={Value}>
      {children}
    </ProductsContext.Provider>
  );
};
