import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";

export const Nav = styled.nav`
  height: 80px;
  font-size: 1.2rem;
  border-bottom: 2px solid #222a9b;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const LogoContainer = styled(LinkRouter)`
  padding: 20px;
  margin-left: 3rem;
  cursor: pointer;
  text-decoration: none;
  font-size: 30px;
  color: black;
  font-weight: bold;

  &:hover {
    text-decoration;
  }
`;


export const LogoIcon = styled(BsPencilSquare)`
  color: #222a9b;
`;

export const LogoutButton = styled.button`
  cursor: pointer;
  font-size: 18px;
  color: #222a9b;
  background: white;
  border: 2px solid #222a9b;
  padding-top: 5px;
  padding-left: 4px;
  padding-right: 4px;
  border-radius: 2.5px;
  display: block;
  margin-right: 5rem;
  text-align: center;
  float: right;

  &:hover {
    color: white;
    background: #000770;
    border: 2px solid #000770;
  }
`;
