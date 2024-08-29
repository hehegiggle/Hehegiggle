// RealTimeNotification.java
package com.notificationmicroservice.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "realTimeNotification")
public class RealTimeNotification {
	@Id
	private String notificationId;
	private String type;
	private String userId;
	private String postId;
	private String reelId;
	private String commentId;
	private String senderId;
	private String message;
	private LocalDateTime notificationAt;
	private boolean read;

	// Getters and Setters

	public RealTimeNotification(String notificationId, String type, String userId, String postId, String reelId,
			String commentId, String senderId, String message, Boolean read, LocalDateTime notificationAt) {
		super();
		this.notificationId = notificationId;
		this.type = type;
		this.userId = userId;
		this.postId = postId;
		this.reelId = reelId;
		this.commentId = commentId;
		this.senderId = senderId;
		this.message = message;
		this.read = read;
		this.notificationAt = notificationAt;
	}

	public RealTimeNotification() {
		super();
	}

	public boolean isRead() {
		return read;
	}

	public void setRead(boolean read) {
		this.read = read;
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

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
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

	public String getReelId() {
		return reelId;
	}

	public void setReelId(String reelId) {
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

	public LocalDateTime getNotificationAt() {
		return notificationAt;
	}

	public void setNotificationAt(LocalDateTime notificationAt) {
		this.notificationAt = notificationAt;
	}

}
