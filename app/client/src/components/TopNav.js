// TopNav.js
import React from 'react';
import styled from 'styled-components';
// Uncomment the next line if you're using React Router
// import { Link } from 'react-router-dom';

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
  padding: 4px 14px;
  text-decoration: none;

  &:hover {
    background-color: #ddd;
    color: black;
  }
`;

function TopNav() {
  return (
    <Nav>
      <Ul>
        <Li><NavLink href="/">Home</NavLink></Li>
        <Li><NavLink href="/about">About</NavLink></Li>
        <Li><NavLink href="/contact">Contact</NavLink></Li>
      </Ul>
    </Nav>
  );
}

export default TopNav;
