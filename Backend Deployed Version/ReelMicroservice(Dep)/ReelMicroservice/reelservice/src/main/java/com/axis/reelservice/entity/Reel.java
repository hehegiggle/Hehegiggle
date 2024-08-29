
package com.axis.reelservice.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.axis.reelservice.dto.CommentDto;
import com.axis.reelservice.dto.UserDTO;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity

public class Reel {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	private String caption;

	private String video;

	private LocalDateTime timestamp;

	@Embedded
	@AttributeOverride(name = "id", column = @Column(name = "user_id"))
	@AttributeOverride(name = "email", column = @Column(name = "user_email"))
	@AttributeOverride(name = "username", column = @Column(name = "user_username"))
	@AttributeOverride(name = "image", column = @Column(name = "user_image"))
	private UserDTO user;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "reelId")
	private Set<ReelLikedBy> likes = new HashSet<>();

	@Transient
	private List<CommentDto> comments;

	public Reel(int i, String string, int j) {
		// TODO Auto-generated constructor stub
	}

	public void addLike(ReelLikedBy like) {
		this.likes.add(like);
	}

	public void removeLike(ReelLikedBy like) {
		this.likes.remove(like);
	}
}
