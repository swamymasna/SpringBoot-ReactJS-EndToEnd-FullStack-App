package com.kes.service;

import java.util.List;

import com.kes.dto.EmployeeRequest;
import com.kes.dto.EmployeeResponse;
import com.kes.dto.LocationDto;

public interface EmployeeService {

	EmployeeResponse saveEmployee(EmployeeRequest employeeRequest);

	List<EmployeeResponse> getAllEmployees();

	List<LocationDto> getLocations();

	String deleteEmployee(Integer employeeId);

	EmployeeResponse getEmployeeById(Integer employeeId);

	EmployeeResponse updateEmployee(Integer employeeId, EmployeeRequest employeeRequest);

}
