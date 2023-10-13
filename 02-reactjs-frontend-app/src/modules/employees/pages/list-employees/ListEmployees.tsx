import React, { useEffect, useState } from "react";
import { IEmployee } from "../../models/IEmployee";
import { EmployeeService } from "../../services/EmployeeService";
import { ToastUtil } from "../../../../utils/ToastUtil";
import { Link } from "react-router-dom";
import SpinnerUI from "../../components/spinner-ui/SpinnerUI";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import NoRecordFound from "../../components/no-record-found/NoRecordFound";

interface IState {
  loading: boolean;
  errorMessage: string;
  employees: IEmployee[];
}

const ListEmployees: React.FC = () => {
  let [state, setState] = useState<IState>({
    loading: false,
    errorMessage: "",
    employees: [] as IEmployee[],
  });

  const getAllEmployees = () => {
    setState({ ...state, loading: true });
    EmployeeService.getAllEmployees()
      .then((response: any) => {
        setState({
          ...state,
          loading: false,
          employees: response.data,
        });
      })
      .catch((error: any) => {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        });
      });
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  const removeEmployee = (employeeId: any) => {
    EmployeeService.deleteEmployee(employeeId)
      .then((response: any) => {
        if (response && response.data) {
          getAllEmployees();
          ToastUtil.displayInfoToast("Employee is Deleted");
        }
      })
      .catch((error: any) => {
        console.log(error);
        ToastUtil.displayErrorToast(
          "Failed To Delete Employee from the Server"
        );
      });
  };

  let { employees, loading, errorMessage } = state;

  return (
    <>
      {loading && <SpinnerUI />}
      {Object.keys(errorMessage).length > 0 && (
        <ErrorMessage message={errorMessage} />
      )}
      {!errorMessage && !loading && employees.length > 0 ? (
        <div className="container mt-3">
          <div className="row">
            <div className="col">
              <Link to={"/register-employee"} className="btn btn-success">
                Add-Employee <i className="bi bi-person-plus-fill"></i>
              </Link>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col">
              <div className="card shadow-lg">
                <div className="card-header bg-primary text-center text-white">
                  <h2>Employees List Details</h2>
                </div>
                <div className="card-body bg-light">
                  <table className="table table-bordered table-hover tableData">
                    <thead>
                      <tr>
                        <th>User-Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Salary</th>
                        <th>Gender</th>
                        {/* <th>Tech Stack</th> */}
                        <th>Location</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees &&
                        employees.map((employee) => {
                          return (
                            <tr key={employee.employeeId}>
                              <td>{employee.employeeId}</td>
                              <td>{employee.firstName}</td>
                              <td>{employee.lastName}</td>
                              <td>&#8377; {employee.salary.toFixed(2)}</td>
                              <td>{employee.gender}</td>
                              {/* <td>
                            {employee.languages && "" + employee.languages}
                          </td> */}
                              <td>{employee.prefLocation}</td>
                              <td className="text-center">
                                <button
                                  onClick={() =>
                                    removeEmployee(employee.employeeId)
                                  }
                                  className="btn btn-danger"
                                >
                                  <i className="bi bi-trash"></i>
                                </button>

                                <Link
                                  to={`/update-employee/${employee.employeeId}`}
                                  className="btn btn-primary ms-2"
                                >
                                  <i className="bi bi-pencil-square"></i>
                                </Link>
                                <Link
                                  to={`/view-employee/${employee.employeeId}`}
                                  className="btn btn-dark ms-2"
                                >
                                  <i className="bi bi-eye"></i>
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NoRecordFound />
      )}
    </>
  );
};

export default ListEmployees;
