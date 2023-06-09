import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { UserToolbar } from "../components";
import { useVisibilityContext } from "../contexts/visibility-context";
import { useUserContext } from "../contexts/user-context";
import logo from "../assets/logo.svg";
import { navLinks } from "../utils/constants";

const Navbar = () => {
  const { openSidebar } = useVisibilityContext();
  const { isLoggedIn } = useUserContext();

  return (
    <StyledNav>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="Esports Shop" />
          </Link>
          <button type="button" className="nav-toggle" onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          {navLinks.map(({ id, text, url, isProtected }) => {
            if (!isProtected || isLoggedIn) {
              return (
                <li key={id}>
                  <Link to={url}>{text}</Link>
                </li>
              );
            }
            return null;
          })}
        </ul>
        <UserToolbar />
      </div>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      vertical-align: middle;
      width: 150px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .user-toolbar-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    .user-toolbar-wrapper {
      display: grid;
    }
  }
`;

export default Navbar;
