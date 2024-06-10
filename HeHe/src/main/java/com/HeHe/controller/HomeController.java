package com.HeHe.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

	@GetMapping("/home")
	public String homeControllerHandler1() {
		return null;
	}
	
	@GetMapping
	public String homeControllerHandler2() {
		return null;
	}
	
	
	
}
