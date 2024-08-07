package com.postmicroservice.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.postmicroservice.dto.UserDto;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
	
	private Integer id;
	private String username;
	private String email;
	private String name;
	private String mobile;
	private String website;
	private String bio;
	private String gender;
	private String image;
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;
	
	@ElementCollection
	@Embedded
	private Set<UserDto> follower = new HashSet<UserDto>();
	
	@ElementCollection
	@Embedded
	private Set<UserDto> following = new HashSet<UserDto>();
	
	@ElementCollection
	@Embedded
	private List<Post> savedPost=new ArrayList<>();

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", email=" + email + ", name=" + name + ", mobile="
				+ mobile + ", website=" + website + ", bio=" + bio + ", gender=" + gender + ", image=" + image
				+ ", password=" + password + ", follower=" + follower + ", following=" + following + ", savedPost="
				+ savedPost + "]";
	}

}

