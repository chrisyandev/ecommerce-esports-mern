import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PageHero = ({ title, isProductPage = false }) => {
  return (
    <StyledSection>
      <div className="section-center">
        <h3>
          <Link to="/">Home</Link>
          {isProductPage && <Link to="/products">/ Products</Link>}/ {title}
        </h3>
      </div>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  background: var(--clr-primary-10);
  width: 100%;
  min-height: 20vh;
  display: flex;
  align-items: center;

  color: var(--clr-primary-1);
  a {
    color: var(--clr-primary-4);
    padding: 0.5rem;
    transition: var(--transition);
  }
  a:hover {
    color: var(--clr-primary-1);
  }
`;

export default PageHero;
