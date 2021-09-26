// Author : Jaahnvi Hehar
// This file contains styled-components for all components in the Tab folder
import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  background: #dcdcdcd;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  z-index: 10;
  font-weight: bold;
  top: 80px;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const Tab = styled(LinkRouter)`
  text-decoration: none;
  color: #d0312d;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  font-size: 15px;
  width: 33.33%;
  height: 80px;
  top: 80px;
  padding-top: 30px;
  text-align: center;
  background: ${({ active }) => (active ? "#fff" : "#dedede")};
  border-bottom: ${({ active }) => (active ? "5px solid #d0312d" : "none")};

  &:hover {
    text-decoration: none;
    background: #d0312d;
    color: #fff;
    border-bottom: 2px solid #d0312d;
  }
`;
