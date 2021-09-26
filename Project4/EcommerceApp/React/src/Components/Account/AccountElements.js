// Author : Jaahnvi Hehar
// This file contains styled-components for all components in the folder Account
import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";

export const Container = styled.div`
  max-width: 510px;
  margin: 0 auto;
  padding: 20px;
  border: 2px solid #aaa;
  box-shadow: 0 0 8px 0 rgba(100, 100, 100, 0.25);

  @media screen and (max-width: 680px) {
    max-width: 90%;
  }
`;

export const Brand = styled.div`
  text-decoration: none;
  font-size: 2rem;
  color: #d0312d;

  &:hover {
    text-decoration: none;
  }
`;

export const Separator = styled.hr`
  width: 100%;
  margin: 20px auto;
  height: 1px;
  background: #303030;
`;

export const H1 = styled.h3`
  margin-top: 30px;
  margin-bottom: 20px;
`;

export const Wrapper = styled.div`
  padding: 20px;
`;

export const Input = styled.input`
  width: 100%;
  background: #fdfcfb;
  border: ${({ error }) =>
    error ? "2px solid #dc143c;" : "2px solid #dddddd"};
  outline: none;
  height: 45px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  background: #fdfcfb;
  border: ${({ error }) =>
    error ? "2px solid #dc143c;" : "2px solid #dddddd"};
  outline: none;
  height: 100px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
`;

export const Button = styled.button`
  margin-top: 10px;
  padding: 8px 30px;
  color: ${({ error }) => (error ? "#aaa" : "#d0312d")};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  border: ${({ error }) => (error ? "2px solid #aaa" : "1px solid #d0312d")};
  letter-spacing: 2px;
  background: #fff;
  display: block;
  float: left;

  &:hover {
    transition: all 0.2s ease-all-out;
    color: ${({ error }) => (error ? "#aaa" : "#fff")};
    background: ${({ error }) => (error ? "#fff" : "#d0312d")};
    text-decoration: none;
  }
`;

export const PGray = styled(LinkRouter)`
  text-decoration: none;
  font-size: 16px;
  margin-top: 16px;
  font-weight: 450;
  color: #808080;

  &:hover {
    text-decoration: none;
    color: black;
  }
`;

export const P = styled.p`
  font-size: 17px;
  margin-top: 16px;
  font-weight: 450;
  color: black;
`;

export const PGreen = styled(LinkRouter)`
  text-decoration: none;
  font-size: 17px;
  margin-top: 16px;
  font-weight: 550;
  display: inline;
  color: #59981a;

  &:hover {
    text-decoration: none;
    color: #81b622;
  }
`;

export const ErrorP = styled.p`
  color: #dc143c;
  margin-top: -5px;
  font-size: 12px;
  width: 100%;
`;

export const Skip = styled.div`
  margin-top: 10px;
  padding: 8px 0;
  color: #aaa;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  letter-spacing: 2px;
  background: #fff;
  display: block;
  float: right;
  text-align: right;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-all-out;
    color: black;
    text-decoration: none;
  }
`;

export const H2 = styled.p`
  font-size: 30px;
  font-weight: 380px;
  color: #808080;
  text-align: center;
  margin-bottom: 30px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const BigContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 50px;
  padding-bottom: 80px;
`;

export const CheckMark = styled.div`
  color: #59981a;
  font-size: 150px;
  margin-top: -50px;
`;

export const Content = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  background-color: #fff;
  z-index: 200;
  border: 2px solid #aaa;
  box-shadow: 0 0 8px 0 rgba(100, 100, 100, 0.25);
  padding: 20px;
  width: 800px;

  @media screen and (max-width: 960px) {
    max-width: 90%;
  }
`;
