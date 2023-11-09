import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import DashBoard from "./pages/admin/DashBoard";
import AdminProducts from "./pages/admin/AdminProduct";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminOrders from "./pages/admin/AdminOrders";
import FrontLayout from "./pages/front/FrontLayout";
import Products from "./pages/front/Products";
import ProductDetail from "./pages/front/ProductDetail";
import { ThemeProvider } from "./components/ThemeProvider";
function App() {
  return (
    <div className="App">
      <ThemeProvider defualtTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<FrontLayout />}>
            <Route path="/home" element={<div>Home</div>} />
            <Route path="/products" element={<Products />}>
              <Route path=":category" element={<Products />} />
            </Route>
            <Route path="product/:id" element={<ProductDetail />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<DashBoard />}>
            <Route path="products" element={<AdminProducts />} />
            <Route path="coupons" element={<AdminCoupons />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
