import { useDispatch } from "react-redux";
import { AuthActions } from "../authentication";
import {Link, useNavigate} from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleNavigation(link) {
    navigate(link);
  }

  return (
    <div>
      <div className="bgImg"></div>
      <div className="container-fluid bg-white bg-light custom-container">
        <h1 className="text-center">Dashboard</h1>

        <div className="row mb-2">
          <div className="col-md-4 text-center">
            <button className="btn btn-primary w-100" onClick={()=>handleNavigation('/addPress')}>Press Release</button>
          </div>
          <div className="col-md-4 text-center">
            <button className="btn btn-success w-100" onClick={()=>handleNavigation('/add-mrv')}>MRV Schedule</button>
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
