// Author : Jaahnvi Hehar
//This component is used to store user address details
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
  TextArea,
  ErrorP,
} from "./AccountElements";
import useInput from "../Input/UseInput";
import Axios from "axios";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router";
import { isAlphabetic, isZipCode } from "../Input/Validate";
import { ADD_ADDRESS } from "../../Utils/Routes";

const SignUpAddress = () => {
  const history = useHistory();
  const [cookie] = useCookies();
  const id = cookie.id;

  //Input handlers
  const {
    value: enteredAddress,
    setValue: setEnteredAddress,
    isValid: enteredAddressIsValid,
    hasError: addressInputHasError,
    valueChangeHandler: addressChangeHandler,
    valueBlurHandler: addressBlurHandler,
  } = useInput((value) => value.length > 0 && value.length <= 500);
  const {
    value: enteredCity,
    setValue: setEnteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangeHandler,
    valueBlurHandler: cityBlurHandler,
  } = useInput((value) => isAlphabetic(value));
  const {
    value: enteredZipCode,
    setValue: setEnteredZipCode,
    isValid: enteredZipCodeIsValid,
    hasError: zipCodeInputHasError,
    valueChangeHandler: zipCodeChangeHandler,
    valueBlurHandler: zipCodeBlurHandler,
  } = useInput((value) => isZipCode(value));

  //Check if user inputs are valid
  let formIsValid = false;
  if (enteredAddressIsValid && enteredCityIsValid && enteredZipCodeIsValid) {
    formIsValid = true;
  }

  const saveAddress = () => {
    //User inputs are invalid
    if (!formIsValid) {
      addressBlurHandler();
      cityBlurHandler();
      zipCodeBlurHandler();
    }
    //User inputs are valid
    else {
      Axios.post(ADD_ADDRESS, {
        user_id: id,
        address: enteredAddress,
        city: enteredCity,
        zip_code: enteredZipCode,
      }).then((res) => {
        if (res.data.success === true) {
          history.push("/signup/card");
        } else {
          alert("Unsuccessful! Please try again!");
        }
      });
    }
  };

  return (
    <BigContainer>
      <H2>Help us give you the best experience</H2>
      <Container>
        <Wrapper>
          <Brand>ANAHA</Brand>
          <Separator />
          <H1>Add Address</H1>
          <TextArea
            error={addressInputHasError}
            type="text"
            onChange={addressChangeHandler}
            onBlur={addressBlurHandler}
            value={enteredAddress}
            placeholder="Address"
          />
          {addressInputHasError && (
            <ErrorP>
              Invalid: Please enter your address! Maximum number of characters
              is 500!
            </ErrorP>
          )}
          <Input
            error={cityInputHasError}
            type="text"
            onChange={cityChangeHandler}
            onBlur={cityBlurHandler}
            value={enteredCity}
            placeholder="City"
          />
          {cityInputHasError && (
            <ErrorP>Invalid: Please enter a valid city name!</ErrorP>
          )}
          <Input
            error={zipCodeInputHasError}
            type="number"
            onChange={zipCodeChangeHandler}
            onBlur={zipCodeBlurHandler}
            value={enteredZipCode}
            placeholder="ZIP Code"
          />
          {zipCodeInputHasError && (
            <ErrorP>Invalid: Please enter a valid zip code!</ErrorP>
          )}
          <Button error={!formIsValid} onClick={saveAddress}>
            SAVE
          </Button>
          <Skip
            onClick={() => {
              history.push("/signup/card");
            }}
          >
            SKIP &gt;
          </Skip>
          <br /> <br /> <br />
        </Wrapper>
      </Container>
    </BigContainer>
  );
};

export default SignUpAddress;
