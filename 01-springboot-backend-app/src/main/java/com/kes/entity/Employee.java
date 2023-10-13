package com.kes.entity;

import java.time.LocalDate;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "EMPLOYEE_TBL")
public class Employee {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "EMP_ID")
	private Integer employeeId;

	@Column(name = "FNAME")
	private String firstName;

	@Column(name = "LNAME")
	private String lastName;

	@Column(name = "SAL")
	private Double salary;

	@Column(name = "EMAIL")
	private String email;

	@Column(name = "GENDER")
	private String gender;

	@Column(name = "LOCATION")
	private String prefLocation;

	@Column(name = "PROFILE")
	private String profile;

	@Column(name = "TERMS")
	private Boolean terms;

	@ElementCollection
	private Set<String> languages;

	@CreationTimestamp
	@Column(name = "CREATED_DATE")
	private LocalDate createdDate;

	@UpdateTimestamp
	@Column(name = "UPDATED_DATE")
	private LocalDate updatedDate;
}
