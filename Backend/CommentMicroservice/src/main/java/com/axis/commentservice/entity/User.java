package com.axis.commentservice.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import com.axis.commentservice.dto.UserDto;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
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
	@Transient
	private Set<UserDto> follower = new HashSet<UserDto>();
	
	@ElementCollection
	@Embedded
	@Transient
	private Set<UserDto> following = new HashSet<UserDto>();

	
	@Embedded
	@Transient
	private List<Post> savedPost=new ArrayList<>();

}
	

