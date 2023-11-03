import { signIn, logout, userCheck } from "./loginVaildation";
import {
  addPicture,
  getAllProducts,
  addProduct,
  deleteProduct,
} from "./products";

const apiPath = import.meta.env.VITE_API_PATH as string;

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
    deleteProduct: deleteProduct(apiPath),
  },
};
