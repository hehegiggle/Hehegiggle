package com.usermicroservice.Event;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class NotificationEvent {
	private String notificationId;
	private String type;
	private String userId;
	private String postId;
	private String commentId;
	private String senderId;
	private String email;
	private String subject;
	private String message;
	private LocalDateTime notificationAt;

	public NotificationEvent(String notificationId, String type, String userId, String postId, String commentId,
			String senderId, String message, LocalDateTime notificationAt) {
		this.notificationId = notificationId;
		this.type = type;
		this.userId = userId;
		this.postId = postId;
		this.commentId = commentId;
		this.senderId = senderId;
		this.message = message;
		this.notificationAt = notificationAt;
	}
}
