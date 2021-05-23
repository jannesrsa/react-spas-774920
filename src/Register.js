import { useState } from "react";
import FormError from "./FormError";

const Register = ({ user }) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [passOne, setPassOne] = useState("");
  const [passTwo, setPassTwo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (passOne !== passTwo) {
      setErrorMessage("Passwords don't match");
      return;
    }
  };

  return (
    <form className="mt-3" onSubmit={onSubmit}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card bg-light">
              <div className="card-body">
                <h3 className="font-weight-light mb-3">Register</h3>
                <div className="form-row">
                  {errorMessage && <FormError theMessage={errorMessage} />}
                  <section className="col-sm-12 form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="displayName"
                    >
                      Display Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="displayName"
                      placeholder="Display Name"
                      name="displayName"
                      required
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  </section>
                </div>
                <section className="form-group">
                  <label className="form-control-label sr-only" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </section>
                <div className="form-row">
                  <section className="col-sm-6 form-group">
                    <input
                      className="form-control"
                      type="password"
                      name="passOne"
                      placeholder="Password"
                      value={passOne}
                      onChange={(e) => setPassOne(e.target.value)}
                    />
                  </section>
                  <section className="col-sm-6 form-group">
                    <input
                      className="form-control"
                      type="password"
                      required
                      name="passTwo"
                      placeholder="Repeat Password"
                      value={passTwo}
                      onChange={(e) => setPassTwo(e.target.value)}
                    />
                  </section>
                </div>
                <div className="form-group text-right mb-0">
                  <button className="btn btn-primary" type="submit">
                    Register
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

export default Register;
