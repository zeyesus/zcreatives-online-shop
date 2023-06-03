import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./component/context/user.context";
import { ProductContextProvider } from "./component/context/product.context";
import { CartContextProvider } from "./component/context/cart.context";
import { AdminUserContextProvider } from "./component/context/admin.context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminUserContextProvider>
        <UserProvider>
          <ProductContextProvider>
            <CartContextProvider>
              <App />
            </CartContextProvider>
          </ProductContextProvider>
        </UserProvider>
      </AdminUserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
