import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  background: #222a9b;
  height: 80px;
  font-weight: bold;
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const Tab = styled(LinkRouter)`
  text-decoration: none;
  color: #222a9b;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  font-size: 18px;
  width: 33.33%;
  height: 80px;
  top: 80px;
  padding-top: 30px;
  text-align: center;
  background: ${({ active }) => (active ? "#fff" : "#dedede")};
  border-bottom: ${({ active }) => (active ? "4px solid #222a9b" : "none")};

  &:hover {
    text-decoration: none;
    background: #222a9b;
    color: #fff;
    border-bottom: 2px solid #222a9b;
  }
`;
