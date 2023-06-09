import React from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";
import styled from "styled-components";
import { useFilterContext } from "../../contexts/filter-context";
import { useVisibilityContext } from "../../contexts/visibility-context";
import { productListTypes } from "../../utils/constants";
import { productSortTypes } from "../../utils/constants";

const ProductListHeader = () => {
  const { filteredProducts, productSortType, updateProductSortType } =
    useFilterContext();
  const { productListType, viewProductListAsGrid, viewProductListAsList } =
    useVisibilityContext();

  return (
    <StyledSection>
      <div className="btn-container">
        <button
          type="button"
          className={`${
            productListType === productListTypes.GRID
              ? "active grid-btn"
              : "grid-btn"
          }`}
          onClick={viewProductListAsGrid}
        >
          <BsFillGridFill />
        </button>
        <button
          type="button"
          className={`${
            productListType === productListTypes.LIST
              ? "active list-btn"
              : "list-btn"
          }`}
          onClick={viewProductListAsList}
        >
          <BsList />
        </button>
      </div>
      <p>{filteredProducts.length} products found</p>
      <hr />
      <form>
        <label htmlFor="sort">Sort by</label>
        <select
          className="sort-input"
          value={productSortType}
          onChange={updateProductSortType}
        >
          <option value={productSortTypes.PRICE_LOW_TO_HIGH}>
            Price: Low to high
          </option>
          <option value={productSortTypes.PRICE_HIGH_TO_LOW}>
            Price: High to low
          </option>
          <option value={productSortTypes.NAME_A_TO_Z}>Name: A-Z</option>
          <option value={productSortTypes.NAME_Z_TO_A}>Name: Z-A</option>
        </select>
      </form>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;

  p {
    margin-bottom: 0;
  }
  label {
    font-size: 1rem;
    font-weight: bold;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    margin-right: 0.5rem;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: none;
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
    .grid-btn {
      color: var(--clr-grey-8);
    }
    .list-btn {
      color: var(--clr-grey-5);
    }
    .grid-btn.active {
      color: var(--clr-grey-5);
    }
    .list-btn.active {
      color: var(--clr-white);
    }
    .active {
      border: 1px solid var(--clr-white);
    }
  }
  .sort-input {
    color: var(--clr-grey-1);
    background: var(--clr-grey-8);
    border: none;
    border-radius: var(--radius);
    padding: 0.25rem 0.5rem;
    text-transform: capitalize;
  }

  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
`;

export default ProductListHeader;
