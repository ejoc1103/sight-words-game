import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import { useLocation } from 'react-router-dom';
import Toggle from './Toggle';

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  > a:visited {
    text-decoration: none;
  }
`;

const NavStyled = styled.nav`
  display: grid;
  margin: 20px 0 20px 0;
  padding: 0;
  overflow: hidden;
  font-weight: bold;
  grid-gap: 5%;
  overflow: visible;

  > ul {
    display: grid;
    list-style: none;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    align-items: center;
    justify-items: center;
    > li {
      text-decoration: none;
      list-style: none;
      margin: 10px;
      padding: 10px;
      color: ${({ theme }) => theme.text};
    }
    > li a {
      color: ${({ theme }) => theme.text};
    }
    .is-active {
      color: ${({ theme }) => theme.text};
      background: ${({ theme }) => theme.background};
      margin: 20px;
    }
  }
`;

const Nav = ({ start }) => {
  const { pathname } = useLocation();
  const { id, setTheme } = useContext(ThemeContext);

  return (
    <NavStyled>
      <ul>
        {start ? (
          <div></div>
        ) : (
          <li>
            <NavLinkStyled end to='/' pathname={pathname}>
              Home
            </NavLinkStyled>
          </li>
        )}
        <li>
          <NavLinkStyled to='/directions' pathname={pathname}>
            Directions
          </NavLinkStyled>
        </li>
        <Toggle isActive={id === 'bingo'} onToggle={setTheme} />
        {/* <NavLink to='/issues'>Glitches and Issues</NavLink> */}
      </ul>
    </NavStyled>
  );
};

export default Nav;
