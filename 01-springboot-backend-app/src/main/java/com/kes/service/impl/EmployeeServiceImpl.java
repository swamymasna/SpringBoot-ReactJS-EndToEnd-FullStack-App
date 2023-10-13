package com.kes.service.impl;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.kes.dto.EmployeeRequest;
import com.kes.dto.EmployeeResponse;
import com.kes.dto.LocationDto;
import com.kes.entity.Employee;
import com.kes.entity.Location;
import com.kes.exception.EmployeeServiceBusinessException;
import com.kes.exception.ResourceNotFoundException;
import com.kes.props.AppProperties;
import com.kes.repository.EmployeeRepository;
import com.kes.repository.LocationRepository;
import com.kes.service.EmployeeService;
import com.kes.utils.EmailUtils;
import static com.kes.utils.AppConstants.*;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

	private EmployeeRepository employeeRepository;

	private LocationRepository locationRepository;

	private ModelMapper modelMapper;

	private EmailUtils emailUtils;

	private AppProperties appProperties;

	@Override
	public EmployeeResponse saveEmployee(EmployeeRequest employeeRequest) {
		EmployeeResponse employeeResponse = null;
		Employee employee = null;

		try {
			employee = modelMapper.map(employeeRequest, Employee.class);

			employee = employeeRepository.save(employee);

			if (employee.getEmail() != null) {

				String to = employee.getEmail();
				String subject = appProperties.getMessages().get(EMAIL_SENT);
				String body = readMailBody(EMPLOYEE_MAIL_BODY_TEMPLATE, employee);
				//emailUtils.sendEmail(to, subject, body);
			}

			employeeResponse = modelMapper.map(employee, EmployeeResponse.class);

		} catch (Exception e) {
			throw new EmployeeServiceBusinessException(appProperties.getMessages().get(SAVE_EMPLOYEE_EXCEPTION));
		}

		return employeeResponse;
	}

	private String readMailBody(String fileName, Employee employee) {

		String mailBody = null;

		Path path = Paths.get(fileName);

		try {
			mailBody = Files.readString(path);

			mailBody = mailBody.replace(EMP_ID, employee.getEmployeeId().toString());
			mailBody = mailBody.replace(FNAME, employee.getFirstName());
			mailBody = mailBody.replace(LNAME, employee.getLastName());
			mailBody = mailBody.replace(EMP_SAL, employee.getSalary().toString());
			mailBody = mailBody.replace(EMAIL, employee.getEmail());
			mailBody = mailBody.replace(GENDER, employee.getGender());
			mailBody = mailBody.replace(LOCATION, employee.getPrefLocation());
			mailBody = mailBody.replace(PROFILE, employee.getProfile());
			mailBody = mailBody.replace(TERMS, employee.getTerms().toString());
			mailBody = mailBody.replace(LANGUAGES, employee.getLanguages().toString());

		} catch (Exception e) {
			e.printStackTrace();
		}

		return mailBody;
	}

	@Override
	public List<LocationDto> getLocations() {
		List<LocationDto> locationsList = null;

		try {
			List<Location> locations = locationRepository.findAll();

			if (!locations.isEmpty()) {
				locationsList = locations.stream().map(location -> modelMapper.map(location, LocationDto.class))
						.collect(Collectors.toList());
			} else {
				locationsList = Collections.emptyList();
			}

		} catch (Exception e) {
			throw new EmployeeServiceBusinessException(appProperties.getMessages().get(FETCH_ALL_LOCATIONS_EXCEPTION));
		}

		return locationsList;
	}

	@Override
	public List<EmployeeResponse> getAllEmployees() {

		List<EmployeeResponse> employeeResponse = null;

		try {
			List<Employee> employees = employeeRepository.findAll();

			if (!employees.isEmpty()) {
				employeeResponse = employees.stream().map(employee -> modelMapper.map(employee, EmployeeResponse.class))
						.collect(Collectors.toList());
			} else {
				employeeResponse = Collections.emptyList();
			}

		} catch (Exception e) {
			throw new EmployeeServiceBusinessException(appProperties.getMessages().get(FETCH_ALL_EMPLOYEES_EXCEPTION));

		}

		return employeeResponse;
	}

	@Cacheable(key = KEY, value = VALUE)
	@Override
	public EmployeeResponse getEmployeeById(Integer employeeId) {

		Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException(
				String.format(appProperties.getMessages().get(EMPLOYEE_NOT_FOUND_EXCEPTION), employeeId)));

		return modelMapper.map(employee, EmployeeResponse.class);
	}

	@CachePut(key = KEY, value = VALUE)
	@Override
	public EmployeeResponse updateEmployee(Integer employeeId, EmployeeRequest employeeRequest) {

		EmployeeResponse employeeResponse = null;
		Employee employee = null;

		employee = employeeRepository.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException(
				String.format(appProperties.getMessages().get(EMPLOYEE_NOT_FOUND_EXCEPTION), employeeId)));

		try {

			employee.setFirstName(employeeRequest.getFirstName());
			employee.setLastName(employeeRequest.getLastName());
			employee.setSalary(employeeRequest.getSalary());
			employee.setEmail(employeeRequest.getEmail());
			employee.setGender(employeeRequest.getGender());
			employee.setPrefLocation(employeeRequest.getPrefLocation());
			employee.setProfile(employeeRequest.getProfile());
			employee.setTerms(employeeRequest.getTerms());
			employee.setLanguages(employeeRequest.getLanguages());

			employee = employeeRepository.save(employee);

			employeeResponse = modelMapper.map(employee, EmployeeResponse.class);

		} catch (Exception e) {
			throw new EmployeeServiceBusinessException(appProperties.getMessages().get(UPDATE_EMPLOYEE_EXCEPTION));
		}

		return employeeResponse;
	}

	@CacheEvict(key = KEY, value = VALUE)
	@Override
	public String deleteEmployee(Integer employeeId) {
		String message = null;
		Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException(
				String.format(appProperties.getMessages().get(EMPLOYEE_NOT_FOUND_EXCEPTION), employeeId)));
		try {

			if (employee.getEmployeeId() != null) {
				employeeRepository.deleteById(employeeId);
				message = appProperties.getMessages().get(EMPLOYEE_DELETION_SUCCEEDED) + employeeId;
			} else {
				message = appProperties.getMessages().get(FAILED_TO_DELETE_EMPLOYEE);
			}
		} catch (Exception e) {
			throw new EmployeeServiceBusinessException(appProperties.getMessages().get(DELETE_EMPLOYEE_EXCEPTION));
		}

		return message;
	}

}
