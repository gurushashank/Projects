import React from "react";
import {
  Wrapper,
  Row,
  ColumnLeft,
  ColumnRight,
  Input,
  SaveButton,
  Label,
  TextArea,
} from "./ItemListElements";
import { useState } from "react";
import uuid from "react-uuid";
import UserPool from "../../Pool/UserPool";

const AddItem = (props) => {
  const userId = UserPool.getCurrentUser().getUsername();
  const [title, setTitle] = useState(props.edit ? props.edit.value.title : "");
  const [date, setDate] = useState(props.edit ? props.edit.value.date : "");
  const [description, setDescription] = useState(
    props.edit ? props.edit.value.description : ""
  );

  const submit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: uuid(),
      user_id: userId,
      title: title,
      date: date,
      description: description,
    });

    setTitle("");
    setDate("");
    setDescription("");
  };

  return (
    <Wrapper onSubmit={submit}>
      <Row>
        <ColumnLeft>
          <Label>Title</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </ColumnLeft>
        <ColumnRight>
          <Label>Due Date</Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </ColumnRight>
      </Row>
      <Label>Description</Label>
      <TextArea
        type="text"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      {props.edit ? (
        <SaveButton>Update Task</SaveButton>
      ) : (
        <SaveButton>Save Task</SaveButton>
      )}
    </Wrapper>
  );
};

export default AddItem;
