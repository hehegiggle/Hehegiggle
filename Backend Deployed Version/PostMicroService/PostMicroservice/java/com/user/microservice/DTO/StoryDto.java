package com.user.microservice.DTO;

import java.time.LocalDateTime;

import com.usermicroservice.entity.User;

import jakarta.persistence.ManyToOne;

import lombok.Data;

@Data
public class StoryDto {

	private Integer id;
	private User user;
	private String image;
	private String captions;
	private LocalDateTime timestamp;
	
}
