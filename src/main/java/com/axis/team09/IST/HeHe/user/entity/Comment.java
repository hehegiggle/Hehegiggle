package com.axis.team09.IST.HeHe.user.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity

public class Comment {
	 @Id
	    @GeneratedValue(strategy = GenerationType.AUTO)
	    private Integer id;
	 
	 	private String content;
	 	@ManyToOne
	 	private User user;
	 	
	 	@ManyToMany
	 	private List<User> Liked=new ArrayList<>();
	 	private LocalDateTime createdAt;
	 	
}
