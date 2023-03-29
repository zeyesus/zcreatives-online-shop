import { useContext } from "react";
import { ProductsContext } from "../../component/context/product.context";
import ShopCard from "../../component/Shop-Card/shop-card.component";
const OrderRoute = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className="grid grid-cols-5">
      <div className="bg-white">hellow</div>
      <div className="col-span-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ShopCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default OrderRoute;
