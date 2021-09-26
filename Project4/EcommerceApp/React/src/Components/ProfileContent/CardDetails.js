// Author : Jaahnvi Hehar
//This component is used to update card details
import React from "react";
import {
  Wrapper,
  H1,
  Content,
  Label,
  LabelValue,
  Input,
  ErrorP,
  EditButton,
  SaveButton,
  Container,
} from "./ProfileContentElements";
import { useState, useEffect } from "react";
import useInput from "../Input/UseInput";
import Axios from "axios";
import { useCookies } from "react-cookie";
import { isAlphabetic, isCardNo, isExpirationDate } from "../Input/Validate";
import { GET_CARD, UPDATE_CARD, ADD_CARD } from "../../Utils/Routes";

const CardDetails = () => {
  const [cookie] = useCookies();
  const id = cookie.id;

  const [hide, setHide] = useState(false);
  const toggleHide = () => {
    setHide(!hide);
  };

  const [present, setPresent] = useState(false);

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

  //Fetch card information
  useEffect(() => {
    if (id) {
      Axios.post(GET_CARD, {
        user_id: id,
      }).then((response) => {
        if (response.data.success === true) {
          setEnteredCardholderName(response.data.cardholder_name);
          setEnteredCardNumber(response.data.card_number);
          setEnteredExpirationDate(response.data.expiration_date);
          setHide(false);
          setPresent(true);
        } else {
          setHide(true);
          setPresent(false);
        }
      });
    }
  }, []);

  //Check if user inputs are valid
  let formIsValid = false;
  if (
    enteredCardholderNameIsValid &&
    enteredCardNumberIsValid &&
    enteredExpirationDateIsValid
  ) {
    formIsValid = true;
  }

  //Update or Add card details
  const saveCard = () => {
    if (!formIsValid) {
      cardholderNameBlurHandler();
      cardNumberBlurHandler();
      expirationDateBlurHandler();
    } else {
      if (present) {
        Axios.put(UPDATE_CARD, {
          user_id: id,
          cardholder_name: enteredCardholderName,
          card_number: enteredCardNumber,
          expiration_date: enteredExpirationDate,
        }).then((res) => {
          if (res.data.success === true) {
            alert("Card update successful!");
          } else {
            alert("Unsuccessful! Please try again!");
          }
          toggleHide();
        });
      } else {
        Axios.post(ADD_CARD, {
          user_id: id,
          cardholder_name: enteredCardholderName,
          card_number: enteredCardNumber,
          expiration_date: enteredExpirationDate,
        }).then((res) => {
          if (res.data.success === true) {
            alert("Card added!");
            setHide(false);
            setPresent(true);
          } else {
            alert("Unsuccessful! Please try again!");
          }
        });
      }
    }
  };
  return (
    <Container>
      <Wrapper>
        <H1>Card Details</H1>
        <br />
        <Content>
          <tbody>
            <tr>
              <Label>Cardholder's Name</Label>
              <LabelValue hide={hide}>{enteredCardholderName}</LabelValue>
              <td>
                <Input
                  error={cardholderNameInputHasError}
                  hide={hide}
                  type="text"
                  onChange={cardholderNameChangeHandler}
                  onBlur={cardholderNameBlurHandler}
                  value={enteredCardholderName}
                />
                {cardholderNameInputHasError && (
                  <ErrorP>Invalid: Please enter a valid name!</ErrorP>
                )}
              </td>
            </tr>
            <tr>
              <Label>Card Number</Label>
              <LabelValue hide={hide}>{enteredCardNumber}</LabelValue>
              <td>
                <Input
                  error={cardNumberInputHasError}
                  hide={hide}
                  type="number"
                  onChange={cardNumberChangeHandler}
                  onBlur={cardNumberBlurHandler}
                  value={enteredCardNumber}
                />
                {cardNumberInputHasError && (
                  <ErrorP>Invalid: Please enter a valid card number!</ErrorP>
                )}
              </td>
            </tr>
            <tr>
              <Label>Expiration Date</Label>
              <LabelValue hide={hide}>{enteredExpirationDate}</LabelValue>
              <td>
                <Input
                  error={expirationDateInputHasError}
                  hide={hide}
                  type="month"
                  onChange={expirationDateChangeHandler}
                  onBlur={expirationDateBlurHandler}
                  value={enteredExpirationDate}
                />
                {expirationDateInputHasError && (
                  <ErrorP>
                    Invalid: Please enter a valid date! The card should be valid
                    for atleast a month from today's date!
                  </ErrorP>
                )}
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <EditButton onClick={toggleHide} hide={hide}>
                  EDIT
                </EditButton>
                <SaveButton onClick={saveCard} error={!formIsValid} hide={hide}>
                  SAVE
                </SaveButton>
              </td>
            </tr>
          </tbody>
        </Content>
        <br />
      </Wrapper>
    </Container>
  );
};

export default CardDetails;
