import { Fragment, useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../component/context/product.context";
import ShopCard from "../../component/Shop-Card/shop-card.component";
import FilterOrder from "../../component/order filter/filterOrder";
import ShowProductsPopUp from "../../component/show products popup/showProductsPopUp.component";
const OrderRoute = () => {
  const [sideNavShow, setSideNavbarShow] = useState(false);
  const [popup, setpopup] = useState(false);
  const [popUpProduct, setPopupProducts] = useState({});
  const { products } = useContext(ProductsContext);
  const [shopproducts, setShopProducts] = useState([]);
  useEffect(() => {
    setShopProducts(products);
  }, [products]);

  return (
    <Fragment>
      <div className="grid grid-cols-6 ">
        <div className="bg-white ">
          <FilterOrder
            sideNavShow={sideNavShow}
            setSideNavbarShow={setSideNavbarShow}
            products={shopproducts}
            setShopProducts={setShopProducts}
          />
        </div>
        <div className="col-span-5 grid grid-cols-1 md:grid-cols-3 md:gap-3 lg:grid-cols-4 gap-6">
          {products == [] && <h2>Loading products...</h2>}
          {shopproducts?.map((product) => (
            <ShopCard
              key={product.id}
              product={product}
              setpopup={setpopup}
              setPopupProducts={setPopupProducts}
            />
          ))}
        </div>
      </div>
      {popup && (
        <ShowProductsPopUp popUpProduct={popUpProduct} setpopup={setpopup} />
      )}
    </Fragment>
  );
};

export default OrderRoute;
