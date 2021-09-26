// Author : Jaahnvi Hehar
// This file contains styled-components for all components in the folder Navbar
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { Link as LinkRouter } from "react-router-dom";
import { BsCaretDownFill as Expand } from "react-icons/bs";
import { BsCaretUpFill as Hide } from "react-icons/bs";

export const SidebarContainer = styled.aside`
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: #fff;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
`;

export const CloseIcon = styled(FaTimes)`
  color: #d0312d;
`;

export const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`;

export const SidebarItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 70px);
  text-align: center;

  @media screen and (max-width: 480px) {
    grid-template-rows: repeat(6, 50px);
  }
`;

export const SidebarItemLink = styled(LinkRouter)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  color: black;

  &:hover {
    text-decoration: none;
    color: #aaa;
  }
`;

export const SidebarIconItemContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const SidebarIconItemLink = styled(LinkRouter)`
  text-decoration: none;
  border-radius: 50%;
  background: #d0312d;
  padding-top: 10px;
  padding-bottom: 13px;
  padding-left: 14px;
  padding-right: 14px;
  color: #fff;
  font-size: 23px;
  margin: 3vw;

  &:hover {
    background: #dedede;
    color: #d0312d;
  }
`;

export const ExpandIcon = styled(Expand)`
  font-size: 16px;
  color: #d0312d;
  margin-left: 5px;
  margin-right: -10px;
  display: ${({ dropdown }) => (dropdown ? "none" : "inline-block")};
`;
export const HideIcon = styled(Hide)`
  font-size: 16px;
  color: #d0312d;
  margin-left: 5px;
  margin-right: -10px;
  display: ${({ dropdown }) => (dropdown ? "inline-block" : "none")};
`;

export const Nav = styled.nav`
  background: #fff;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  border-bottom: 2px solid #d0312d;
`;

export const DropdownContainer = styled.div`
  width: 200px;
  position: absolute;
  top: 80px;
  z-index: 1000;
  box-shadow: 0 0 3px 0 rgba(100, 100, 100, 0.25);
  display: ${({ dropdown }) => (dropdown ? "block" : "none")};
`;

export const DropdownItem = styled(LinkRouter)`
  display: block;
  height: 100%;
  width: 100%;
  text-decoration: none;
  padding: 10px;
  text-align: left;
  color: black;
  font-size: 1rem;

  &:hover {
    text-decoration: none;
    color: black;
  }
`;

export const DropdownItemName = styled.div`
  display: block;
  height: 100%;
  width: 100%;
  text-decoration: none;
  padding: 10px;
  text-align: left;
  color: black;
  font-size: 1rem;
`;

export const Separator = styled.hr`
  width: 97%;
  margin: 0 auto;
  height: 0;
  background: #303030;
`;

export const DropdownWrapper = styled.div`
  height: 100%;
  width: 100%;
  cursor: pointer;
  background: #ececec;

  &:hover {
    background: white;
  }

  &:hover ${DropdownItem} {
    color: #303030;
  }
`;

export const DropdownWrapperName = styled.div`
  height: 100%;
  width: 100%;
  background: #ececec;
`;

export const NavBrand = styled(LinkRouter)`
  justify-self: start;
  margin-left: 4rem;
  cursor: pointer;
  text-decoration: none;
  font-size: 2rem;
  color: #d0312d;

  &:hover {
    text-decoration: none;
    color: #808080;
  }
`;

export const NavItemContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-gap: 10px;
  list-style: none;
  text-align: center;
  width: 70vw;
  justify-content: start;
  margin-left: 2rem;

  @media screen and (max-width: 960px) {
    display: none;
  }
`;

export const NavItemWrapper = styled.li`
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
`;

export const NavItem = styled(LinkRouter)`
  text-decoration: none;
  padding: 0.5rem 1rem;
  color: black;
  font-size: 1.3rem;
  text-decoration: none;
  margin-top: 1.3rem;
  z-index: 50;

  &:hover {
    text-decoration: none;
    color: #808080;
  }
`;

export const NavLinkContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-gap: 10px;
  list-style: none;
  text-align: center;
  width: 70vw;
  justify-content: end;
  margin-right: 4rem;
  margin-top: 1.2rem;

  @media screen and (max-width: 960px) {
    display: none;
  }
`;

export const NavLinkWrapper = styled.li`
  display: flex;
  align-items: center;
  height: 80px;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;

export const NavUserLinkWrapper = styled.li`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;

export const NavLink = styled(LinkRouter)`
  text-decoration: none;
  border-radius: 50%;
  background: #d0312d;
  padding-top: 8px;
  padding-bottom: 10px;
  padding-left: 12px;
  padding-right: 12px;
  color: #fff;
  font-size: 1.2rem;
  z-index: 50;

  &:hover {
    background: #dedede;
    color: #d0312d;
  }
`;

export const NavLinkName = styled.div`
  border-radius: 50%;
  background: #d0312d;
  padding-top: 8px;
  padding-bottom: 10px;
  padding-left: 12px;
  padding-right: 12px;
  color: #fff;
  font-size: 1.2rem;
  z-index: 50;
  display: inline-block;
`;

export const NavLinkSearch = styled(LinkRouter)`
  text-decoration: none;
  color: #d0312d;
  font-size: 1.7rem;
  z-index: 50;
  margin-top: -5px;

  &:hover {
    text-decoration: none;
    color: black;
  }

  @media screen and (max-width: 960px) {
    font-size: 1.5rem;
  }
`;

export const NavIconContainer = styled.div`
  display: none;
  grid-template-columns: repeat(2, auto);
  grid-gap: 10px;
  list-style: none;
  text-align: center;
  width: 70vw;
  justify-content: end;
  margin-right: 5rem;

  @media screen and (max-width: 960px) {
    display: grid;
  }
`;

export const NavIconWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  margin-left: 1rem;
  color: #d0312d;
  font-size: 2rem;
`;

export const DropDown = styled.div`
  padding: 0;
  margin: 0;
  z-index: 50;
  display: inline-block;
`;
