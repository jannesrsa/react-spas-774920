import { useState } from "react";
import FormError from "./FormError";
import firebase from "./Firebase";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();

    setErrorMessage("");

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/meetings");
      })
      .catch((error) => {
        if (error.message) {
          setErrorMessage(error.message);
        }
      });
  };

  return (
    <form className="mt-3" onSubmit={onSubmit}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card bg-light">
              <div className="card-body">
                <h3 className="font-weight-light mb-3">Log in</h3>
                <section className="form-group">
                  {errorMessage && <FormError theMessage={errorMessage} />}
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <small id="emailHelp" class="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </section>
                <section className="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </section>
                <div className="form-group text-right mb-0">
                  <button className="btn btn-primary" type="submit">
                    Log in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
