package com.notificationmicroservice.event;

import java.time.LocalDateTime;

public class NotificationEvent {
    private String type;
    private String notificationId;
    private String userId;
    private String postId;
    private String commentId;
    private String senderId;
    private String message;
    private LocalDateTime notificationAt;

    // Constructors, Getters, and Setters

    public NotificationEvent(String type, String userId, String postId, String commentId, String senderId, String message, String notificationId, LocalDateTime notificationAt) {
        this.type = type;
        this.userId = userId;
        this.postId = postId;
        this.commentId = commentId;
        this.senderId = senderId;
        this.message = message;
        this.notificationId = notificationId;
        this.notificationAt = notificationAt;
    }
    
    public NotificationEvent() {
		super();
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
