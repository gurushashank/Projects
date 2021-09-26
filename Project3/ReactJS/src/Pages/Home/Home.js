import { useHistory } from "react-router-dom";
import Pool from "../../Pool/UserPool";
import { Container, Wrapper, Heading, Paragraph, Button } from "./HomeElements";
import Logo from "../../Components/Logo/Logo";

const Home = () => {
  const history = useHistory();

  const checkUserStatus = () => {
    const user = Pool.getCurrentUser();
    let loggedIn = false;
    if (user) {
      user.getSession((err, session) => {
        if (session) {
          loggedIn = true;
        }
      });
    }
    if (!loggedIn) {
      history.push("/login");
    } else {
      history.push("inbox");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Logo />
        <br />
        <Heading>
          Organize <br />
          &amp; Plan
        </Heading>
        <br />
        <Paragraph>
          We help you organize your work and life. Plan ahead and schedule your
          days. <br />
          Add all your tasks to the to-do list.
        </Paragraph>
        <br />
        <Button onClick={checkUserStatus}>Get Started</Button>
      </Wrapper>
    </Container>
  );
};

export default Home;
