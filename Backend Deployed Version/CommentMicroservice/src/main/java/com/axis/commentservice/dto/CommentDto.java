package com.axis.commentservice.dto;

import java.time.LocalDateTime;

import java.io.Serializable;
import jakarta.persistence.Embeddable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.axis.commentservice.entity.Post;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;
import lombok.Data;

@Embeddable
public class CommentDto implements Serializable{

	private Integer commentId;
	@Transient
	private UserDto userDto;
	

	private String content;

	@Transient
	private Set<UserDto> likedByUsers= new HashSet<>();

	@Embedded
	@Transient
	private Post post;
	
	private LocalDateTime createdAt;
	
}
