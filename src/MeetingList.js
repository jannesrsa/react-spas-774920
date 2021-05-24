import { FaLink } from "react-icons/fa";
import { GoTrashcan } from "react-icons/go";
import { useHistory } from "react-router";
import firebase from "./Firebase";

const MeetingList = ({ userId, meetings }) => {
  const history = useHistory();

  const onDelete = (e, meetingID) => {
    e.preventDefault();

    const ref = firebase.database().ref(`meetings/${userId}/${meetingID}`);
    ref.remove();
  };

  const myMeetings = meetings.map((meeting) => {
    return (
      <div className="list-group-item" key={meeting.meetingID}>
        <section className="d-flex pl-3 text-left align-self-center">
          <div className="p-2">{meeting.meetingName} </div>

          <section className="btn-group ml-auto p-2">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={(e) => onDelete(e, meeting.meetingID)}
            >
              <GoTrashcan />
            </button>

            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={(e) =>
                history.push(`/checkin/${userId}/${meeting.meetingID}`)
              }
            >
              <FaLink />
            </button>
          </section>
        </section>
      </div>
    );
  });

  return <div>{myMeetings}</div>;
};

export default MeetingList;
