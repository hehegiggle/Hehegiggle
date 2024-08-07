package com.postmicroservice.entity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import com.postmicroservice.dto.UserDto;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class Comments {
	

	private Integer commentId;
	
	@Embedded
	@AttributeOverride(name="id",column = @Column(name="user_id"))
	private UserDto userDto;
	

	private String content;
	
	@Embedded
	@ElementCollection
	private Set<UserDto> likedByUsers= new HashSet<>();
	
	@Embedded
	private Post post;
	
	private LocalDateTime createdAt;
	
	

}
