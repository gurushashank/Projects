import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 680px) {
    display: block;
    width: 100%;
  }
`;

export const Wrapper = styled.div`
  width: 50%;
  padding: 1%;
  display: inline-block;

  @media screen and (max-width: 680px) {
    display: block;
    width: 100%;
  }
`;

export const Image = styled.img`
  width: 100%;
  display: block;
`;

export const H1 = styled.p`
  margin-top: 20px;
  margin-bottom: 5px;
  font-size: 26px;
  letter-spacing: 2px;
  font-weight: 300;

  @media screen and (max-width: 980px) {
    font-size: 25px;
  }
`;

export const H2 = styled.p`
  font-size: 40px;
  margin-top: 2px;
  margin-bottom: 2px;
  font-weight: 450;

  @media screen and (max-width: 980px) {
    font-size: 38px;
  }
`;

export const P = styled.p`
  font-size: 20px;

  @media screen and (max-width: 980px) {
    font-size: 18px;
  }
`;

export const Pattern = styled.img`
  width: 50px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 10px;

  @media screen and (max-width: 680px) {
    width: 18px;
  }
`;