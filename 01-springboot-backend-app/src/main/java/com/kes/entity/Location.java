package com.kes.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Location {

	@Id
	private Integer locId;
	private String prefLocation;
}
