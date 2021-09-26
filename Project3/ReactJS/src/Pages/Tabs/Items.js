import React from "react";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import {
  Row,
  ColumnLeft,
  ColumnRight,
  TaskContainer,
  Text,
  Title,
  Edit,
  Delete,
} from "./ItemListElements";
import AddItem from "./AddItem";

const Items = ({ items, completeItem, removeItem, updateItem }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateItem(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  const display = items.map((item, index) => {
    if (edit.id === item.id) {
      return <AddItem key={index} edit={edit} onSubmit={submitUpdate} />;
    } else {
      return (
        <TaskContainer key={index}>
          <Row>
            <ColumnLeft key={item.id} onClick={() => completeItem(item.id)}>
              <Title>{item.title}</Title>
              <Text>{item.date}</Text>
              <Text>{item.description}</Text>
            </ColumnLeft>
            <ColumnRight>
              <Delete onClick={() => removeItem(item.id)}>
                <AiFillDelete />
              </Delete>
              <Edit
                onClick={() =>
                  setEdit({
                    id: item.id,
                    value: item,
                  })
                }
              >
                <FiEdit />
              </Edit>
            </ColumnRight>
          </Row>
        </TaskContainer>
      );
    }
  });

  return <div>{display}</div>;
};

export default Items;
