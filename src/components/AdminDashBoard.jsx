import AddEmployee from "./AddEmployee";

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
        </div>
    );
}

export default AdminDashBoard;