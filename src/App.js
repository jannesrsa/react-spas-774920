import { useState } from "react";
import Home from "./Home";
import Welcome from "./Welcome";
import Navigation from "./Navigation";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState("Ray");

  return (
    <Router>
      <>
        {user && <Welcome user={user} />}
        <Navigation user={user} />
        <Route path="/" exact render={(props) => <Home user={user} />}></Route>
      </>
    </Router>
  );
};

export default App;
