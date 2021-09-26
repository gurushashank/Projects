// Author : Jaahnvi Hehar
//This component is used to render the sidebar when the screen size width is less than 720px
import React from "react";
import {
  CloseIcon,
  Icon,
  SidebarContainer,
  SidebarItemContainer,
  SidebarItemLink,
  SidebarIconItemContainer,
  SidebarIconItemLink,
} from "./NavbarElements";
import { FiUser, FiHeart, FiShoppingBag } from "react-icons/fi";
import { useCookies } from "react-cookie";

const Sidebar = ({ isOpen, toggle }) => {
  const [cookies] = useCookies();
  const id = cookies.id;
  const name = cookies.name;
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <div>
        <SidebarItemContainer>
          <SidebarItemLink to="/home" onClick={toggle}>
            Home
          </SidebarItemLink>
          <SidebarItemLink to="/shop" onClick={toggle}>
            Shop
          </SidebarItemLink>
          <SidebarItemLink to="/contact" onClick={toggle}>
            Contact Us
          </SidebarItemLink>
        </SidebarItemContainer>
        <SidebarIconItemContainer>
          {!name && (
            <SidebarIconItemLink to="/signin" title="Profile">
              <FiUser />
            </SidebarIconItemLink>
          )}
          {name && (
            <SidebarIconItemLink to="/profile" title="Profile">
              <FiUser />
            </SidebarIconItemLink>
          )}
          <SidebarIconItemLink to={`/wishlist/${id}`} title="Wishlist">
            <FiHeart />
          </SidebarIconItemLink>
          <SidebarIconItemLink to={`/cart/${id}`} title="Bag">
            <FiShoppingBag />
          </SidebarIconItemLink>
        </SidebarIconItemContainer>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
