import styled from "styled-components";

export const Container = styled.form`
  max-width: 80%;
  margin: 0 auto;
  padding: 20px;
`;

export const Wrapper = styled.form`
  margin: 0 auto;
  border: 2px solid #aaa;
  padding: 20px;
  margin-top: 30px;
  border-radius: 5px;
`;

export const Row = styled.div`
  display: flex;
`;

export const ColumnLeft = styled.div`
  flex: 80%;
  padding-right: 2%;
`;

export const ColumnRight = styled.div`
  flex: 20%;
`;

export const Label = styled.p`
  margin-top: 5px;
  margin-bottom: 10px;
  color: black;
  font-weight: bold;
  font-size: 18px;
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
  font-size: 18px;
  height: 40px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 2px solid #dddddd;
  background: #fdfcfb;
  outline: none;
  height: 80px;
  transition: border-color 0.5s;
  margin-left: auto;
  margin-right: auto;
  display: block;
  font-size: 18px;
`;

export const SaveButton = styled.button`
  margin-top: 10px;
  cursor: pointer;
  font-size: 1.1rem;
  color: white;
  background: #222a9b;
  border: 2px solid white;
  font-weight: 400;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 5px;
  width: 200px;
  text-align: center;

  &:hover {
    color: white;
    background: #000770;
    border: 2px solid white;
  }
`;

export const TaskContainer = styled.div`
  margin: 0 auto;
  border: 2px solid #aaa;
  padding: 20px;
  margin: 10px 0;
  border-radius: 5px;
  height: fit-content;
`;

export const Delete = styled.button`
  cursor: pointer;
  font-size: 18px;
  color: #ff5757;
  background: white;
  border: 2px solid #ff5757;
  padding-top: 5px;
  padding-left: 4px;
  padding-right: 4px;
  border-radius: 2.5px;
  text-align: center;
  float: right;
  margin-left: 15px;

  &:hover {
    color: white;
    background: #e44a4a;
    border: 2px solid #e44a4a;
  }
`;

export const Edit = styled.button`
  cursor: pointer;
  font-size: 18px;
  color: #00c2cb;
  background: white;
  border: 2px solid #00c2cb;
  padding-top: 5px;
  padding-left: 4px;
  padding-right: 4px;
  border-radius: 2.5px;
  text-align: center;
  float: right;
  margin-left: 15px;

  &:hover {
    color: white;
    background: #03989e;
    border: 2px solid #03989e;
  }
`;

export const Text = styled.p`
  font-size: 16px;
  margin-top: 4px;
`;

export const Title = styled.p`
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 10px;
`;
