package com.axis.commentservice.entity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.antlr.v4.runtime.misc.NotNull;

import com.axis.commentservice.dto.UserDto;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comments {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer commentId;

	@Embedded
	@NotNull
	@AttributeOverrides({ @AttributeOverride(name = "id", column = @Column(name = "user_idd")),
			@AttributeOverride(name = "email", column = @Column(name = "user_email")),
			@AttributeOverride(name = "username", column = @Column(name = "user_usernamee")),
			@AttributeOverride(name = "name", column = @Column(name = "user_name")),
			@AttributeOverride(name = "userimage", column = @Column(name = "user_image")) // Unique column name
	})
	private UserDto userDto;

	@NotNull
	private String content;

	@ElementCollection
	private Set<UserDto> likedByUsers = new HashSet<>();

	@Embedded
	@AttributeOverrides({ @AttributeOverride(name = "id", column = @Column(name = "postid")),
			@AttributeOverride(name = "email", column = @Column(name = "post_user_email")),
			@AttributeOverride(name = "username", column = @Column(name = "post_user_username")),
			@AttributeOverride(name = "name", column = @Column(name = "post_user_name")),
			@AttributeOverride(name = "userimage", column = @Column(name = "post_user_image")) // Unique column name
	})
	private Post post;

	private Reel reel;

	private LocalDateTime createdAt;
}
