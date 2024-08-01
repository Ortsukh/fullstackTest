import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Header: React.FC = () => {
    const { pathname } = useLocation();

    return (
        <HeaderContainer>
            <nav>
                <NavList>
                    <NavItem>
                        <NavLink to="/" active={pathname === '/'}>
                            Home
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink to="/account" active={pathname === '/account'}>
                            Profile
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink to="/people" active={pathname === '/people'}>
                            People
                        </NavLink>
                    </NavItem>
                </NavList>
            </nav>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.header`
  background-color: #333;
  padding: 1rem;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-right: 1rem;
`;

interface NavLinkProps {
    active: boolean;
}

const NavLink = styled(Link)<NavLinkProps>`
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  padding: 0.5rem;
  border-radius: 4px;
  ${({ active }) => active && `
    background-color: #555;
  `}
`;

export default Header;