package com.axis.reelservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class UserDTO {

	private Integer id;
	private String email;
	private String name;
	private String username;
	private String image;

	public UserDTO(int i, String string, String string2) {
		// TODO Auto-generated constructor stub
	}
}