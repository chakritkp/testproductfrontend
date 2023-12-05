import { createSlice } from "@reduxjs/toolkit";
import { createProduct, getProductList } from "../api";

const initialState = {
  data: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductList: (state, action) => {
      state.data = action.payload;
    },
    resetProductData: (state) => {
      state.data = initialState.data;
    },
  },
});

export const fetchProductList = () => async (dispatch) => {
  try {
    const response = await getProductList();
    dispatch(setProductList(response.data));
  } catch (error) {
    console.error("Error fetching product list:", error);
  }
};

export const addProduct = (productData) => async (dispatch) => {
  try {
    const response = await createProduct(productData);
    dispatch(fetchProductList());
  } catch (error) {
    console.error("Error adding product:", error.message);
  }
};

export const { setProductData, setProductList, resetProductData } = productSlice.actions;
export const selectProductData = (state) => state.product;

export default productSlice.reducer;
