package com.HeHe.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Reels {

	
	private Integer id;
	
	private String title;
	
	private String video;
	
	@ManyToOne
	private User user;
	
	
	
}
