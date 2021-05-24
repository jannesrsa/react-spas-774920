import { useState } from "react";
import MeetingList from "./MeetingList";

const Meetings = ({ onAdd, meetings, userId }) => {
  const [meetingName, setMeetingName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    onAdd(meetingName);
    setMeetingName("");
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="font-weight-light">Add a Meeting</h1>
          <div className="card bg-light">
            <div className="card-body text-center">
              <form className="formgroup" onSubmit={onSubmit}>
                <div className="input-group input-group-lg">
                  <input
                    type="text"
                    className="form-control"
                    name="meetingName"
                    placeholder="Meeting name"
                    aria-describedby="buttonAdd"
                    value={meetingName}
                    onChange={(e) => setMeetingName(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      type="submit"
                      className="btn btn-sm btn-info"
                      id="buttonAdd"
                    >
                      +
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-11 col-md-6 text-center">
          <div className="card border-top-0 rounded-0">
            {meetings && meetings.length > 0 && (
              <>
                <div className="card-body py-2">
                  <h4 className="card-title font-weight-light m-0">
                    Your Meetings
                  </h4>
                </div>
                <div className="list-group list-group-flush">
                  <MeetingList
                    userId={userId}
                    meetings={meetings}
                  ></MeetingList>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meetings;
