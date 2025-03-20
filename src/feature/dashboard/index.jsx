import { useDispatch } from "react-redux";
import { AuthActions } from "../authentication";
import {Link} from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="bgImg"></div>
      <div className="container-fluid bg-white bg-light custom-container">
        <h1 className="text-center">Dashboard</h1>

        <div className="row mb-2">
          <div className="col-md-4 text-center">
            <button className="btn btn-primary w-100"><Link to="/addPress">Press Release</Link></button>
          </div>
          <div className="col-md-4 text-center">
            <button className="btn btn-success w-100">MRV Schedule</button>
          </div>
          <div className="col-md-4 text-center">
            <button className="btn btn-danger w-100">Downloads</button>
          </div>
        </div>

        <div className="m-2 p-2 text-center">
          <button
            className="btn btn-secondary"
            onClick={() => dispatch(AuthActions.logout())}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
