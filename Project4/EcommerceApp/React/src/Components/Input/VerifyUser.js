import { EMAIL } from "../../Utils/Routes";
import Axios from "axios";

export async function sendEmail(email, code) {
  try {
    await Axios.post(EMAIL, {
      email: email,
      subject: "ANAHA - Verification Email",
      text: "Verification Code:" + code,
    }).then((res) => {
      console.log("Email sent!");
    });
  } catch (err) {
    console.error(err);
  }
}

export const verifyCode = (code) => {
  const enteredCode = prompt("Enter the verification code");
  if (code == enteredCode) {
    return true;
  } else {
    return false;
  }
};
