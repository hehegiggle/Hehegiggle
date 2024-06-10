package com.HeHe.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name ="post_tbl")
public class Post {
   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   @Column(name = "post_id")
   private Integer id;
   
   private String caption;
   
   private String image;
   
   private String video;
   
   @ManyToOne
   private User user;
   
   @OneToMany
   private List<User> liked=new ArrayList<>();
   
   private LocalDateTime createdAt;
   
   @OneToMany
   private List<Comment> comments=new ArrayList<>();
   
      
}
