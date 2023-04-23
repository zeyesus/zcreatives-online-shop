import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./route/navigaiton/navigation.component";
import HomeRoute from "./route/home/home.route.component";
import OrderRoute from "./route/order/order.route.component";
import DesignRoute from "./route/design/design.route.component";
import CartRoute from "./route/cart/cart.route.component";
import SignIN from "./route/signin/signin.route.component";
import SignUp from "./route/sign up/signup.route.component";
import Admin from "./route/admin/admin";
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
        <Route path="/dashboard" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
