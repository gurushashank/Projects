// Author : Jaahnvi Hehar
//This files contains components for input validation

export const isEmail = (value) => {
  const email = /^[a-zA-Z0-9]+[a-zA-Z0-9._]*@[a-zA-Z0-9]+\.[A-Za-z]{2,}$/;
  if (value.match(email)) {
    return true;
  }
  return false;
};

export const isPassword = (value) => {
  const password = /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/;
  if (value.match(password)) {
    return true;
  }
  return false;
};

export const isZipCode = (value) => {
  const zip = /^[0-9]{6}$/;
  if (value.match(zip) && parseInt(value) > 99999) {
    return true;
  }
  return false;
};

export const isAlphabetic = (value) => {
  const alphabets = /^[a-zA-Z]+[a-zA-Z ]*$/;
  if (value.match(alphabets)) {
    return true;
  }
  return false;
};

export const isCardNo = (value) => {
  const cardNo = /^[0-9]{16}$/;
  if (value.match(cardNo)) {
    return true;
  }
  return false;
};

export const isExpirationDate = (value) => {
  let today = new Date();
  let date = value.split("-");
  if (
    parseInt(date[0]) === parseInt(today.getFullYear()) &&
    parseInt(date[1]) <= parseInt(today.getMonth() + 1)
  ) {
    return false;
  }
  return true;
};
