import { Jumbotron } from "react-bootstrap";
import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";

export const Card = styled.div`
  min-height: calc(100vh - 70px);
  display: block;
`;

export const PageHeader = styled(Jumbotron)`
  background-color: #dedede;
  width: 100%;
`;

export const Title = styled.h2`
  margin-top: 20px;
  text-align: center;
  color: black;
  font-size: 1.5rem;
`;

export const Wrap = styled.div`
  display: flex;
  margin: 20px 10px 60px 10px;
  max-width: 80%;
  margin: 0 auto;
  margin-bottom: 15px;
  background-color: #f5f5f5;
  opacity: 0.9;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

  &:hover {
    transform: scale(1.02);
    opacity: 1;
  }
`;

export const Span = styled.p`
  font-size: 17px;
  margin: 0;
  color: #282c3f;
`;

export const Span2 = styled.p`
  font-size: 16px;
  text-align: right;
  margin: 0;
`;

export const Action = styled.div`
  display: flex;
  margin-top: 70px;
`;

export const CancelButton = styled.button`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  border: none;
  margin-right: 15px;
`;

export const Stars = styled.div`
  font-size: 20px;
  border: mild grey;
`;

export const Image = styled.img`
  width: 100%;
  height: 95%;
  object-fit: cover;
  margin-top: 5px;
  cursor: pointer;
`;

export const Button = styled(LinkRouter)`
  padding: 8px 30px;
  color: #d0312d;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin: auto;
  display: block;
  text-decoration: none;
  border: 1px solid #d0312d;
  letter-spacing: 2px;

  &:hover {
    transition: all 0.2s ease-all-out;
    color: #fff;
    background: #d0312d;
    text-decoration: none;
  }

  @media screen and (max-width: 980px) {
    font-size: 12px;
    padding: 6px 20px;
  }

  @media screen and (max-width: 480px) {
    font-size: 10px;
    padding: 6px 20px;
  }
`;
