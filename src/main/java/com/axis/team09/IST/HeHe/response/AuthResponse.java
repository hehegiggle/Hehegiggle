package com.axis.team09.IST.HeHe.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor@AllArgsConstructor
public class AuthResponse {
	
	private String token;
	private String message;
}
