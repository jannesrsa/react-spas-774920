import { useEffect, useState } from "react";
import { Route, useHistory, withRouter } from "react-router-dom";
import firebase from "./Firebase";

import Home from "./Home";
import Welcome from "./Welcome";
import Navigation from "./Navigation";
import Login from "./Login";
import Meetings from "./Meetings";
import Register from "./Register";

export const provider = new firebase.auth.GoogleAuthProvider();

const App = () => {
  const [user, setUser] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [userId, setUserId] = useState("");
  const history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setDisplayName(firebaseUser.displayName);
        setUserId(firebaseUser.uid);
      }
    });
  }, []);

  const logOutUser = (e) => {
    e.preventDefault();

    setUser("");
    setDisplayName("");
    setUserId("");

    firebase
      .auth()
      .signOut()
      .then(() => history.push("/login"));
  };

  const registerUser = (displayName) => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      firebaseUser
        .updateProfile({
          displayName: displayName,
        })
        .then(() => {
          setUser(firebaseUser);
          setDisplayName(displayName);
          setUserId(firebaseUser.uid);
        });
    });
  };

  const addMeeting = (meetingName) => {
    const ref = firebase.database().ref(`meetings/${userId}`);
    ref.push({ meetingName: meetingName });
  };

  return (
    <>
      <Navigation user={user} logOutUser={logOutUser} userId={userId} />
      {displayName && (
        <Welcome userName={displayName} logOutUser={logOutUser} />
      )}
      <Route path="/" exact render={(props) => <Home user={user} />}></Route>
      <Route path="/login" render={(props) => <Login />}></Route>
      <Route
        path="/meetings"
        render={(props) => <Meetings onAdd={addMeeting} />}
      ></Route>
      <Route
        path="/register"
        render={(props) => <Register registerUser={registerUser} />}
      ></Route>
    </>
  );
};

export default withRouter(App);
