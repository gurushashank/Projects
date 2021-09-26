import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  padding: 20px;
`;

export const Wrapper = styled.div`
  width: 31.33%;
  margin: 1%;
  display: inline-block;
  position: relative;
  margin-bottom: 20px;

  @media screen and (max-width: 680px) {
    display: block;
    width: 100%;
  }
`;

export const Image = styled.img`
  width: 100%;
`;

export const H1 = styled.p`
  font-size: 45px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 2px;
  font-weight: 450;

  @media screen and (max-width: 980px) {
    font-size: 38px;
  }
`;

export const ImageContentH1 = styled.p`
  font-size: 32px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 2px;
  font-weight: 450;

  @media screen and (max-width: 980px) {
    font-size: 30px;
  }
`;

export const ImageContentP = styled.p`
  font-size: 20px;
  text-align: center;
  margin-bottom: 10px;

  @media screen and (max-width: 980px) {
    font-size: 18px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled(LinkRouter)`
  padding: 8px 30px;
  color: #d0312d;
  font-size: 16px;
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
    font-size: 15px;
    padding: 6px 20px;
  }
`;
