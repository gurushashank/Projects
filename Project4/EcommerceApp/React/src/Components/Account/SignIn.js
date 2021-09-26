// Author : Jaahnvi Hehar
//This component is used to sign into account
import React from "react";
import {
  Container,
  Wrapper,
  Input,
  Button,
  H1,
  PGray,
  PGreen,
  P,
  ErrorP,
  Brand,
  Separator,
  BigContainer,
  H2,
} from "./AccountElements";
import useInput from "../Input/UseInput";
import Axios from "axios";
import Success from "./Success";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router";
import { isEmail, isPassword } from "../Input/Validate";
import { SIGN_IN } from "../../Utils/Routes";

const SignIn = () => {
  const history = useHistory();
  const [signInSuccess, setSignInSuccess] = useState(false);
  const [cookie, setCookie] = useCookies(["id", "name"]);

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

  //Check if user inputs are valid
  let formIsValid = false;
  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const saveInfo = () => {
    //User inputs are invalid
    if (!formIsValid) {
      emailBlurHandler();
      passwordBlurHandler();
    }
    //User inputs are valid
    else {
      Axios.post(SIGN_IN, {
        email: enteredEmail,
        password: enteredPassword,
      }).then((res) => {
        if (res.data.success === true) {
          setSignInSuccess(true);

          //Set cookie
          let expire = new Date();
          expire.setTime(expire.getTime() + 60 * 60 * 2 * 1000);
          setCookie("id", res.data.id, { path: "/", expire });
          setCookie("name", res.data.name, { path: "/", expire });
        } else {
          alert("Unsuccessful! Please try again!");
        }
      });
    }
  };

  return (
    <BigContainer>
      {signInSuccess && (
        <Success
          message={"Sign In Successful!"}
          action={() => {
            history.push("/shop");
          }}
          actionMessage={"We Have All Your New Favourites"}
          actionText={"SHOP NOW"}
        />
      )}
      {!signInSuccess && (
        <div>
          <H2>Get the Latest Collection of Beautiful Ethnic Wear</H2>
          <Container>
            <Wrapper>
              <Brand>ANAHA</Brand>
              <Separator />
              <H1>Sign In</H1>
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
              <Button error={!formIsValid} onClick={saveInfo}>
                SIGN IN
              </Button>
              <br /> <br /> <br /> <br />
              <PGray to="/signin/reset/password">Forgot Password ?</PGray>
              <P>
                Don't have an account?&nbsp;{" "}
                <PGreen to="/signup/profile">Sign up</PGreen>
              </P>
            </Wrapper>
          </Container>
        </div>
      )}
    </BigContainer>
  );
};

export default SignIn;
