package com.axis.messageservice.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Message {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer messageId;
	
	private String content;
	
	private String image;
	
	@Embedded
	private User user;
	
	@JsonIgnore
	@ManyToOne
	private Chat chat;
	
	private LocalDateTime timestamp;

	@Override
	public String toString() {
		return "Message [messageId=" + messageId + ", content=" + content + ", image=" + image + ", user=" + user
				+ ", timestamp=" + timestamp + "]";
	}
	

}
