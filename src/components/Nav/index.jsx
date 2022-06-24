import React from "react";
import styled from "@emotion/styled";
import { FaGithub as GithubIcon } from "react-icons/fa";

const Nav = () => {
  return (
    <NavStyled>
      <TitleStyled>Coffe Creative Gallery</TitleStyled>
      <NavLinksStyled>
        <NavLinkStyled
          href="https://coffejeancode.vercel.app/home"
          target="_blank"
        >
          About
        </NavLinkStyled>
        <NavLinkStyled href="https://github.com/coffejeancode" target="_blank">
          <GithubIcon />
        </NavLinkStyled>
      </NavLinksStyled>
    </NavStyled>
  );
};

const NavStyled = styled.nav`
  width: 100%;
  background: rgba(255, 255, 255, 1);
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px 5px 51px 0px rgba(0, 0, 0, 0.08);
  padding: 1rem 2rem;
  overflow: hidden;
`;

const TitleStyled = styled.h1`
  font-size: 2rem;
  margin: 0;
`;

const NavLinkStyled = styled.a`
  display: flex;
  margin: 0.5rem;
  font-size: 1rem;
  text-decoration: none;
  color: #000;
  &:hover {
    cursor: pointer;
    color: red;
    text-decoration: dashed;
  }
`;

const NavLinksStyled = styled.div`
  display: flex;
`;

export default Nav;
