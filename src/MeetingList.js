import { GoTrashcan } from "react-icons/go";
import firebase from "./Firebase";

const MeetingList = ({ userId, meetings }) => {
  const onDelete = (e, meetingID) => {
    e.preventDefault();
    console.log(`meetings/${userId}/${meetingID}`);
    const ref = firebase.database().ref(`meetings/${userId}/${meetingID}`);
    ref.remove();
  };

  const myMeetings = meetings.map((meeting) => {
    return (
      <div className="list-group-item" key={meeting.meetingID}>
        <section className="d-flex pl-3 text-left align-self-center">
          <div className="p-2">{meeting.meetingName} </div>
          <div className="ml-auto p-2">
            <GoTrashcan
              style={{ color: "red", cursor: "pointer" }}
              onClick={(e) => onDelete(e, meeting.meetingID)}
            />
          </div>
        </section>
      </div>
    );
  });

  return <div>{myMeetings}</div>;
};

export default MeetingList;
