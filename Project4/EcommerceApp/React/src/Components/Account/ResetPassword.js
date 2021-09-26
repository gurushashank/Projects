// Author : Jaahnvi Hehar
//This component is used to reset password
import React from "react";
import {
  Container,
  Wrapper,
  Input,
  Button,
  H1,
  H2,
  ErrorP,
  Brand,
  Separator,
  BigContainer,
} from "./AccountElements";
import Success from "./Success";
import useInput from "../Input/UseInput";
import Axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import { isEmail, isPassword } from "../Input/Validate";
import { SIGN_IN_RESET_PASSWORD } from "../../Utils/Routes";
import { sendEmail, verifyCode } from "../Input/VerifyUser";

const ResetPassword = () => {
  let history = useHistory();
  const [resetSuccess, setResetSuccess] = useState(false);

  //Input handlers
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
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmPasswordIsValid
  ) {
    formIsValid = true;
  }

  const saveInfo = () => {
    //User inputs are invalid
    if (!formIsValid) {
      emailBlurHandler();
      passwordBlurHandler();
      confirmPasswordBlurHandler();
    }
    //User inputs are valid
    else {
      const code = Math.floor(100000 + Math.random() * 900000);
      sendEmail(enteredEmail, code).then(() => {
        if (verifyCode(code)) {
          Axios.put(SIGN_IN_RESET_PASSWORD, {
            email: enteredEmail,
            password: enteredPassword,
          }).then((res) => {
            if (res.data.success === true) {
              setResetSuccess(true);
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
      {resetSuccess && (
        <Success
          message={"Password has been Reset!"}
          action={() => {
            history.push("/signin");
          }}
          actionMessage={"Please sign into your account with the new password"}
          actionText={"SIGN IN"}
        />
      )}
      {!resetSuccess && (
        <div>
          <H2>We Got Your Back</H2>
          <Container>
            <Wrapper>
              <Brand>ANAHA</Brand>
              <Separator />
              <H1>Reset Password</H1>
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
                RESET
              </Button>
              <br /> <br /> <br />
            </Wrapper>
          </Container>
        </div>
      )}
    </BigContainer>
  );
};

export default ResetPassword;
