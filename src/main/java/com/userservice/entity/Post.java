package com.userservice.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data

@NoArgsConstructor
@AllArgsConstructor
public class Post {
	
	
	private Integer id;
	private String caption;
	private  String image;
	private  String video;
	@OneToMany
	private List<Integer> comments =new ArrayList<>();
	
	private Integer userId;
	private LocalDateTime createdAt;
	
	private List<Integer> liked=new ArrayList<>();
	

}
