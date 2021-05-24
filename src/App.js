import { useEffect, useState } from "react";
import { Route, useHistory, withRouter } from "react-router-dom";
import firebase from "./Firebase";

import Home from "./Home";
import Welcome from "./Welcome";
import Navigation from "./Navigation";
import Login from "./Login";
import Meetings from "./Meetings";
import Register from "./Register";
import Checkin from "./Checkin";
import Attendees from "./Attendees";

export const provider = new firebase.auth.GoogleAuthProvider();

const App = () => {
  const [user, setUser] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [userId, setUserId] = useState("");
  const [meetings, setMeetings] = useState([]);
  // const [meetingCount, setMeetingCount] = useState(0);

  const history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setDisplayName(firebaseUser.displayName);
        setUserId(firebaseUser.uid);

        const meetingsRef = firebase
          .database()
          .ref(`meetings/${firebaseUser.uid}`);
        meetingsRef.on("value", (snapshot) => {
          let meetings = snapshot.val();
          let meetingList = [];

          for (let item in meetings) {
            meetingList.push({
              meetingID: item,
              meetingName: meetings[item].meetingName,
            });
          }

          setMeetings(meetingList);
          // setMeetingCount(meetingList.length);
        });
      } else {
        clearUser();
      }
    });
  }, []);

  const clearUser = () => {
    setUser("");
    setDisplayName("");
    setUserId("");
  };

  const logOutUser = (e) => {
    e.preventDefault();

    clearUser();

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
      <Navigation user={user} logOutUser={logOutUser} />
      {displayName && (
        <Welcome userName={displayName} logOutUser={logOutUser} />
      )}
      <Route path="/" exact render={() => <Home user={user} />}></Route>
      <Route path="/login" render={() => <Login />}></Route>
      <Route
        path="/meetings"
        render={() => (
          <Meetings onAdd={addMeeting} meetings={meetings} userId={userId} />
        )}
      ></Route>
      <Route
        path="/register"
        render={() => <Register registerUser={registerUser} />}
      ></Route>

      <Route path="/checkin/:userID/:meetingID" children={<Checkin />} />
      <Route
        path="/attendees/:userID/:meetingID"
        render={() => <Attendees adminUser={userId} />}
      />
    </>
  );
};

export default withRouter(App);
