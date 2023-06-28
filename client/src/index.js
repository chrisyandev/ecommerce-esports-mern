import React from "react";
import ReactDOM from "react-dom/client";
import { VisibilityProvider } from "./contexts/visibility-context";
import { UserProvider } from "./contexts/user-context";
import { ProductsProvider } from "./contexts/products-context";
import { FilterProvider } from "./contexts/filter-context";
import { CartProvider } from "./contexts/cart-context";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <VisibilityProvider>
      <UserProvider>
        <ProductsProvider>
          <FilterProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </FilterProvider>
        </ProductsProvider>
      </UserProvider>
    </VisibilityProvider>
  </React.StrictMode>
);
