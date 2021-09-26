import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";

export const VideoContainer = styled.div`
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  height: 700px;
  position: relative;
  z-index: 1;
`;

export const VideoBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
`;

export const VideoComponent = styled.video`
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
`;

export const Content = styled.div`
  width: 100%;
  background: #fff;
  opacity: 0.7;
  height: 55%;

  @media screen and (max-width: 960px) {
    height: 70%;
  }
`;

export const DarkContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 15%;
`;

export const H1 = styled.p`
  font-size: 60px;
  text-align: center;

  @media screen and (max-width: 960px) {
    font-size: 45px;
  }
`;

export const P = styled.p`
  color: #303030;
  font-size: 20px;
  text-align: center;

  @media screen and (max-width: 960px) {
    font-size: 18px;
  }

  @media screen and (max-width: 480px) {
    font-size: 16px;
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

  @media screen and (max-width: 960px) {
    font-size: 14px;
  }

  @media screen and (max-width: 480px) {
    font-size: 12px;
  }
`;
