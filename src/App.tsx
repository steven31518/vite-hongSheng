import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import DashBoard from "./pages/admin/DashBoard";
import AdminProducts from "./pages/admin/AdminProduct";
import AdminCoupons from "./pages/admin/AdminCoupons";
import { AdminOrder } from "./pages/admin/admin order/AdminOrders";
import FrontLayout from "./pages/front/FrontLayout";
import { CheckOrder } from "./pages/front/check/CheckOrder";
import { ProductDetail } from "./pages/front/productDetail/ProductDetail";
import { ProductsOnSales } from "./pages/front/onSalesProducts/ProductsOnSales";
import { ThemeProvider } from "./components/ThemeProvider";
import { Success } from "./pages/front/success/Success";

function App() {
  return (
    <div className="App">
      <ThemeProvider defualtTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<FrontLayout />}>
            <Route path="/home" element={<ProductsOnSales />} />
            <Route path="product/:id" element={<ProductDetail />} />
          </Route>
          <Route path="check" element={<CheckOrder />} />
          <Route path="success/:id" element={<Success />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<DashBoard />}>
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
