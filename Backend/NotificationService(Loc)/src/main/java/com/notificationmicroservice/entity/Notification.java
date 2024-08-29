package com.notificationmicroservice.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "notifications")
public class Notification {

	@Id
	private String notificationId;
	private String email;
	private String subject;
	private String message;
	private String status;

	public Notification(String notificationId, String email, String subject, String message, String status,
			String type) {
		super();
		this.notificationId = notificationId;
		this.email = email;
		this.subject = subject;
		this.message = message;
		this.status = status;
	}

	public Notification() {
		super();
	}

	// Getters and Setters
	public String getNotificationId() {
		return notificationId;
	}

	public void setNotificationId(String notificationId) {
		this.notificationId = notificationId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
