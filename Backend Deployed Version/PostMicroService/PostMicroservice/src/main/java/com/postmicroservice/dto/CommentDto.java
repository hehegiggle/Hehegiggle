package com.postmicroservice.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.Data;

@Data
public class CommentDto {

	private Integer id;

	private UserDto userDto;
	

	private String content;

	private Set<UserDto> likedByUsers= new HashSet<>();

	private PostDto post;
	
	private LocalDateTime createdAt;
	
}
