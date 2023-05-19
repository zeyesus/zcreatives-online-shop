import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./route/navigaiton/navigation.component";
import HomeRoute from "./route/home/home.route.component";
import OrderRoute from "./route/order/order.route.component";
import DesignRoute from "./route/design/design.route.component";
import CartRoute from "./route/cart/cart.route.component";
import SignIN from "./route/signin/signin.route.component";
import SignUp from "./route/sign up/signup.route.component";
import AdminNav from "./route/admin/adminNavbar";
import AdminUsers from "./route/admin/adminUsers.route";
import AdminOrders from "./route/admin/adminOrders.route";
import AdminProducts from "./route/admin/adminProducts.route";
import AddProductForm from "./component/admin-form/add-product.component";
import AdminDashboard from "./route/admin/adminUsers.route";
import AdminProductsTable from "./component/admin table/admin product table.component";
import AddUserForm from "./component/admin-form/add-userform.component";
import AdminUsersTable from "./component/admin table/admin User table";

function App() {
  return (
    <div className="App container mx-auto bg-lightDark ">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomeRoute />} />
          <Route path="/order" element={<OrderRoute />} />
          <Route path="/design" element={<DesignRoute />} />
          <Route path="/cart" element={<CartRoute />} />
          <Route path="/signin" element={<SignIN />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route path="/dashboard" element={<AdminNav />}>
          <Route index element={<AdminDashboard />} />
          <Route path="/dashboard/adminorderpage" element={<AdminOrders />} />
          <Route path="/dashboard/adminusers" element={<AdminUsers />}>
            <Route
              path="/dashboard/adminusers/adduser"
              element={<AddUserForm />}
            />
            <Route
              path="/dashboard/adminusers/users"
              element={<AdminUsersTable />}
            />
          </Route>
          <Route path="/dashboard/adminproduct" element={<AdminProducts />}>
            <Route
              path="/dashboard/adminproduct/addproducts"
              element={<AddProductForm />}
            />
            <Route
              path="/dashboard/adminproduct/products"
              element={<AdminProductsTable />}
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
