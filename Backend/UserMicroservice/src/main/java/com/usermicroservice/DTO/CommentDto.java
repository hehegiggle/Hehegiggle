package com.usermicroservice.DTO;

import java.time.LocalDateTime;

import java.io.Serializable;
import jakarta.persistence.Embeddable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


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
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto implements Serializable{

	private Integer id;

	private UserDto userDto;
	

	private String content;

	private Set<UserDto> likedByUsers= new HashSet<>();

	private PostDto post;
	
	private LocalDateTime createdAt;
	
}
