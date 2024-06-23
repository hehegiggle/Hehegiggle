package com.axis.commentservice.dto;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private Integer id;
    private String email;
    private String username;
    private String name; // Ensure this is properly handled in the embedding classes
    private String userimage;
}


