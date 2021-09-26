// Author : Jaahnvi Hehar
//This component is used to render the topbar when the screen size width is greater than 720px
import React from "react";
import {
  Nav,
  NavBrand,
  NavItemContainer,
  NavLinkContainer,
  NavItemWrapper,
  NavLinkWrapper,
  NavUserLinkWrapper,
  NavItem,
  NavLink,
  NavLinkSearch,
  NavIconContainer,
  NavIconWrapper,
  DropdownContainer,
  DropdownWrapper,
  DropdownWrapperName,
  DropdownItem,
  DropdownItemName,
  ExpandIcon,
  HideIcon,
  DropDown,
  Separator,
  NavLinkName,
} from "./NavbarElements";
import { FiSearch, FiUser, FiHeart, FiShoppingBag } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router";

const Topbar = ({ toggle }) => {
  const history = useHistory();
  const [dropdown, setDropdown] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["id", "name"]);
  const id = cookies.id;
  const name = cookies.name;

  const displayDropdown = () => {
    setDropdown(!dropdown);
  };

  const signout = () => {
    removeCookie("name");
    removeCookie("id");
    history.push("/");
  };
  return (
    <div>
      <Nav>
        <NavBrand to="/">ANAHA</NavBrand>
        <NavIconContainer>
          <NavIconWrapper>
            <NavLinkSearch to="/search">
              <FiSearch />
            </NavLinkSearch>
          </NavIconWrapper>
          <NavIconWrapper onClick={toggle}>
            <FaBars />
          </NavIconWrapper>
        </NavIconContainer>

        <NavItemContainer>
          <NavItemWrapper>
            <NavItem to="/">Home</NavItem>
          </NavItemWrapper>
          <NavItemWrapper>
            <NavItem to="/shop">Shop</NavItem>
          </NavItemWrapper>
          <NavItemWrapper>
            <NavItem to="/contact">Contact Us</NavItem>
          </NavItemWrapper>
        </NavItemContainer>

        <NavLinkContainer>
          <NavLinkWrapper>
            <NavLinkSearch to="/search" title="Search">
              <FiSearch />
            </NavLinkSearch>
          </NavLinkWrapper>
          {!name && (
            <NavLinkWrapper>
              <NavLink to="/signin" title="Profile">
                <FiUser />
              </NavLink>
            </NavLinkWrapper>
          )}
          {name && (
            <NavUserLinkWrapper>
              <DropDown onClick={displayDropdown}>
                <NavLinkName title="User Profile">
                  <FiUser />
                </NavLinkName>
                <ExpandIcon dropdown={dropdown ? 1 : 0} />
                <HideIcon dropdown={dropdown ? 1 : 0} />
              </DropDown>
              <DropdownContainer dropdown={dropdown ? 1 : 0}>
                <DropdownWrapperName>
                  <DropdownItemName>
                    Hi
                    <br />
                    <b>{name}</b>
                  </DropdownItemName>
                  <Separator />
                </DropdownWrapperName>
                <DropdownWrapper>
                  <DropdownItem to="/profile">User Profile</DropdownItem>
                </DropdownWrapper>
                <DropdownWrapper>
                  <DropdownItem to={`/orders/${id}`}>
                    Orders &amp; Cancellations
                  </DropdownItem>
                </DropdownWrapper>
                <DropdownWrapper>
                  <DropdownItem onClick={signout} to="/">
                    Sign Out
                  </DropdownItem>
                </DropdownWrapper>
              </DropdownContainer>
            </NavUserLinkWrapper>
          )}
          <NavLinkWrapper>
            <NavLink to={`/wishlist/${id}`} title="Wishlist">
              <FiHeart />
            </NavLink>
          </NavLinkWrapper>
          <NavLinkWrapper>
            <NavLink to={`/cart/${id}`} title="Shopping Bag">
              <FiShoppingBag />
            </NavLink>
          </NavLinkWrapper>
        </NavLinkContainer>
      </Nav>
    </div>
  );
};

export default Topbar;
