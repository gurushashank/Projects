// Author : Jaahnvi Hehar
//This component is used to store user details
import React from "react";
import {
  Container,
  Wrapper,
  Input,
  Button,
  H1,
  H2,
  P,
  PGreen,
  ErrorP,
  Brand,
  Separator,
  BigContainer,
} from "./AccountElements";
import useInput from "../Input/UseInput";
import Axios from "axios";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router";
import { isAlphabetic, isEmail, isPassword } from "../Input/Validate";
import { ADD_PROFILE } from "../../Utils/Routes";
import { sendEmail, verifyCode } from "../Input/VerifyUser";

const SignUpProfile = () => {
  let history = useHistory();
  const [cookie, setCookie] = useCookies(["id", "name"]);

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
  const {
    value: enteredPassword,
    setValue: setEnteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
  } = useInput((value) => isPassword(value));
  const {
    value: enteredConfirmPassword,
    setValue: setEnteredConfirmPassword,
    isValid: enteredConfirmPasswordIsValid,
    hasError: confirmPasswordInputHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    valueBlurHandler: confirmPasswordBlurHandler,
  } = useInput((value) => value === enteredPassword && value.trim() !== "");

  //Check if user inputs are valid
  let formIsValid = false;
  if (
    enteredNameIsValid &&
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmPasswordIsValid
  ) {
    formIsValid = true;
  }

  const saveInfo = () => {
    //User inputs are invalid
    if (!formIsValid) {
      nameBlurHandler();
      emailBlurHandler();
      passwordBlurHandler();
      confirmPasswordBlurHandler();
    }
    //User inputs are valid
    else {
      const code = Math.floor(100000 + Math.random() * 900000);
      sendEmail(enteredEmail, code).then(() => {
        if (verifyCode(code)) {
          Axios.post(ADD_PROFILE, {
            name: enteredName,
            email: enteredEmail,
            password: enteredPassword,
          }).then((res) => {
            if (res.data.success === true) {
              //Set cookie
              let expire = new Date();
              expire.setTime(expire.getTime() + 60 * 60 * 2 * 1000);
              setCookie("id", res.data.id, { path: "/", expire });
              setCookie("name", res.data.name, { path: "/", expire });
              history.push("/signup/address");
            } else {
              alert("Unsuccessful! Please try again!");
            }
          });
        } else {
          alert("Unsuccessful! Please try again!");
        }
      });
    }
  };

  return (
    <BigContainer>
      <H2>Get the Latest Collection of Beautiful Ethnic Wear</H2>
      <Container>
        <Wrapper>
          <Brand>ANAHA</Brand>
          <Separator />
          <H1>Sign Up</H1>
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
          <Input
            error={passwordInputHasError}
            type="password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
            placeholder="Password"
          />
          {passwordInputHasError && (
            <ErrorP>
              Invalid: Please enter alphabets, numbers or special charcters!
              Minimum length of password should be 8!
            </ErrorP>
          )}
          <Input
            error={confirmPasswordInputHasError}
            type="password"
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
            value={enteredConfirmPassword}
            placeholder="Confirm Password"
          />
          {confirmPasswordInputHasError && (
            <ErrorP>Invalid: Please enter the same password!</ErrorP>
          )}
          <Button error={!formIsValid} onClick={saveInfo}>
            SIGN UP
          </Button>
          <br /> <br /> <br />
          <P>
            Already have an account?&nbsp; <PGreen to="/signin">Sign in</PGreen>
          </P>
        </Wrapper>
      </Container>
    </BigContainer>
  );
};

export default SignUpProfile;
