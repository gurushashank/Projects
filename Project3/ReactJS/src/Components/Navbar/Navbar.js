import { Nav, LogoContainer, LogoutButton, LogoIcon } from "./NavbarElements";
import { FiLogOut } from "react-icons/fi";
import Pool from "../../Pool/UserPool";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

function Navbar() {
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(["email"]);

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
      removeCookie("email");
    }
    history.push("/");
  };
  return (
    <div>
      <Nav>
        <LogoContainer to="/">
          <LogoIcon />
          &nbsp; ECRIRE
        </LogoContainer>
        <LogoutButton title="Log out" onClick={logout}>
          <FiLogOut />
        </LogoutButton>
      </Nav>
    </div>
  );
}

export default Navbar;
