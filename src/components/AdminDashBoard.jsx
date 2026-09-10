import AddEmployee from "./AddEmployee";
import SurveyList from "./SurveyList";

function AdminDashBoard({ user, onLogout }) {
    return (
        <div>
            <h1>Admin Dashboard</h1>

            <h2>Welcome, {user.full_name}</h2>

            <p>Role: {user.role}</p>

            <button onClick={onLogout}>
                Logout
            </button>

            <hr />

            <AddEmployee />

            <hr />

            <SurveyList />

        </div>
    );
}

export default AdminDashBoard;