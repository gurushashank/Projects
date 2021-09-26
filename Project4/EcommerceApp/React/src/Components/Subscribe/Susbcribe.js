import React from "react";
import {
  Button,
  Container,
  H1,
  H2,
  Input,
  Wrapper,
  ErrorP,
} from "./SubscribeElements";
import useInput from "../Input/UseInput";
import { isAlphabetic, isEmail } from "../Input/Validate";
import Axios from "axios";
import { ADD_SUBSCRIBER } from "../../Utils/Routes";
import { EMAIL } from "../../Utils/Routes";

const Susbcribe = () => {
  //Input handlers
  const {
    value: enteredName,
    setValue: setEnteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
  } = useInput((value) => isAlphabetic(value));
  const {
    value: enteredEmail,
    setValue: setEnteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
  } = useInput((value) => isEmail(value));

  //Check if user inputs are valid
  let formIsValid = false;
  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const saveInfo = () => {
    //User inputs are invalid
    if (!formIsValid) {
      nameBlurHandler();
      emailBlurHandler();
    }
    //User inputs are valid
    else {
      Axios.post(ADD_SUBSCRIBER, {
        name: enteredName,
        email: enteredEmail,
      })
        .then((res) => {
          if (res.data.success === true) {
            alert("Subscription successful");
            Axios.post(EMAIL, {
              email: enteredEmail,
              subject: "ANAHA - Ethnic Wear At Its Best",
              text: "Welcome to Anaha! \nVisit our website our latest collection!",
            });
          } else {
            alert("Unsuccessful! Please try again!");
          }
        })
        .catch((err) => {
          alert("Unsuccessful! Please try again!");
        });
    }
  };

  return (
    <Container>
      <Wrapper>
        <center>
          <H1>NEWSLETTER</H1>
          <H2>Keep In Touch</H2>
          <br />
          <Input
            error={nameInputHasError}
            type="text"
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
            placeholder="Name"
          />
          {nameInputHasError && (
            <ErrorP>Invalid: Please enter alphabets!</ErrorP>
          )}
          <Input
            error={emailInputHasError}
            type="text"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
            placeholder="Email ID"
          />
          {emailInputHasError && (
            <ErrorP>Invalid: Please enter a valid email address!</ErrorP>
          )}
          <Button error={!formIsValid} onClick={saveInfo}>
            SUBSCRIBE
          </Button>
          <br />
        </center>
      </Wrapper>
    </Container>
  );
};

export default Susbcribe;
