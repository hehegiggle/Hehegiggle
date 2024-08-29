package com.axis.commentservice.event;

import java.time.LocalDateTime;

public class NotificationEvent {
	private String notificationId;
	private String type;
	private String userId;
	private String postId;
	private Integer reelId;
	private String commentId;
	private String senderId;
	private String email;
	private String subject;
	private String message;
	private LocalDateTime notificationAt;

	// Default constructor
	public NotificationEvent() {
	}

	// Parameterized constructor
	public NotificationEvent(String notificationId, String type, String userId, String postId, Integer reelId,
			String commentId, String senderId, String message, LocalDateTime notificationAt) {
		this.notificationId = notificationId;
		this.type = type;
		this.userId = userId;
		this.postId = postId;
		this.reelId = reelId;
		this.commentId = commentId;
		this.senderId = senderId;
		this.message = message;
		this.notificationAt = notificationAt;
	}

	public String getNotificationId() {
		return notificationId;
	}

	public void setNotificationId(String notificationId) {
		this.notificationId = notificationId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getPostId() {
		return postId;
	}

	public void setPostId(String postId) {
		this.postId = postId;
	}

	public Integer getReelId() {
		return reelId;
	}

	public void setReelId(Integer reelId) {
		this.reelId = reelId;
	}

	public String getCommentId() {
		return commentId;
	}

	public void setCommentId(String commentId) {
		this.commentId = commentId;
	}

	public String getSenderId() {
		return senderId;
	}

	public void setSenderId(String senderId) {
		this.senderId = senderId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public LocalDateTime getNotificationAt() {
		return notificationAt;
	}

	public void setNotificationAt(LocalDateTime notificationAt) {
		this.notificationAt = notificationAt;
	}

}
