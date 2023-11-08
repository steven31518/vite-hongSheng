import { signIn, logout, userCheck } from "./loginVaildation";
import {
  addPicture,
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./products";
import { getProductsInPage } from "./onSales";
const apiPath: string = import.meta.env.VITE_API_PATH;

export const api = {
  login: {
    signIn: signIn,
    logout: logout,
    userCheck: userCheck,
  },
  products: {
    getAllProducts: getAllProducts(apiPath),
    addPicture: addPicture(apiPath),
    addProduct: addProduct(apiPath),
    updateProduct: updateProduct(apiPath),
    deleteProduct: deleteProduct(apiPath),
  },
  onSales: {
    getProductsInPage: getProductsInPage(apiPath),
  },
};
