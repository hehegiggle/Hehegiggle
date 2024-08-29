package com.axis.commentservice.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.axis.commentservice.dto.UserDto;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class Post {

	@Column(name = "post_id")
	private String id;
	@Column(name = "post_caption")
	private String caption;
	@Column(name = "post_image")
	private String image;
	@Column(name = "post_location")
	private String location;

//    @Embedded
//    @Transient
//    private UserDto user;

	@ElementCollection
	@Transient
	@JsonIgnore
	private List<Comments> comments = new ArrayList<>();

//    @ElementCollection
//    private Set<UserDto> likedByUsers = new HashSet<>();

	@Override
	public String toString() {
		return "Post{" + "id=" + id + ", caption=" + caption + ", image='" + image + ", location=" + location + '\'' +
		// Handle collections properly

				'}';
	}

	@Column(name = "user_id")
	private Integer userId;

}
