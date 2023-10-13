package com.kes.dto;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeRequest {

	private String firstName;
	private String lastName;
	private Double salary;
	private String email;
	private String gender;
	private String prefLocation;
	private String profile;
	private Boolean terms;

	private Set<String> languages;
}
