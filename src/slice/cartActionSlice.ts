import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/api";
import type { postCartType } from "@/lib/api/cart/addCart";

type postCart_res = {
  success: boolean;
  message: string;
  data: {
    product_id: string;
    qty: number;
    id: string;
    total: number;
    final_total: number;
    product: {
      category: string;
      content: string;
      description: string;
      id: string;
      imageUrl: string;
      imagesUrl: string[];
      is_enabled: number;
      num: number;
      origin_price: number;
      price: number;
      title: string;
      unit: string;
    };
  };
};

export const postCart = createAsyncThunk(
  "cartAction/postCart",
  async (data: postCartType) => {
    const response = await api.cart.postCart(data);
    return response as unknown as postCart_res;
  }
);

type messageData = {
  variant: "default" | "destructive";
  title: string;
  description: string;
};
const cartActionSlice = createSlice({
  name: "cartAction",
  initialState: {
    loading: false,
    message: [] as messageData[],
    success: false,
  },
  reducers: {
    deleteMessage: (state) => {
      state.message = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postCart.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(postCart.rejected, (state) => {
      state.loading = false;
    });
    builder.addMatcher(
      (action) =>
        action.type.startsWith("cartAction") &&
        action.type.endsWith("/fulfilled"),
      (state, action) => {
        if (action.payload.success) {
          state.message.push({
            variant: "default",
            title: "Success",
            description: action.payload.message,
          });
        } else {
          state.message.push({
            variant: "destructive",
            title: "Failed",
            description: action.payload.message,
          });
        }
      }
    );
  },
});

export const { deleteMessage } = cartActionSlice.actions;
export default cartActionSlice.reducer;
