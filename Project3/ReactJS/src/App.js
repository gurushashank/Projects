import "./App.css";
import { Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Authentication/Login";
import Signup from "./Pages/Authentication/Signup";
import Inbox from "./Pages/Tabs/Inbox";
import Upcoming from "./Pages/Tabs/Upcoming";
import Today from "./Pages/Tabs/Today";

function App() {
  return (
    <div>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/signup" exact>
        <Signup />
      </Route>
      <Route path="/inbox" exact>
        <Inbox />
      </Route>
      <Route path="/today" exact>
        <Today />
      </Route>
      <Route path="/upcoming" exact>
        <Upcoming />
      </Route>
    </div>
  );
}

export default App;
