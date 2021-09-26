// Author : Jaahnvi Hehar
//This component displays the success message on successful authentication
import React from "react";
import { Content, CheckMark, H1, Button } from "./AccountElements";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const Success = (props) => {
  return (
    <div onClick={props.action}>
      <Content>
        <CheckMark>
          <IoCheckmarkCircleSharp />
        </CheckMark>
        <H1>{props.message}</H1>
        <H1>{props.actionMessage}</H1>
        <Button onClick={props.action}>{props.actionText}</Button>
        <br />
      </Content>
    </div>
  );
};

export default Success;
