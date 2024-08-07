package com.axis.messageservice.entity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.ElementCollection;
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

	private String sentImage;

	private String sentVideo;

	private String sentGif;

	@Embedded
	private User user;

	@JsonIgnore
	@ManyToOne
	private Chat chat;

	private LocalDateTime timestamp;

	private boolean deleted = false;

	@ElementCollection
	private Set<Integer> deletedUsers = new HashSet<>();

	@Override
	public String toString() {
		return "Message [messageId=" + messageId + ", content=" + content + ", image=" + sentImage + ", video="
				+ sentVideo + ", gif=" + sentGif + ", user=" + user + ", timestamp=" + timestamp + "]";
	}

}
