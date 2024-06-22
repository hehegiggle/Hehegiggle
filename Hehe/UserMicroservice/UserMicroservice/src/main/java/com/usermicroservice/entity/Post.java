package com.usermicroservice.entity;

import java.time.LocalDateTime;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.usermicroservice.DTO.CommentDto;
import com.usermicroservice.DTO.UserDto;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Transient;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "posts")
public class Post {

	@Id
	private String id;
	private String caption;

	@Column(nullable = false)
	private String image;
	private String location;
	private LocalDateTime createdAt;

	@Embedded
	@AttributeOverride(name = "id", column = @Column(name = "user_id"))
	@AttributeOverride(name = "email", column = @Column(name = "user_email"))
	@AttributeOverride(name = "username", column = @Column(name = "user_username"))
	private UserDto user;

//	@ElementCollection
//    private List<CommentDto> comments = new ArrayList<>();

	@ElementCollection
//	@JoinTable(name = "likeByUsers", joinColumns = @JoinColumn(name="user_id"))
	private Set<UserDto> likedByUsers = new HashSet<>();
}
