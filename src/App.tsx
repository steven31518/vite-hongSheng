import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
const Login = lazy(() => import("./pages/login/Login"));
const DashBoard = lazy(() => import("./pages/admin/DashBoard"));
const AdminOrder = lazy(() => import("./pages/admin/admin order/AdminOrders"));
const AdminProducts = lazy(
  () => import("./pages/admin/admin product/AdminProducts")
);
const FrontLayout = lazy(() => import("./pages/front/FrontLayout"));
const CheckOrder = lazy(() => import("./pages/front/check/CheckOrder"));
const ProductDetail = lazy(
  () => import("./pages/front/productDetail/ProductDetail")
);
const ProductsOnSales = lazy(
  () => import("./pages/front/onSalesProducts/ProductsOnSales")
);

const Success = lazy(() => import("./pages/front/success/Success"));
const AdminCoupons = lazy(
  () => import("./pages/admin/admin coupon/AdminCoupon")
);
const Home = lazy(() => import("./pages/front/onSalesProducts/Home"));
const TestMotion = lazy(() => import("./pages/motion test/Test"));

import ThemeProvider from "./components/ThemeProvider";
import FullscreenLoading from "./components/FullscreenLoading";



function App() {
  return (
    <div className="App">
      <ThemeProvider defualtTheme="dark" storageKey="vite-ui-theme">
        <Suspense fallback={<FullscreenLoading />}>
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
        </Suspense>
      </ThemeProvider>
    </div>
  );
}

export default App;
