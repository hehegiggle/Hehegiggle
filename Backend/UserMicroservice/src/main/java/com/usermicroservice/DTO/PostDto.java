package com.usermicroservice.DTO;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;
import lombok.Data;

public class PostDto {


    private String id;
    private String caption;
    

    private String image;
    private String location;
    private LocalDateTime createdAt;
    
    @Transient
    private UserDto user;

    @Transient
    private List<CommentDto> comments = new ArrayList<>();
    
    @Transient
    private Set<UserDto> likedByUsers = new HashSet<>(); 
}
