import React from "react";
import { Link, useResolvedPath } from "react-router-dom";
import styled from "styled-components";
import { FaShoppingCart, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { useVisibilityContext } from "../contexts/visibility-context";
import { useCartContext } from "../contexts/cart-context";
import { useUserContext } from "../contexts/user-context";

const UserToolbar = () => {
  const { closeSidebar } = useVisibilityContext();
  const { totalQuantity } = useCartContext();
  const { isLoggedIn, logoutUser, updatePostLoginPath } = useUserContext();
  const resolvedPath = useResolvedPath();

  return (
    <StyledDiv className="user-toolbar-wrapper">
      <Link to="/cart" className="cart-btn" onClick={closeSidebar}>
        Cart
        <span className="cart-container">
          <FaShoppingCart />
          <span className="cart-value">{totalQuantity}</span>
        </span>
      </Link>
      {isLoggedIn ? (
        <button
          type="button"
          className="auth-btn"
          onClick={() => {
            closeSidebar();
            logoutUser();
          }}
        >
          Logout <FaUserMinus />
        </button>
      ) : (
        <Link
          to="/login"
          onClick={() => {
            closeSidebar();
            if (resolvedPath.pathname !== "/login") {
              updatePostLoginPath(resolvedPath.pathname);
            } // invokes before Link navigates
          }}
        >
          <button type="button" className="auth-btn">
            Login <FaUserPlus />
          </button>
        </Link>
      )}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-6);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border-color: transparent;
    font-size: 1rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
  .cart-btn:hover {
    color: var(--clr-primary-6);
  }
  .auth-btn:hover {
    color: var(--clr-primary-6);
  }
`;

export default UserToolbar;
