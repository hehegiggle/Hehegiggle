package com.notificationmicroservice.controller;

import com.notificationmicroservice.entity.RealTimeNotification;
import com.notificationmicroservice.service.RealTimeNotificationService;

import jakarta.ws.rs.Path;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/realtime-notifications")
public class RealTimeNotificationController {

	@Autowired
	private RealTimeNotificationService realTimeNotificationService;

	@PutMapping("/mark-as-read")
	public void markAllAsRead(@RequestHeader("Authorization") String jwt) throws Exception {
		realTimeNotificationService.markNotificationsAsRead(jwt);
	}

	@GetMapping("/user")
	public List<RealTimeNotification> getNotificationsByUserId(@RequestHeader("Authorization") String token) {
		return realTimeNotificationService.getNotificationsByUserId(token);
	}

	@PutMapping("/mark-as-read-by-id/{notificationId}")
	public void markAsReadById(@RequestHeader("Authorization") String jwt,
			@PathVariable("notificationId") String notificationId) throws Exception {
		realTimeNotificationService.markNotificationAsReadById(notificationId, jwt);
	}

	// Delete all notifications of the receiver (Only receiver can delete)
	@DeleteMapping("/delete-all")
	public void deleteAll(@RequestHeader("Authorization") String jwt) throws Exception {
		realTimeNotificationService.deleteAllNotifications(jwt);
	}

	// Delete particular notification of the receiver by notification ID (Only
	// receiver can delete)
	@DeleteMapping("/delete-by-id/{notificationId}")
	public void deleteAll(@RequestHeader("Authorization") String jwt,
			@PathVariable("notificationId") String notificationId) throws Exception {
		realTimeNotificationService.deleteNotificationById(jwt, notificationId);
	}

	@PostMapping
	public RealTimeNotification createNotification(@RequestBody RealTimeNotification notification) {
		return realTimeNotificationService.saveNotification(notification);
	}

	@GetMapping("/get-all")
	public List<RealTimeNotification> getAllNotifications(@RequestHeader("Authorization") String token)
			throws Exception {
		return realTimeNotificationService.getAllNotifications(token);
	}

	@GetMapping("/get-byId/{id}")
	public Optional<RealTimeNotification> getNotificationById(@PathVariable("id") String id,
			@RequestHeader("Authorization") String token) throws Exception {
		return realTimeNotificationService.getNotificationById(id, token);
	}

	@PutMapping("/update/{id}")
	public RealTimeNotification updateNotification(@PathVariable("id") String id,
			@RequestBody RealTimeNotification updatedNotification, @RequestHeader("Authorization") String token)
			throws Exception {
		return realTimeNotificationService.updateNotification(id, updatedNotification, token);
	}
}
