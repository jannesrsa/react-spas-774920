import React, { useEffect, useState } from "react";
import firebase from "./Firebase";
import AttendeesList from "./AttendeesList";
import { FaUndo, FaRandom } from "react-icons/fa";
import { useParams } from "react-router-dom";

const Attendees = ({ adminUser }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allAttendees, setAllAttendees] = useState([]);
  const [displayAttendees, setDisplayAttendees] = useState([]);

  const { userID, meetingID } = useParams();

  useEffect(() => {
    const ref = firebase
      .database()
      .ref(`meetings/${userID}/${meetingID}/attendees`);

    ref.on("value", (snapshot) => {
      let attendees = snapshot.val();
      let attendeesList = [];
      for (let item in attendees) {
        attendeesList.push({
          attendeeID: item,
          attendeeName: attendees[item].attendeeName,
          attendeeEmail: attendees[item].attendeeEmail,
          star: attendees[item].star,
        });
      }

      setAllAttendees(attendeesList);
      setDisplayAttendees(attendeesList);
    });
  }, [userID, meetingID]);

  const chooseRandom = () => {
    const randomAttendee = Math.floor(Math.random() * allAttendees.length);
    resetQuery();
    setDisplayAttendees([allAttendees[randomAttendee]]);
  };

  const resetQuery = () => {
    setDisplayAttendees(allAttendees);
    setSearchQuery("");
  };

  const dataFilter = (item) =>
    item.attendeeName.toLowerCase().match(searchQuery.toLowerCase()) && true;

  const filteredAttendees = displayAttendees.filter(dataFilter);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="font-weight-light text-center">Attendees</h1>

          <div className="card bg-light mb-4">
            <div className="card-body text-center">
              <div className="input-group input-group-lg">
                <input
                  type="text"
                  name="searchQuery"
                  placeholder="Search Attendees"
                  className="form-control"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-sm btn-outline-info "
                    title="Pick a random attendee"
                    onClick={() => chooseRandom()}
                  >
                    <FaRandom />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-info "
                    title="Reset Search"
                    onClick={() => resetQuery()}
                  >
                    <FaUndo />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AttendeesList
        userID={userID}
        meetingID={meetingID}
        adminUser={adminUser}
        attendees={filteredAttendees}
      />
    </div>
  );
};

export default Attendees;
