package com.kes.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kes.entity.Location;

public interface LocationRepository extends JpaRepository<Location, Integer> {

}
