import { signIn, logout, userCheck } from "./loginVaildation";
import {
  addPicture,
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./products";
import {
  getProductsInPage,
  getProductWithId,
  getAllProductsClient,
} from "./onSales";
import { postCart, getCart, deleteItem, editCart } from "./cart";
import { postOrder, getOrder, getOrderbyId } from "./order";
import { pay } from "./pay/pay";
import { getAdminOrder, deleteAdminOrder } from "./order admin";
import { couponPost, couponGet } from "./coupon admin";
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
    getAllProductsClient: getAllProductsClient(apiPath),
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
  order_admin: {
    getAdminOrder: getAdminOrder(apiPath),
    deleteAdminOrder: deleteAdminOrder(apiPath),
  },
  coupon_admin: {
    couponPost: couponPost(apiPath),
    couponGet: couponGet(apiPath),
  },
};
