import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";

export const Container = styled.form`
  max-width: 510px;
  margin: 0 auto;
  overflow: hidden;
  border: 2px solid black;
  padding: 40px;
  margin-top: 50px;
  border-radius: 5px;
`;

export const Heading = styled.p`
  margin-top: 5px;
  color: BLACK;
  font-size: 25px;
`;

export const Separator = styled.hr`
  width: 100%;
  margin: 20px auto;
  height: 3px;
  background: #303030;
`;

export const Label = styled.p`
  margin-top: 5px;
  margin-bottom: 10px;
  color: black;
  font-weight: bold;
  font-size: 16px;
`;

export const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 2px solid #dddddd;
  background: #fdfcfb;
  outline: none;
  transition: border-color 0.5s;
  margin-left: auto;
  margin-right: auto;
  display: block;
  font-size: 16px;
`;

export const Button = styled.button`
  cursor: pointer;
  font-size: 1.1rem;
  color: white;
  background: #222a9b;
  border: 2px solid white;
  font-weight: 400;
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 5px;
  width: 200px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  float: left;
  display: block;

  &:hover {
    color: white;
    background: #000770;
    border: 2px solid white;
  }
`;

export const ErrorText = styled.p`
  margin-top: 5px;
  margin-bottom: 10px;
  color: #ff1616;
  font-size: 16px;
`;

export const Link = styled(LinkRouter)`
  text-decoration: none;
  color: #00c2cb;
  font-weight: bold;
  font-size: 16px;
`;

export const LinkText = styled.p`
  margin-top: 100px;
  color: black;
  font-weight: bold;
  font-size: 16px;
  display: block;
`;
