package com.postmicroservice.entity;

import java.time.LocalDateTime;
import java.util.*;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.postmicroservice.dto.CommentDto;
import com.postmicroservice.dto.UserDto;

import jakarta.persistence.Embedded;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.*;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "posts")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Post {

	@Id
	private String id;
	private String caption;
	private String image;
	private String location;
	private LocalDateTime createdAt;
	@Field("user_id")
	private Integer userId;

	@Field("user_email")
	private String userEmail;

	@Field("user_username")
	private String userUsername;

	@Field("user_image")
	private String userImage;

	@Field("user_name")
	private String userName;

	@Field("comment_ids")
	private List<Comments> commentIds = new ArrayList<>();

	@Field("liked_by_user_ids")
	private Set<UserDto> likedByUsers = new HashSet<>();

}
