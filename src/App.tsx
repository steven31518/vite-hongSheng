import Login from "./pages/Login";
import DashBoard from "./pages/admin/DashBoard";
import { Route, Routes } from "react-router-dom";
import AdminProducts from "./pages/admin/AdminProduct";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminOrders from "./pages/admin/AdminOrders";
import { ThemeProvider } from "./components/ThemeProvider";
function App() {
  return (
    <div className="App">
      <ThemeProvider defualtTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<DashBoard />}>
            <Route path="products" element={<AdminProducts />} />
            <Route path="coupons" element={<AdminCoupons />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
        </Routes>{" "}
      </ThemeProvider>
    </div>
  );
}

export default App;
