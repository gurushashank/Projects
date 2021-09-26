import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { useState } from "react";
import UserPool from "../../Pool/UserPool";
import { useHistory } from "react-router-dom";
import {
  Container,
  Heading,
  Separator,
  Label,
  Input,
  Button,
  ErrorText,
  LinkText,
  Link,
} from "./AuthenticationElements";
import Logo from "../../Components/Logo/Logo";
import { useCookies } from "react-cookie";

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(["email"]);

  const onSubmit = (event) => {
    event.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {

        //Set Cookie
        let expire = new Date();
        expire.setTime(expire.getTime() + 60 * 60 * 2 * 1000);
        setCookie("email", email, { path: "/", expire });

        history.push("/inbox");
      },
      onFailure: (err) => {
        setError(err.message);
      },
    });
  };

  return (
    <div>
      <Container onSubmit={onSubmit}>
          <Logo />
          <br />
        <Heading>LOG IN</Heading>
        <Separator />
        <br />
        <Label>Email Address</Label>
        <Input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <ErrorText>{error}</ErrorText>
        <br />
        <Button type="submit">Log in</Button>
        <LinkText>
          Don't have an account yet? &nbsp;<Link to="/signup">Sign up</Link>
        </LinkText>
      </Container>
    </div>
  );
};

export default Login;
