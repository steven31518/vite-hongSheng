import { signIn, logout, userCheck } from "./loginVaildation";
import {
  addPicture,
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./products";
import { getProductsInPage, getProductWithId } from "./onSales";
import { postCart } from "./cart/addCart";
import { getCart } from "./cart/getCart";
import { deleteItem } from "./cart/deleteItem";
import { editCart } from "./cart/editCart";
import { postOrder } from "./order/addOrder";
import { getOrder } from "./order/getOrder";
import { pay } from "./pay/pay";
import { getOrderbyId } from "./order/getOrderbyId";

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
    getProductWithId: getProductWithId(apiPath),
  },
  cart: {
    postCart: postCart(apiPath),
    getCart: getCart(apiPath),
    deleteItem: deleteItem(apiPath),
    editCart: editCart(apiPath),
  },
  order: {
    postOrder: postOrder(apiPath),
    getOrder: getOrder(apiPath),
    getOrderbyId: getOrderbyId(apiPath),
  },
  pay: {
    pay: pay(apiPath),
  },
};
