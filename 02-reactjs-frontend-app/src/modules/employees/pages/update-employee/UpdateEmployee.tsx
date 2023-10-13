import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IEmployee } from "../../models/IEmployee";
import { EmployeeService } from "../../services/EmployeeService";
import { ILocation } from "../../models/ILocation";
import { ToastUtil } from "../../../../utils/ToastUtil";

interface IState {
  locations: ILocation[];
}

const UpdateEmployee: React.FC = () => {
  let navigate = useNavigate();
  let { id } = useParams();

  const [employee, setEmployee] = useState<IEmployee>({
    firstName: "",
    lastName: "",
    salary: "",
    email: "",
    gender: "",
    languages: [],
    prefLocation: "",
    profile: "",
    terms: false,
  });

  const [state, setState] = useState<IState>({
    locations: [] as ILocation[],
  });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement | any>) => {
    if (event.target.name === "languages") {
      let copiedEmployee = { ...employee };
      if (event.target.checked) {
        copiedEmployee.languages?.push(event.target.value);
      } else {
        copiedEmployee.languages = copiedEmployee.languages?.filter(
          (element) => element !== event.target.value
        );
      }
      setEmployee(copiedEmployee);
    } else {
      setEmployee({
        ...employee,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleOnChangeTerms = (event: ChangeEvent<any>) => {
    setEmployee({
      ...employee,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement | any>) => {
    event.preventDefault();
    console.log(employee);
    EmployeeService.updateEmployee(id, employee)
      .then((response: any) => {
        if (response && response.data) {
          navigate("/employees");
          ToastUtil.displaySuccessToast("Employee is Updated");
        }
      })
      .catch((error: any) => {
        ToastUtil.displayErrorToast(
          "Failed To Update Employee into the Server"
        );
        console.error(error);
      });
  };

  const fetchAllLocations = () => {
    EmployeeService.getLocations()
      .then((response: any) => {
        setState({
          ...state,
          locations: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchAllLocations();
  }, []);

  const fetchEmployee = () => {
    EmployeeService.getEmployee(id)
      .then((response: any) => {
        setEmployee({
          ...employee,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          salary: response.data.salary,
          email: response.data.email,
          gender: response.data.gender,
          languages: response.data.languages,
          prefLocation: response.data.prefLocation,
          profile: response.data.profile,
          terms: response.data.terms,
        });
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  let {
    firstName,
    lastName,
    salary,
    email,
    languages,
    prefLocation,
    gender,
    profile,
    terms,
  } = employee;

  let { locations } = state;

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-5 m-auto">
            <div className="card shadow-lg">
              <div className="card-header bg-info text-center">
                <h2>Employee Edit Page</h2>
              </div>
              <div className="card-body bg-light">
                <form onSubmit={handleSubmit}>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={handleOnChange}
                      placeholder="Enter First Name"
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={handleOnChange}
                      placeholder="Enter Last Name"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="salary"
                      value={salary}
                      onChange={handleOnChange}
                      placeholder="Enter Salary"
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleOnChange}
                      placeholder="Enter Email-Id"
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="mt-2 ms-1">
                    <label>Gender</label>
                    <input
                      type="radio"
                      value={"Male"}
                      name="gender"
                      onChange={handleOnChange}
                      className="ms-2"
                      checked={gender === "Male"}
                      required
                    />
                    <label>Male</label>
                    <input
                      type="radio"
                      value={"Female"}
                      name="gender"
                      onChange={handleOnChange}
                      className="ms-2"
                      checked={gender === "Female"}
                      required
                    />
                    <label>Female</label>
                  </div>

                  <div className="mt-2 ">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="languages"
                      onChange={handleOnChange}
                      value={"ReactJS"}
                      checked={languages?.includes('ReactJS')}
                    />
                    <label className="ms-1">ReactJS</label>

                    <input
                      type="checkbox"
                      className="form-check-input ms-2 "
                      name="languages"
                      value={"SpringBoot"}
                      onChange={handleOnChange}
                      checked={languages?.includes('SpringBoot')}
                    />
                    <label className="ms-1">SpringBoot</label>
                    <input
                      type="checkbox"
                      className="form-check-input ms-2"
                      name="languages"
                      value={"Microservices"}
                      onChange={handleOnChange}
                      checked={languages?.includes('Microservices')}
                    />
                    <label className="ms-1">Microservices</label>
                  </div>

                  <div className="mt-2">
                    <select
                      className="form-control"
                      name="prefLocation"
                      value={prefLocation}
                      onChange={handleOnChange}
                      required
                    >
                      <option>Select Location</option>
                      {locations.map((loc) => {
                        return (
                          <option key={loc.locId} value={loc.prefLocation}>
                            {loc.prefLocation}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="mt-2">
                    <textarea
                      name="profile"
                      value={profile}
                      onChange={handleOnChange}
                      className="form-control"
                      placeholder="Enter Your Profile"
                      required
                    ></textarea>
                  </div>

                  <div className="mt-2">
                    <input
                      type="checkbox"
                      name="terms"
                      onChange={handleOnChangeTerms}
                      className="form-check-input"
                      required
                      checked
                    />
                    <label className="ms-1">Accept Terms & Conditions</label>
                  </div>

                  <div className="mt-2">
                    <input
                      type="submit"
                      value={"Update"}
                      className="btn btn-info form-control"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateEmployee;
