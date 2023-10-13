import axios from "axios";
import { IEmployee } from "../models/IEmployee";
import { ILanguage } from "../models/ILanguage";

export class EmployeeService {
  private static serverUrl: string = `http://localhost:8081/api/employees`;

  /**
   * @usage : get all employees
   * @method : GET
   * @params : no-params
   * @url : http://localhost:8081/api/employees
   */
  public static getAllEmployees(): Promise<IEmployee[] | any> {
    return axios.get(`${this.serverUrl}`);
  }

  /**
   * @usage : save an employee
   * @method : POST
   * @params : employee
   * @url : http://localhost:8081/api/employees
   */
  public static saveEmployee(employee: IEmployee): Promise<IEmployee> {
    return axios.post(`${this.serverUrl}`, employee);
  }

  /**
   * @usage : get all locations
   * @method : GET
   * @params : no-params
   * @url : http://localhost:8081/api/employees/locations
   */
  public static getLocations(): Promise<IEmployee[] | any> {
    return axios.get(`${this.serverUrl}/locations`);
  }
  
  /**
   * @usage : get all locations
   * @method : GET
   * @params : no-params
   * @url : http://localhost:8081/api/employees/languages
   */
  public static getLanguages(): Promise<ILanguage[] | any> {
    return axios.get(`${this.serverUrl}/languages`);
  }

  /**
   * @usage : delete an employee by id
   * @method : DELETE
   * @params : employeeId
   * @url : http://localhost:8081/api/employees/:employeeId
   */
  public static deleteEmployee(employeeId: any): Promise<any> {
    return axios.delete(`${this.serverUrl}/${employeeId}`);
  }

  /**
   * @usage : fetch an employee by id
   * @method : GET
   * @params : employeeId
   * @url : http://localhost:8081/api/employees/:employeeId
   */
  public static getEmployee(employeeId: any): Promise<IEmployee | any> {
    return axios.get(`${this.serverUrl}/${employeeId}`);
  }

  /**
   * @usage : update an employee
   * @method : PUT
   * @params : employeeId,employee
   * @url : http://localhost:8081/api/employees/:employeeId
   */
  public static updateEmployee(
    employeeId: any,
    employee: IEmployee
  ): Promise<IEmployee | any> {
    return axios.put(`${this.serverUrl}/${employeeId}`, employee);
  }
}
