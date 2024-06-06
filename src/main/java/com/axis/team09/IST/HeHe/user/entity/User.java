package com.axis.team09.IST.HeHe.user.entity;




import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private List<Integer> followers=new ArrayList<>();
    private List<Integer> following=new ArrayList<>();
    private String gender;
    
    @ManyToMany()
    @JsonIgnore
    private List<Post> savedPost=new ArrayList<>();    
     
    @NotNull
    @Size(min = 5, max = 15)
    @Column(nullable = false, unique = true)
    private String username;

    @NotNull
    @Size(min = 8)
    @Column(nullable = false)
    private String password;

    @NotNull
    @Email
    @Column(nullable = false, unique = true)
    private String email;

    @NotNull
    @Column(nullable = false)
    private String firstName;

    @NotNull
    @Column(nullable = false)
    private String lastName;

//
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
//    @Column(nullable = false)
//    @Pattern(regexp = "\\d{2}/\\d{2}/\\d{4}", message = "Date of Birth must be in the format dd/MM/yyyy")
//    private String dateOfBirth;

  
    

//    // Override setPassword to encrypt the password
//    public void setPassword(String password) {
//        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//        this.password = passwordEncoder.encode(password);
//    }

    // Other getters and setters...
}

