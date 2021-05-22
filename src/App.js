import { useState } from "react";
import Header from "./Header";
import Home from "./Home";

const App = () => {
  const [user, setUser] = useState("Ray");

  return (
    <>
      <Header onChangeUser={setUser} />
      <Home user={user} />;
    </>
  );
};

export default App;
