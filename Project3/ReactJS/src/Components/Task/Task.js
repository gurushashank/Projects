import React from "react";
import { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Tabs from "../../Components/Tabs/Tabs";
import {
  Container,
  Button,
  Wrapper,
  Row,
  ColumnLeft,
  ColumnRight,
  Input,
  SaveButton,
  Label,
  TextArea,
  TaskContainer,
  Text,
  Title,
  Edit,
  Delete,
} from "./TabElements";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import uuid from "react-uuid";

const Task = (props) => {
  return (
    <Container>
      <TaskContainer>
        <Row>
          <ColumnLeft>
            <Title>{props.title}</Title>
          </ColumnLeft>
          <ColumnRight>
            <Delete
              onClick={(event) => {
                event.preventDefault();
                removeData(props.id);
              }}
            >
              <AiFillDelete />
            </Delete>
            <Edit
              onClick={(event) => {
                event.preventDefault();
                editData(props.id);
              }}
            >
              <FiEdit />
            </Edit>
          </ColumnRight>
        </Row>
        <Text>{props.due_date}</Text>
        <Text>{props.description}</Text>
      </TaskContainer>
    </Container>
  );
};

export default Task;
