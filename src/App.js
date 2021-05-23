import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import firebase from "./Firebase";

import Home from "./Home";
import Welcome from "./Welcome";
import Navigation from "./Navigation";
import Login from "./Login";
import Meetings from "./Meetings";
import Register from "./Register";

export const provider = new firebase.auth.GoogleAuthProvider();

const App = () => {
  const [user, setUser] = useState("Ray");

  useEffect(() => {
    const ref = firebase.database().ref("user");
    ref.on("value", (snapshot) => {
      let firebaseUser = snapshot.val();
      setUser(firebaseUser);
    });
  }, []);

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
