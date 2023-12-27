import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import DashBoard from "./pages/admin/DashBoard";

import { AdminOrder } from "./pages/admin/admin order/AdminOrders";
import { AdminProducts } from "./pages/admin/admin product/AdminProducts";
import FrontLayout from "./pages/front/FrontLayout";
import { CheckOrder } from "./pages/front/check/CheckOrder";
import { ProductDetail } from "./pages/front/productDetail/ProductDetail";
import { ProductsOnSales } from "./pages/front/onSalesProducts/ProductsOnSales";
import { ThemeProvider } from "./components/ThemeProvider";
import { Success } from "./pages/front/success/Success";
import { AdminCoupons } from "./pages/admin/admin coupon/AdminCoupon";
import Home from "./pages/front/onSalesProducts/Home";
import TestMotion from "./pages/motion test/Test";

function App() {
  return (
    <div className="App">
      <ThemeProvider defualtTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<FrontLayout />}>
            <Route path="test" element={<TestMotion />} />
            <Route path="home" element={<Home />} />
            <Route path="products" element={<ProductsOnSales />} />
            <Route path="product/:id" element={<ProductDetail />} />
          </Route>
          <Route path="check" element={<CheckOrder />} />
          <Route path="success/:id" element={<Success />} />
          <Route path="login" element={<Login />} />
          <Route path="admin" element={<DashBoard />}>
            <Route path="products" element={<AdminProducts />} />
            <Route path="coupons" element={<AdminCoupons />} />
            <Route path="orders" element={<AdminOrder />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
