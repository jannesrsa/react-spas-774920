import { GoTrashcan, GoMail, GoStar } from "react-icons/go";
import firebase from "./Firebase";

const AttendeesList = ({ userID, meetingID, adminUser, attendees }) => {
  const deleteAttendee = (e, whichMeeting, whichAttendee) => {
    e.preventDefault();

    const ref = firebase
      .database()
      .ref(`meetings/${adminUser}/${whichMeeting}/attendees/${whichAttendee}`);
    ref.remove();
  };

  const toggleStar = (e, star, whichMeeting, whichAttendee) => {
    e.preventDefault();

    const ref = firebase
      .database()
      .ref(
        `meetings/${adminUser}/${whichMeeting}/attendees/${whichAttendee}/star`
      );

    if (star === undefined) {
      ref.set(true);
    } else {
      ref.set(!star);
    }
  };

  const admin = adminUser === userID ? true : false;

  const myAttendees = attendees.map((item) => {
    return (
      <div
        className="col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1"
        key={item.attendeeID}
      >
        <div className="card ">
          <div
            className={
              "card-body px-3 py-2 d-flex align-items-center " +
              (admin ? "" : "justify-content-center")
            }
          >
            <div className="p-2">{item.attendeeName}</div>

            {admin && (
              <div className="btn-group ml-auto p-2">
                <button
                  className={
                    "btn btn-sm " +
                    (item.star ? "btn-info" : "btn-outline-secondary")
                  }
                  tite="Give user a star"
                  onClick={(e) =>
                    toggleStar(e, item.star, meetingID, item.attendeeID)
                  }
                >
                  <GoStar />
                </button>
                <a
                  href={`mailto:${item.attendeeEmail}`}
                  className="btn btn-sm btn-outline-secondary"
                  title="Mail Attendee"
                >
                  <GoMail />
                </a>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  tite="Delete Attendee"
                  onClick={(e) => deleteAttendee(e, meetingID, item.attendeeID)}
                >
                  <GoTrashcan />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  });

  return <div className="row justify-content-center">{myAttendees}</div>;
};

export default AttendeesList;
