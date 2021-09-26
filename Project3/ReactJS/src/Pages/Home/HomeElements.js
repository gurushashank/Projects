import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Wrapper = styled.div`
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 5%;
  margin-bottom: 5%;
`;

export const Heading = styled.p`
  color: #00c2cb;
  font-size: 90px;
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
  display: block;
  width: 200px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  float: left;

  &:hover {
    color: white;
    background: #000770;
    border: 2px solid white;
  }
`;

export const Paragraph = styled.p`
  margin-top: 5px;
  margin-bottom: 6px;
  color: black;
  font-weight: bold;
  font-size: 20px;
`;
