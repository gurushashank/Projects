// Author : Jaahnvi Hehar
//This component is used to store user card details
import React from "react";
import {
  Brand,
  Container,
  H1,
  H2,
  Input,
  Separator,
  Wrapper,
  Button,
  Skip,
  BigContainer,
  ErrorP,
} from "./AccountElements";
import useInput from "../Input/UseInput";
import Axios from "axios";
import { useCookies } from "react-cookie";
import { useState } from "react";
import Success from "./Success";
import { useHistory } from "react-router";
import { isAlphabetic, isCardNo, isExpirationDate } from "../Input/Validate";
import { ADD_CARD } from "../../Utils/Routes";

const SignUpCard = () => {
  let history = useHistory();
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [cookie] = useCookies();
  const id = cookie.id;

  //Input handlers
  const {
    value: enteredCardholderName,
    setValue: setEnteredCardholderName,
    isValid: enteredCardholderNameIsValid,
    hasError: cardholderNameInputHasError,
    valueChangeHandler: cardholderNameChangeHandler,
    valueBlurHandler: cardholderNameBlurHandler,
  } = useInput((value) => isAlphabetic(value));
  const {
    value: enteredCardNumber,
    setValue: setEnteredCardNumber,
    isValid: enteredCardNumberIsValid,
    hasError: cardNumberInputHasError,
    valueChangeHandler: cardNumberChangeHandler,
    valueBlurHandler: cardNumberBlurHandler,
  } = useInput((value) => isCardNo(value));
  const {
    value: enteredExpirationDate,
    setValue: setEnteredExpirationDate,
    isValid: enteredExpirationDateIsValid,
    hasError: expirationDateInputHasError,
    valueChangeHandler: expirationDateChangeHandler,
    valueBlurHandler: expirationDateBlurHandler,
  } = useInput((value) => isExpirationDate(value) && value.trim() !== "");

  //Check if user inputs are valid
  let formIsValid = false;
  if (
    enteredCardholderNameIsValid &&
    enteredCardNumberIsValid &&
    enteredExpirationDateIsValid
  ) {
    formIsValid = true;
  }

  const saveCard = () => {
    //User inputs are invalid
    if (!formIsValid) {
      cardholderNameBlurHandler();
      cardNumberBlurHandler();
      expirationDateBlurHandler();
    }
    //User inputs are valid
    else {
      Axios.post(ADD_CARD, {
        user_id: id,
        cardholder_name: enteredCardholderName,
        card_number: enteredCardNumber,
        expiration_date: enteredExpirationDate,
      }).then((res) => {
        if (res.data.success === true) {
          setSignUpSuccess(true);
        } else {
          alert("Unsuccessful! Please try again!");
        }
      });
    }
  };

  return (
    <BigContainer>
      {signUpSuccess && (
        <Success
          message={"Sign Up Successful!"}
          action={() => {
            history.push("/shop");
          }}
          actionMessage={"We want to provide you with the Best"}
          actionText={"SHOP NOW"}
        />
      )}
      {!signUpSuccess && (
        <div>
          <H2>Help us give you the best experience</H2>
          <Container>
            <Wrapper>
              <Brand>ANAHA</Brand>
              <Separator />
              <H1>Add Card</H1>
              <Input
                error={cardholderNameInputHasError}
                type="text"
                onChange={cardholderNameChangeHandler}
                onBlur={cardholderNameBlurHandler}
                value={enteredCardholderName}
                placeholder="Cardholder's Name"
              />
              {cardholderNameInputHasError && (
                <ErrorP>Invalid: Please enter a valid name!</ErrorP>
              )}
              <Input
                error={cardNumberInputHasError}
                type="number"
                onChange={cardNumberChangeHandler}
                onBlur={cardNumberBlurHandler}
                value={enteredCardNumber}
                placeholder="Card Number"
              />
              {cardNumberInputHasError && (
                <ErrorP>Invalid: Please enter a valid card number!</ErrorP>
              )}
              <Input
                error={expirationDateInputHasError}
                type="month"
                onChange={expirationDateChangeHandler}
                onBlur={expirationDateBlurHandler}
                value={enteredExpirationDate}
                placeholder="Expiration Date"
              />
              {expirationDateInputHasError && (
                <ErrorP>
                  Invalid: Please enter a valid date! The card should be valid
                  for atleast a month from today's date!
                </ErrorP>
              )}
              <Button onClick={saveCard}>SAVE</Button>
              <Skip
                onClick={() => {
                  setSignUpSuccess(true);
                }}
              >
                {" "}
                SKIP &gt;{" "}
              </Skip>
              <br /> <br /> <br />
            </Wrapper>
          </Container>
        </div>
      )}
    </BigContainer>
  );
};

export default SignUpCard;
