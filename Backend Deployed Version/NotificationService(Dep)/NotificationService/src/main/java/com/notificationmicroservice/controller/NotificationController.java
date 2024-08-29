package com.notificationmicroservice.controller;

import com.notificationmicroservice.service.NotificationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

	@Autowired
	private NotificationService notificationService;

	@PostMapping("/send-email")
	public String sendTestEmail(@RequestBody String email) {
		System.out.println("I got email ----" + email);
		notificationService.sendTestEmail(email);
		return "Email sent";
	}
}