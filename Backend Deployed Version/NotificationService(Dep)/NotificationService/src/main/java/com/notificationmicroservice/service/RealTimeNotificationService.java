package com.notificationmicroservice.service;

import com.notificationmicroservice.entity.RealTimeNotification;
import com.notificationmicroservice.entity.User;
import com.notificationmicroservice.repository.RealTimeNotificationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class RealTimeNotificationService {

	@Autowired
	private RealTimeNotificationRepository realTimeNotificationRepo;

	@Autowired
	private RestTemplate restTemplate;

	// Save a new real-time notification
	public RealTimeNotification saveNotification(RealTimeNotification notification) {
		return realTimeNotificationRepo.save(notification);
	}

	// Get all real-time notifications
	public List<RealTimeNotification> getAllNotifications(String token) throws Exception {
		User reqUser = getUserById(token);
		if (reqUser != null) {
			return realTimeNotificationRepo.findAll();
		} else {
			throw new Exception("Unauthorized access!!!");
		}
	}

	// Get a real-time notification by ID
	public Optional<RealTimeNotification> getNotificationById(String id, String token) throws Exception {
		User reqUser = getUserById(token);
		if (reqUser != null) {
			return realTimeNotificationRepo.findById(id);
		} else {
			throw new Exception("Unauthorized access!!!");
		}
	}

	// Update a real-time notification
	public RealTimeNotification updateNotification(String id, RealTimeNotification updatedNotification, String jwt)
			throws Exception {

		User reqUser = getUserById(jwt);
		if (reqUser != null && reqUser.getId().equals(updatedNotification.getSenderId())) {
			Optional<RealTimeNotification> optionalNotification = realTimeNotificationRepo.findById(id);
			if (optionalNotification.isPresent()) {
				RealTimeNotification notification = optionalNotification.get();
				notification.setType(updatedNotification.getType());
				notification.setUserId(updatedNotification.getUserId());
				notification.setPostId(updatedNotification.getPostId());
				notification.setReelId(updatedNotification.getReelId());
				notification.setCommentId(updatedNotification.getCommentId());
				notification.setSenderId(updatedNotification.getSenderId());
				notification.setMessage(updatedNotification.getMessage());
				notification.setNotificationAt(LocalDateTime.now());
				return realTimeNotificationRepo.save(notification);
			} else {
				return null;
			}
		} else {
			throw new Exception("UnAuthorized access");
		}
	}

	// Get real-time notifications by user ID
	public List<RealTimeNotification> getNotificationsByUserId(String token) {

		User user = getUserById(token);
		List<RealTimeNotification> notificationList = new ArrayList<>();
		notificationList = realTimeNotificationRepo.findByUserId(user.getId());
		Collections.reverse(notificationList);

		return notificationList;
	}

	// mark notifications as read for a specific user
	public void markNotificationsAsRead(String jwt) throws Exception {
		User user = getUserById(jwt);
		if (user != null) {
			List<RealTimeNotification> notifications = realTimeNotificationRepo.findByUserId(user.getId());
			for (RealTimeNotification notification : notifications) {
				notification.setRead(true);
				realTimeNotificationRepo.save(notification);
			}
		} else {
			throw new Exception("Unauthorized access!!!");
		}
	}

	// mark particular notifications as read for a specific user
	public void markNotificationAsReadById(String notificationId, String jwt) throws Exception {
		User reqUser = getUserById(jwt);

		if (reqUser != null) {
			Optional<RealTimeNotification> notificationOpt = realTimeNotificationRepo.findById(notificationId);
			if (notificationOpt.isPresent()) {
				RealTimeNotification notification = notificationOpt.get();
				if (notification.getUserId().equals(reqUser.getId())) {
					notification.setRead(true);
					realTimeNotificationRepo.save(notification);
				} else {
					throw new Exception("Unauthorized access! You can only mark your own notifications as read.");
				}
			} else {
				throw new Exception("No Notifications Found with ID: " + notificationId);
			}
		} else {
			throw new Exception("Unauthorized access! Invalid user.");
		}
	}

	// Delete all notifications of the receiver (Only receiver can delete)
	public Void deleteAllNotifications(String jwt) throws Exception {
		User reqUser = getUserById(jwt);
		if (reqUser != null) {
			List<RealTimeNotification> notifications = realTimeNotificationRepo.findByUserId(reqUser.getId());
			realTimeNotificationRepo.deleteAll(notifications);
		} else {
			throw new Exception("Unauthorized access! Invalid user.");
		}
		return null;
	}

	// Delete particular notification of the receiver by notification ID (Only
	// receiver can delete)
	public void deleteNotificationById(String jwt, String notificationId) throws Exception {
		User reqUser = getUserById(jwt);
		if (reqUser != null) {
			Optional<RealTimeNotification> optNoti = realTimeNotificationRepo.findById(notificationId);

			if (optNoti.isPresent() && optNoti.get().getUserId().equals(reqUser.getId())) {
				realTimeNotificationRepo.deleteById(notificationId);
			} else {
				throw new Exception("Cannot delete other users Notifications");
			}
		} else {
			throw new Exception("Unauthorized access! Invalid user.");
		}
	}

	// JWT to UserID
	private static final String url = "http://USER-SERVICE/api/users/req";

	public User getUserById(String jwt) {
		System.out.println("token----------" + jwt);
		HttpHeaders headers = new HttpHeaders();

		headers.set("Authorization", jwt);
		HttpEntity<User> entity = new HttpEntity<>(headers);

		ResponseEntity<User> response = restTemplate.exchange(url, HttpMethod.GET, entity, User.class);
		System.out.println("got user+" + response);
		return response.getBody();
	}
}
