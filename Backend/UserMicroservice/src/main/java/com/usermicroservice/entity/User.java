package com.usermicroservice.entity;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.usermicroservice.DTO.UserDto;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private String username;
	private String email;
	private String name;
	private String mobile;
	private String bio;
	private String gender;
	private String image;
	private LocalDate dateOfBirth;

	@JsonProperty
	private String password;

	@ElementCollection
	@Embedded
	private Set<UserDto> follower = new HashSet<UserDto>();

	@ElementCollection
	@Embedded
	private Set<UserDto> following = new HashSet<UserDto>();

	@ManyToMany
	@JoinTable(name = "user_saved_posts", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "post_id"))
	private Set<Post> savedPost = new HashSet<>();
}
