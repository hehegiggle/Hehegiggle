package com.axis.commentservice.entity;

import java.time.LocalDateTime;

import com.axis.commentservice.dto.UserDto;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
@ToString
public class Reel {

	@Column(name = "reel_id")
	private Integer id;

	@Column(name = "reel_caption")
	private String caption;

	@Column(name = "reel_video")
	private String video;

	@Column(name = "reel_timestamp")
	private LocalDateTime timestamp;

	private UserDto user;
}
