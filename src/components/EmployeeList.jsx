import React, { useEffect, useState } from 'react'
import { getAllEmployees, toggleEmployeeStatus } from '../services/survey';
import "../styles/EmployeeList.css";
import EmployeeCard from './EmployeeCard';


function EmployeeList() {

    const [employees, setEmployees] = useState([]);
    const [updatingId, setUpdatingId] = useState(null);
    useEffect(() => {
        loadEmployees()
    }, [])

    const loadEmployees = async () => {
        try {
            const employeesData = await getAllEmployees();
            setEmployees(employeesData)
        } catch (error) {
            console.log("Error to Fine Employess!", error);
        }
    }


    const activeEmployees = employees.filter((emp) => emp.is_active);
    const inactiveEmployees = employees.filter((emp) => !emp.is_active);

    const toggleStatus = async (emp) => {
        try {
            setUpdatingId(emp.id);

            const updatedEmployee = await toggleEmployeeStatus(emp.id, !emp.is_active)
            setEmployees((prev) =>
                prev.map((item) =>
                    item.id === emp.id
                        ? updatedEmployee
                        : item
                )
            );
            console.log("STATUS CHANGED!!");
        } catch (error) {
            console.log("STATUS ERROR:", error);
        } finally {
            setUpdatingId(null);
        }
    }

    return (
        <div className="employee-section">

            <div className="employee-header">
                <div>
                    <h2>Employees</h2>
                    <p>
                        Manage employee accounts and
                        access.
                    </p>
                </div>

                <div className="employee-total">
                    Total: {employees.length}
                </div>
            </div>

            {/* Active */}
            <section className="employee-group">

                <div className="group-header">
                    <h3>
                        <span className="green-dot"></span>
                        Active Employees
                    </h3>

                    <span className="group-count">
                        {activeEmployees.length}
                    </span>
                </div>

                <div className="employee-list">
                    {activeEmployees.length > 0 ? (
                        activeEmployees.map((employee) => (
                            <EmployeeCard
                                key={employee.id}
                                employee={employee}
                                onToggleStatus={toggleStatus}
                                updating={
                                    updatingId === employee.id
                                }
                            />
                        ))
                    ) : (
                        <p className="empty">
                            No active employees.
                        </p>
                    )}
                </div>

            </section>

            {/* Inactive */}
            <section className="employee-group">

                <div className="group-header">
                    <h3>
                        <span className="red-dot"></span>
                        Inactive Employees
                    </h3>

                    <span className="group-count">
                        {inactiveEmployees.length}
                    </span>
                </div>

                <div className="employee-list">
                    {inactiveEmployees.length > 0 ? (
                        inactiveEmployees.map((employee) => (
                            <EmployeeCard
                                key={employee.id}
                                employee={employee}
                                onToggleStatus={toggleStatus}
                                updating={
                                    updatingId === employee.id
                                }
                            />
                        ))
                    ) : (
                        <p className="empty">
                            No inactive employees.
                        </p>
                    )}
                </div>

            </section>

        </div>
    );

}

export default EmployeeList
// change