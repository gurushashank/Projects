import styled from "styled-components";
import { Jumbotron } from "react-bootstrap";
import { Link as LinkRouter } from "react-router-dom";
import { Card } from "react-bootstrap";

export const CardPage = styled.div`
  overflow: hidden;
`;

export const WishListContainer = styled.div`
  width: 100%;
  height: auto;
  min-height: calc(100vh - 220px - 80px);
  margin-top: 10px;
  margin-left: 10px;
  display: grid;
  padding: 40px 50px 36px 30px;

  @media (min-width: 300px) {
    grid-gap: 2px;
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  @media (min-width: 768px) {
    grid-gap: 2px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (min-width: 1024px) {
    grid-gap: 40px;
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;

export const PageHeader = styled(Jumbotron)`
  background-color: #dedede;
  width: 100%;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  margin-bottom: 30px;

  border-radius: 5px;
  box-shadow: 0 0 8px 0 rgba(100, 100, 100, 0.25);
  cursor: pointer;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

  img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (min-width: 1024px) {
    &:hover {
      transform: scale(1.05);
    }
  }
`;

export const CloseButton = styled.button`
  border-radius: 20px;
  float: right;
  height: 24px;
  width: 24px;
  background-color: hsla(0, 0%, 100%, 0.6);
  border: 1.2px solid #d4d5d9;
  cursor: pointer;
  text-align: center;
  span {
    font-size: 15px;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const ProductName = styled(Card.Title)`
  padding: 0 0 0 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: medium;
`;

export const Price = styled.h6`
  padding: 0 0 0 1px;
`;

export const Heading = styled.h3`
  color: black;
`;

export const ItemcardRemoveIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  border-radius: 20px;
  height: 24px;
  width: 24px;
  background-color: hsla(0, 0%, 100%, 0.6);
  border: 1.2px solid #d4d5d9;
  cursor: pointer;
  text-align: center;
`;

export const ImageDiv = styled.div`
  position: relative;
  width: 100%;
  height: 80%;
`;

export const CartButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;
export const Button = styled(LinkRouter)`
  padding: 8px 30px;
  text-align: center;
  width: 100%;
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
