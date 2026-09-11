import { useEffect, useState } from "react";
import {
    getAllSurveys,
    getPublicUrl,
    getSurveyWithEmployeeProfile,
} from "../services/survey";
import "../styles/SurveyList.css";

function SurveyList() {
    const [surveys, setSurveys] = useState([]);
    const [error, setError] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState("all");
    const [employees, setEmployees] = useState([]);

    const filteredSurveys =
        selectedEmployee === "all"
            ? surveys
            : surveys.filter(
                (item) => item.employee?.[0]?.id === selectedEmployee
            );

    useEffect(() => {
        const loadSurveys = async () => {
            try {
                const data = await getAllSurveys();

                const surveysWithEmployees = await Promise.all(
                    data.map(async (survey) => {
                        const employee = await getSurveyWithEmployeeProfile(
                            survey.employee_id
                        );

                        return {
                            ...survey,
                            employee,
                        };
                    })
                );

                setSurveys(surveysWithEmployees);

                const employeeList = [];

                surveysWithEmployees.forEach((survey) => {
                    const employee = survey.employee?.[0];

                    if (
                        employee && !employeeList.some(
                            (item) => item.id === employee.id
                        )
                    ) {
                        employeeList.push(employee);
                    }
                });

                setEmployees(employeeList);
            } catch (error) {
                console.log("SURVEY ERROR:", error);
                setError(error.message);
            }
        };

        loadSurveys();
    }, []);

    return (
        <div className="survey-grid">

            <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
            >
                <option value="all">
                    All Employees ({surveys.length})
                </option>

                {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                        {employee.full_name}
                    </option>
                ))}
            </select>

            {filteredSurveys.map((item) => {
                const employee = item.employee?.[0];

                const imageUrl = getPublicUrl(employee.profile_image_url)
                console.log("CHECK", imageUrl)

                return (
                    <div className="survey-card" key={item.id}>

                        <div className="employee-info">
                            {employee?.profile_image_url ? (
                                <img
                                    src={imageUrl}
                                    alt={employee?.full_name || "Employee"}
                                    className="employee-avatar"
                                />
                            ) : (
                                <div className="employee-avatar">
                                    {employee?.full_name?.charAt(0)?.toUpperCase()}
                                </div>
                            )}

                            <div className="employee-details">
                                <span>Surveyed by</span>
                                <strong>
                                    {employee?.full_name || "Unknown Employee"}
                                </strong>
                                <small>
                                    Block:{" "}
                                    {employee?.block_assign_number || "N/A"}
                                </small>
                            </div>
                        </div>

                        <div className="survey-card-top">
                            {/* TODO later : ADD a seaction  in form that get image in survey then disply here  */}
                            <div className="person-avatar">
                                {item.person_name
                                    ?.charAt(0)
                                    ?.toUpperCase()}
                            </div>

                            <div className="person-info">
                                <h2>{item.person_name}</h2>
                                <span>{item.phone_number}</span>
                            </div>
                        </div>

                        <div className="survey-info">
                            <div>
                                <span>Age</span>
                                <strong>{item.age}</strong>
                            </div>

                            <div>
                                <span>Occupation</span>
                                <strong>{item.occupation}</strong>
                            </div>

                            <div>
                                <span>Address</span>
                                <strong>{item.address}</strong>
                            </div>
                        </div>

                        <div className="survey-footer">
                            <span>
                                House:{" "}
                                <b className={item.has_house ? "yes" : "no"}>
                                    {item.has_house ? "Yes" : "No"}
                                </b>
                            </span>

                            <span>
                                Illness:{" "}
                                <b className={item.has_illness ? "yes" : "no"}>
                                    {item.has_illness ? "Yes" : "No"}
                                </b>
                            </span>
                        </div>

                    </div>
                );
            })}
        </div>
    );
}

export default SurveyList;