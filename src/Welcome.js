import { Link } from "react-router-dom";

const Welcome = ({ userName }) => {
  return (
    <div className="text-center mt-4">
      <span className="text-secondary font-weight-bold pl-1">
        Welcome {userName}
      </span>
      ,
      <Link to="/" className="font-weight-bold text-primary pl-1">
        log out
      </Link>
    </div>
  );
};

export default Welcome;
