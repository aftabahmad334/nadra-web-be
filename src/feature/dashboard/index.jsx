import {useDispatch} from "react-redux";
import {AuthActions} from "../authentication";


export default function Dashboard() {
    const dispatch=useDispatch()
    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={() => dispatch(AuthActions.logout())}>Logout</button>
        </div>
    )
}