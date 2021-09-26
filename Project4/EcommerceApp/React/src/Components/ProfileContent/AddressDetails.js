// Author : Jaahnvi Hehar
//This component is used to update address details
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
  TextArea,
} from "./ProfileContentElements";
import { useState, useEffect } from "react";
import useInput from "../Input/UseInput";
import Axios from "axios";
import { useCookies } from "react-cookie";
import { isAlphabetic, isZipCode } from "../Input/Validate";
import { UPDATE_ADDRESS, GET_ADDRESS, ADD_ADDRESS } from "../../Utils/Routes";

const AddressDetails = () => {
  const [cookie] = useCookies();
  const id = cookie.id;

  const [hide, setHide] = useState(false);
  const toggleHide = () => {
    setHide(!hide);
  };

  const [present, setPresent] = useState(false);

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

  //Fetch address information
  useEffect(() => {
    if (id) {
      Axios.post(GET_ADDRESS, {
        user_id: id,
      }).then((response) => {
        console.log(response);
        if (response.data.success === true) {
          setEnteredAddress(response.data.address);
          setEnteredCity(response.data.city);
          setEnteredZipCode(response.data.zip_code);
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
  if (enteredAddressIsValid && enteredCityIsValid && enteredZipCodeIsValid) {
    formIsValid = true;
  }

  //Update or Add address details
  const saveAddress = () => {
    if (!formIsValid) {
      addressBlurHandler();
      cityBlurHandler();
      zipCodeBlurHandler();
    } else {
      if (present) {
        Axios.put(UPDATE_ADDRESS, {
          user_id: id,
          address: enteredAddress,
          city: enteredCity,
          zip_code: enteredZipCode,
        }).then((res) => {
          if (res.data.success === true) {
            alert("Address update successful!");
          } else {
            alert("Unsuccessful! Please try again!");
          }
          toggleHide();
        });
      } else {
        Axios.post(ADD_ADDRESS, {
          user_id: id,
          address: enteredAddress,
          city: enteredCity,
          zip_code: enteredZipCode,
        }).then((res) => {
          if (res.data.success === true) {
            alert("Address added successful!");
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
        <H1>Address Details</H1>
        <br />
        <Content>
          <tbody>
            <tr>
              <Label>Address</Label>
              <LabelValue hide={hide}>{enteredAddress}</LabelValue>
              <td>
                <TextArea
                  hide={hide}
                  error={addressInputHasError}
                  type="text"
                  onChange={addressChangeHandler}
                  onBlur={addressBlurHandler}
                  value={enteredAddress}
                />
                {addressInputHasError && (
                  <ErrorP>
                    Invalid: Please enter your address! Maximum number of
                    characters is 500!
                  </ErrorP>
                )}
              </td>
            </tr>
            <tr>
              <Label>City</Label>
              <LabelValue hide={hide}>{enteredCity}</LabelValue>
              <td>
                <Input
                  hide={hide}
                  error={cityInputHasError}
                  type="text"
                  onChange={cityChangeHandler}
                  onBlur={cityBlurHandler}
                  value={enteredCity}
                />
                {cityInputHasError && (
                  <ErrorP>Invalid: Please enter a valid city name!</ErrorP>
                )}
              </td>
            </tr>
            <tr>
              <Label>ZIP Code</Label>
              <LabelValue hide={hide}>{enteredZipCode}</LabelValue>
              <td>
                <Input
                  hide={hide}
                  error={zipCodeInputHasError}
                  type="text"
                  onChange={zipCodeChangeHandler}
                  onBlur={zipCodeBlurHandler}
                  value={enteredZipCode}
                />
                {zipCodeInputHasError && (
                  <ErrorP>Invalid: Please enter a valid zip code!</ErrorP>
                )}
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <EditButton onClick={toggleHide} hide={hide}>
                  EDIT
                </EditButton>
                <SaveButton
                  onClick={saveAddress}
                  error={!formIsValid}
                  hide={hide}
                >
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

export default AddressDetails;
