// Author : Jaahnvi Hehar
//This component is used to update user profile
import React from "react";
import {
  Wrapper,
  H1,
  Content,
  Label,
  LabelValue,
  Input,
  ErrorP,
  LabelHide,
  EditButton,
  SaveButton,
  Container,
  Separator,
  TrashButton,
  LabelHideAlt,
} from "./ProfileContentElements";
import { useState, useEffect } from "react";
import useInput from "../Input/UseInput";
import { isAlphabetic, isEmail, isPassword } from "../Input/Validate";
import Axios from "axios";
import { BsFillTrashFill } from "react-icons/bs";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import {
  GET_PROFILE,
  UPDATE_PROFILE,
  UPDATE_PASSWORD,
  DELETE_PROFILE,
  DELETE_ADDRESS,
  DELETE_CARD,
} from "../../Utils/Routes";
import { sendEmail, verifyCode } from "../Input/VerifyUser";

const ProfileDetails = () => {
  const history = useHistory();

  const [hideProfile, setHideProfile] = useState(false);
  const toggleHideProfile = () => {
    setHideProfile(!hideProfile);
  };
  const [hidePassword, setHidePassword] = useState(false);
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  //Input handlers
  const {
    value: enteredName,
    setValue: setEnteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
  } = useInput((value) => isAlphabetic(value.trim()));
  const {
    value: enteredEmail,
    setValue: setEnteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
  } = useInput((value) => isEmail(value.trim()));
  const {
    value: enteredPassword,
    setValue: setEnteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
  } = useInput((value) => isPassword(value.trim()));
  const {
    value: enteredConfirmPassword,
    setValue: setEnteredConfirmPassword,
    isValid: enteredConfirmPasswordIsValid,
    hasError: confirmPasswordInputHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    valueBlurHandler: confirmPasswordBlurHandler,
  } = useInput((value) => value === enteredPassword && value.trim() !== "");

  const [cookie, setCookie, removeCookie] = useCookies(["name", "id"]);
  const id = cookie.id;

  //Fetch profile information
  useEffect(() => {
    if (id) {
      Axios.post(GET_PROFILE, {
        user_id: id,
      }).then((response) => {
        setEnteredName(response.data.name);
        setEnteredEmail(response.data.email);
      });
    }
  }, []);

  //Check if user inputs are valid
  let formIsValid = false;
  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  //Update user profile
  const saveInfo = () => {
    nameBlurHandler();
    emailBlurHandler();

    if (formIsValid) {
      Axios.put(UPDATE_PROFILE, {
        user_id: id,
        name: enteredName,
        email: enteredEmail,
      }).then((res) => {
        if (res.data.success === true) {
          alert("Update successful!");
          let expire = new Date();
          expire.setTime(expire.getTime() + 60 * 60 * 24 * 1000);
          setCookie("id", id, {
            path: "/",
            expire,
          });
          setCookie("name", enteredName, {
            path: "/",
            expire,
          });
        } else {
          alert("Unsuccessful! Please try again!");
        }
        toggleHideProfile();
      });
    }
  };

  //Check if password is valid
  let passwordIsValid = false;
  if (enteredPasswordIsValid && enteredConfirmPasswordIsValid) {
    passwordIsValid = true;
  }

  //Update password
  const savePassword = () => {
    passwordBlurHandler();
    confirmPasswordBlurHandler();

    if (passwordIsValid) {
      Axios.put(UPDATE_PASSWORD, {
        user_id: id,
        password: enteredPassword,
      }).then((res) => {
        if (res.data.success === true) {
          alert("Password Change successful!");
        } else {
          alert("Unsuccessful! Please try again!");
        }
        toggleHidePassword();
      });
    }
  };

  //Delete user profile
  const deleteUser = () => {
    const code = Math.floor(100000 + Math.random() * 900000);
    sendEmail(enteredEmail, code).then(() => {
      if (verifyCode(code)) {
        Axios.post(DELETE_PROFILE, {
          user_id: id,
        }).then((res) => {
          if (res.data.success === true) {
            Axios.post(DELETE_ADDRESS, {
              user_id: id,
            });
            Axios.post(DELETE_CARD, {
              user_id: id,
            });
            alert("We are sorry to see you go!");
            removeCookie("id");
            removeCookie("name");
            history.push("");
          } else {
            alert("Unsuccessful! Please try again!");
          }
        });
      } else {
        alert("Unsuccessful! Please try again!");
      }
    });
  };

  return (
    <Container>
      <Wrapper>
        <H1>Profile Details</H1>
        <br />
        <Content>
          <tbody>
            <tr>
              <Label>Name</Label>
              <LabelValue hide={hideProfile}>{enteredName}</LabelValue>
              <td>
                <Input
                  hide={hideProfile}
                  error={nameInputHasError}
                  type="text"
                  onChange={nameChangeHandler}
                  onBlur={nameBlurHandler}
                  value={enteredName}
                />
                {nameInputHasError && (
                  <ErrorP>Invalid: Please enter alphabets!</ErrorP>
                )}
              </td>
            </tr>
            <tr>
              <Label>Email ID</Label>
              <LabelValue hide={hideProfile}>{enteredEmail}</LabelValue>
              <td>
                <Input
                  hide={hideProfile}
                  error={emailInputHasError}
                  type="text"
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                  value={enteredEmail}
                />
                {emailInputHasError && (
                  <ErrorP>Invalid: Please enter a valid email address!</ErrorP>
                )}
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <EditButton onClick={toggleHideProfile} hide={hideProfile}>
                  EDIT
                </EditButton>
                <SaveButton
                  onClick={saveInfo}
                  error={!formIsValid}
                  hide={hideProfile}
                >
                  SAVE
                </SaveButton>
              </td>
            </tr>
          </tbody>
        </Content>
        <br />
        <Separator />
        <br />
        <H1>Change Password</H1>
        <br />
        <Content>
          <tbody>
            <tr>
              <LabelHideAlt hide={hidePassword}>
                Would you like to update your password?
              </LabelHideAlt>
              <td>
                <EditButton hide={hidePassword} onClick={toggleHidePassword}>
                  UPDATE
                </EditButton>
              </td>
            </tr>
            <tr>
              <LabelHide hide={hidePassword}>Password</LabelHide>
              <td>
                <Input
                  hide={hidePassword}
                  error={passwordInputHasError}
                  type="password"
                  onChange={passwordChangeHandler}
                  onBlur={passwordBlurHandler}
                  value={enteredPassword}
                />
                {passwordInputHasError && (
                  <ErrorP>
                    Invalid: Please enter alphabets, numbers or special
                    charcters! Minimum length of password should be 8!
                  </ErrorP>
                )}
              </td>
            </tr>
            <tr>
              <LabelHide hide={hidePassword}>Confirm Password</LabelHide>
              <td>
                <Input
                  hide={hidePassword}
                  error={confirmPasswordInputHasError}
                  type="password"
                  onChange={confirmPasswordChangeHandler}
                  onBlur={confirmPasswordBlurHandler}
                  value={enteredConfirmPassword}
                />
                {confirmPasswordInputHasError && (
                  <ErrorP>Invalid: Please enter the same password!</ErrorP>
                )}
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <SaveButton
                  onClick={savePassword}
                  error={!passwordIsValid}
                  hide={hidePassword}
                >
                  SAVE
                </SaveButton>
              </td>
            </tr>
          </tbody>
        </Content>
        <br />
        <Separator />
        <br />
        <H1>Delete Profile</H1>
        <br />
        <Content>
          <tbody>
            <tr>
              <Label>Deleting your account is an Irreversible Action</Label>
              <td>
                <TrashButton onClick={deleteUser}>
                  <BsFillTrashFill />
                </TrashButton>
              </td>
            </tr>
          </tbody>
        </Content>
        <br />
      </Wrapper>
    </Container>
  );
};

export default ProfileDetails;
