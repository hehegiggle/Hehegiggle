package com.axis.reelservice.entity;

import java.time.LocalDateTime;

import com.axis.reelservice.dto.UserDTO;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ReelLikedBy {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@Embedded
	@AttributeOverrides({ @AttributeOverride(name = "id", column = @Column(name = "user_id")),
			@AttributeOverride(name = "email", column = @Column(name = "user_email")),
			@AttributeOverride(name = "username", column = @Column(name = "user_username")),
			@AttributeOverride(name = "image", column = @Column(name = "user_image")) })
	private UserDTO user;

	private Integer reelId;

	private LocalDateTime likedAt;
}
