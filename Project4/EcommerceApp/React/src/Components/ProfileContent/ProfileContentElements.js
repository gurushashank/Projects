// Author : Jaahnvi Hehar
// This file contains styled-components for all components in the folder ProfileContent

import styled from "styled-components";

export const Container = styled.div`
  margin: 5% 0;
`;

export const H1 = styled.h3`
  text-align: left;
`;

export const Wrapper = styled.div`
  margin: 2% auto;
  display: block;
  width: 66%;
  padding: 50px;
  vertical-align: top;
  min-height: fit-content;
  border: 2px solid #aaa;
  box-shadow: 0 0 8px 0 rgba(100, 100, 100, 0.25);

  @media screen and (max-width: 960px) {
    width: 95%;
    padding: 20px;
    border: none;
    box-shadow: none;
  }
`;

export const Content = styled.table`
  margin: 0 auto;
  width: 80%;
`;

export const Label = styled.td`
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  padding: 10px;
  overflow-wrap: break-word;
  width: 30%;
  vertical-align: top;
`;

export const LabelHide = styled.td`
  font-size: 15px;
  font-weight: bold;
  text-align: left;
  padding: 10px;
  overflow-wrap: break-word;
  width: 30%;
  vertical-align: top;
  display: ${({ hide }) => (hide ? "" : "none")};
`;

export const LabelHideAlt = styled.td`
  font-size: 15px;
  font-weight: bold;
  text-align: left;
  padding: 10px;
  overflow-wrap: break-word;
  width: 30%;
  vertical-align: top;
  display: ${({ hide }) => (hide ? "none" : "")};
`;

export const LabelValue = styled.td`
  font-weight: 450;
  font-size: 18px;
  overflow-wrap: break-word;
  width: 70%;
  text-align: left;
  padding: 10px;
  display: ${({ hide }) => (hide ? "none" : "block")};
`;

export const EditButton = styled.button`
  margin-top: 10px;
  padding: 8px 30px;
  color: #d0312d;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  border: 1px solid #d0312d;
  letter-spacing: 2px;
  background: #fff;
  float: right;
  display: ${({ hide }) => (hide ? "none" : "inline-block")};

  &:hover {
    transition: all 0.2s ease-all-out;
    color: #fff;
    background: #d0312d;
    text-decoration: none;
  }
`;

export const SaveButton = styled.button`
  margin-top: 10px;
  padding: 8px 30px;
  color: ${({ error }) => (error ? "#aaa" : "#d0312d")};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  border: 1px solid ${({ error }) => (error ? "#aaa" : "#d0312d")};
  letter-spacing: 2px;
  background: #fff;
  display: ${({ hide }) => (hide ? "inline-block" : "none")};
  float: right;

  &:hover {
    transition: all 0.2s ease-all-out;
    color: #fff;
    background: ${({ error }) => (error ? "#aaa" : "#d0312d")};
    text-decoration: none;
  }
`;

export const ErrorP = styled.p`
  color: #dc143c;
  font-size: 12px;
`;

export const Input = styled.input`
  width: 100%;
  background: #fdfcfb;
  border: ${({ error }) =>
    error ? "2px solid #dc143c;" : "2px solid #dddddd"};
  outline: none;
  height: 45px;
  margin-bottom: 5px;
  padding: 10px;
  font-size: 16px;
  display: ${({ hide }) => (hide ? "block" : "none")};
`;

export const TextArea = styled.textarea`
  width: 100%;
  background: #fdfcfb;
  border: ${({ error }) =>
    error ? "2px solid #dc143c;" : "2px solid #dddddd"};
  outline: none;
  height: 100px;
  margin-bottom: 5px;
  padding: 10px;
  font-size: 16px;
  display: ${({ hide }) => (hide ? "block" : "none")};
`;

export const Separator = styled.hr`
  width: 100%;
  margin: 20px auto;
  height: 0;
  background: #303030;
`;

export const TrashButton = styled.button`
  margin-top: 10px;
  padding: 8px 30px;
  color: #d0312d;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  border: 1px solid #d0312d;
  letter-spacing: 2px;
  background: #fff;
  display: inline-block;
  float: right;

  &:hover {
    transition: all 0.2s ease-all-out;
    color: #fff;
    background: #d0312d;
  }
`;
