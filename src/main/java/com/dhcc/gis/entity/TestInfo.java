package com.dhcc.gis.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

import lombok.Data;

@Data
@Entity
public class TestInfo {

	@Id
	@GenericGenerator(name = "id", strategy = "uuid2")
	@GeneratedValue(generator = "id")
	@Column(name = "moduleGuid", unique = true, nullable = false, length = 36)
	private String id;

	@Column(name = "name")
	private String name;

	@Column(name = "sex")
	private String sex;

}
