package com.axis.reelservice.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CommentDto {
	private Integer commentId;
	private Integer reelId; // Reference the reel
	private String content;
	private UserDTO user;
	private LocalDateTime createdAt;
}
