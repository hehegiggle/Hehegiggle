package com.axis.reelservice.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class UserDTO {
	
	private Integer id;
	private String firstName;
	private String lastName;
	private String email;



}