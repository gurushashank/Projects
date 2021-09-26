import styled from "styled-components";

export const Container = styled.div`
  max-width: 95%;
  margin: 0 auto;
  padding: 20px;
`;

export const Wrapper = styled.div`
  max-width: 510px;
  margin: 0 auto;
  padding: 20px;
  background: white;

  @media screen and (max-width: 680px) {
    max-width: 90%;
  }
`;

export const H1 = styled.p`
  font-size: 20px;
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

  &:hover {
    transition: all 0.2s ease-all-out;
    color: ${({ error }) => (error ? "#aaa" : "#fff")};
    background: ${({ error }) => (error ? "#fff" : "#d0312d")};
    text-decoration: none;
  }
`;

export const ErrorP = styled.p`
  color: #dc143c;
  margin-top: -5px;
  font-size: 12px;
  width: 100%;
  text-align: left;
`;
