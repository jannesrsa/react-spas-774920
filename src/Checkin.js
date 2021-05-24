import { useState } from "react";
import firebase from "./Firebase";
import { useParams } from "react-router-dom";
import FormError from "./FormError";

const Checkin = () => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let { userID, meetingID } = useParams();

  const onSubmit = (e) => {
    e.preventDefault();

    const ref = firebase
      .database()
      .ref(`meetings/${userID}/${meetingID}/attendees`);

    ref
      .push({
        attendeeName: email,
        attendeeEmail: displayName,
      })
      .catch((error) => setErrorMessage(error.errorMessage));
  };

  return (
    <form className="mt-3" onSubmit={onSubmit}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card bg-light">
              <div className="card-body">
                <h3 className="font-weight-light mb-3">Check in</h3>
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
                </section>
                <section className="form-group">
                  <label for="exampleInputDisplayName1">DisplayName</label>
                  <input
                    type="displayname"
                    class="form-control"
                    id="exampleInputDisplayName1"
                    placeholder="DisplayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </section>
                <div className="form-group text-right mb-0">
                  <button className="btn btn-primary" type="submit">
                    Check in
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

export default Checkin;
