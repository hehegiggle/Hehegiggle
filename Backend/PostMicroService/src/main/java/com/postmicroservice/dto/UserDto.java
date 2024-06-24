package com.postmicroservice.dto;

import java.util.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
	
	private String username;
	private String name;
	private String image;
	private String email;
	private Integer id;
	
	
	

}


