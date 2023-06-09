import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useProductsContext } from "./products-context";
import filterReducer from "../reducers/filter-reducer";
import {
  PRODUCT_LIST_LOAD,
  PRODUCT_LIST_SORT,
  PRODUCT_LIST_FILTER,
  PRODUCT_SORT_TYPE_UPDATE,
  PRODUCT_FILTERS_UPDATE,
  PRODUCT_FILTERS_CLEAR,
} from "../actions/filter-actions";
import { productSortTypes } from "../utils/constants";

const initialState = {
  allProducts: [],
  filteredProducts: [],
  productSortType: productSortTypes.PRICE_LOW_TO_HIGH,
  productFilters: {
    text: "",
    company: "any",
    category: "any",
    color: "any",
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    freeShipping: false,
  },
};

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(filterReducer, initialState);

  useEffect(() => {
    dispatch({ type: PRODUCT_LIST_LOAD, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: PRODUCT_LIST_FILTER });
    dispatch({ type: PRODUCT_LIST_SORT });
  }, [products, state.productSortType, state.productFilters]);

  const updateProductSortType = (e) => {
    dispatch({ type: PRODUCT_SORT_TYPE_UPDATE, payload: e.target.value });
  };

  const updateProductFilters = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    switch (key) {
      case "price":
        value = Number(value);
        break;
      case "freeShipping":
        value = e.target.checked;
        break;
      default:
        break;
    }
    dispatch({
      type: PRODUCT_FILTERS_UPDATE,
      payload: { key, value },
    });
  };

  const clearProductFilters = () => {
    dispatch({ type: PRODUCT_FILTERS_CLEAR });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        updateProductSortType,
        updateProductFilters,
        clearProductFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

const useFilterContext = () => {
  return useContext(FilterContext);
};

export { FilterProvider, useFilterContext };
