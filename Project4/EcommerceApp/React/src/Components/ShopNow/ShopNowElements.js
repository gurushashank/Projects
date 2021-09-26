import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  padding: 20px;
`;

export const Wrapper = styled.div`
  width: 48%;
  margin: 1%;
  display: inline-block;
  background: black;
  position: relative;
  margin-bottom: 20px;

  @media screen and (max-width: 680px) {
    display: block;
    width: 100%;
  }
`;

export const Image = styled.img`
  width: 100%;
  opacity: 0.7;
`;

export const ImageContentContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 90%;
  border: 1px solid #fff;
  color: #fff;
`;

export const ImageContentH1 = styled.p`
  font-size: 24px;
  letter-spacing: 2px;
  margin-top: 30%;
  text-align: center;
  margin-bottom: 5px;
  font-weight: 500;

  @media screen and (max-width: 980px) {
    font-size: 20px;
    margin-top: 10%;
  }
`;

export const ImageContentH2 = styled.p`
  font-size: 40px;
  text-align: center;
  margin-bottom: 5px;
  font-weight: 200;

  @media screen and (max-width: 980px) {
    font-size: 35px;
  }
`;

export const ImageContentP = styled.p`
  font-size: 20px;
  text-align: center;

  @media screen and (max-width: 980px) {
    font-size: 18px;
  }
`;

export const H1 = styled.p`
  font-size: 45px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 2px;
  font-weight: 450;

  @media screen and (max-width: 980px) {
    font-size: 40px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled(LinkRouter)`
  padding: 8px 30px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin: auto;
  display: block;
  text-decoration: none;
  border: 1px solid #fff;
  letter-spacing: 2px;

  &:hover {
    transition: all 0.2s ease-all-out;
    color: #fff;
    background: #d0312d;
    text-decoration: none;
    border: 1px solid #d0312d;
  }

  @media screen and (max-width: 980px) {
    font-size: 14px;
    padding: 6px 20px;
  }
`;

export const Pattern = styled.img`
  width: 40px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 10px;

  @media screen and (max-width: 680px) {
    width: 15px;
  }
`;
