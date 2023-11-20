// TopNav.js
import React from 'react';
import styled from 'styled-components';


const Nav = styled.nav`
  background-color: darkgray;
  color: white;
  overflow: hidden;
`;

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
`;

const Li = styled.li`
  float: left;
`;

const NavLink = styled.a`
  display: block;
  color: white;
  text-align: center;
  padding: 2px 16px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    text-decoration-color: red; /* Underline in red on hover */
  }
`;

function TopNav() {
  return (
    <Nav>
      <Ul>
        <Li><NavLink href="/">Home</NavLink></Li>
        <Li><NavLink href="/faq">FAQ</NavLink></Li>
        <Li><NavLink href="/about">About</NavLink></Li>
      </Ul>
    </Nav>
  );
}

export default TopNav;
