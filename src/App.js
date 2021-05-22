import { useState } from "react";
import Home from "./Home";
import Welcome from "./Welcome";
import Navigation from "./Navigation";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import Meetings from "./Meetings";
import Register from "./Register";

const App = () => {
  const [user, setUser] = useState("Ray");

  return (
    <Router>
      <>
        {user && <Welcome user={user} />}
        <Navigation user={user} />
        <Route path="/" exact render={(props) => <Home user={user} />}></Route>
        <Route path="/login" render={(props) => <Login />}></Route>
        <Route path="/meetings" render={(props) => <Meetings />}></Route>
        <Route path="/register" render={(props) => <Register />}></Route>
      </>
    </Router>
  );
};

export default App;
