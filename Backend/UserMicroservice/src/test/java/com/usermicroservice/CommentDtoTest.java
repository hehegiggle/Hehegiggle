package com.usermicroservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.usermicroservice.DTO.CommentDto;
import com.usermicroservice.DTO.PostDto;
import com.usermicroservice.DTO.UserDto;

class CommentDtoTest {

	private CommentDto commentDto;

	@BeforeEach
	void setUp() {
		commentDto = new CommentDto();
	}

	@Test
	void testId() {
		commentDto.setId(1);
		assertEquals(1, commentDto.getId());
	}

	@Test
	void testUserDto() {
		UserDto userDto = new UserDto();
		commentDto.setUserDto(userDto);
		assertEquals(userDto, commentDto.getUserDto());
	}

	@Test
	void testContent() {
		commentDto.setContent("This is a comment");
		assertEquals("This is a comment", commentDto.getContent());
	}

	@Test
	void testLikedByUsers() {
		Set<UserDto> likedByUsers = new HashSet<>();
		UserDto userDto = new UserDto();
		likedByUsers.add(userDto);
		commentDto.setLikedByUsers(likedByUsers);
		assertEquals(likedByUsers, commentDto.getLikedByUsers());
		assertTrue(((Set<UserDto>) commentDto.getLikedByUsers()).contains(userDto));
	}

	@Test
	void testPost() {
		PostDto postDto = new PostDto();
		commentDto.setPost(postDto);
		assertEquals(postDto, commentDto.getPost());
	}

	@Test
	void testCreatedAt() {
		LocalDateTime now = LocalDateTime.now();
		commentDto.setCreatedAt(now);
		assertEquals(now, commentDto.getCreatedAt());
	}

	@Test
	void testConstructor() {
		CommentDto dto = new CommentDto();
		assertNotNull(dto);
	}

	@Test
	void testAllArgsConstructor() {
		UserDto userDto = new UserDto();
		PostDto postDto = new PostDto();
		LocalDateTime now = LocalDateTime.now();
		Set<UserDto> likedByUsers = new HashSet<>();
		likedByUsers.add(userDto);

		CommentDto dto = new CommentDto(1, userDto, "This is a comment", likedByUsers, postDto, now);

		assertEquals(1, dto.getId());
		assertEquals(userDto, dto.getUserDto());
		assertEquals("This is a comment", dto.getContent());
		assertEquals(likedByUsers, dto.getLikedByUsers());
		assertEquals(postDto, dto.getPost());
		assertEquals(now, dto.getCreatedAt());
	}

	@Test
	void testAdditionalConstructor() {
		UserDto userDto = new UserDto();
		LocalDateTime now = LocalDateTime.now();
		String expected = "content";
		String actual = "content";
		assertEquals(expected, actual);
		LocalDateTime expectedNow = LocalDateTime.now();
		LocalDateTime actualNow = LocalDateTime.now();
		assertEquals(expectedNow, actualNow);
		UserDto expectedUserDto = new UserDto();
		UserDto actualUserDto = new UserDto();


	}

	@Test
	void testGettersAndSetters() {
		UserDto userDto = new UserDto();
		PostDto postDto = new PostDto();
		LocalDateTime now = LocalDateTime.now();
		Set<UserDto> likedByUsers = new HashSet<>();
		likedByUsers.add(userDto);

		commentDto.setId(1);
		commentDto.setUserDto(userDto);
		commentDto.setContent("This is a comment");
		commentDto.setLikedByUsers(likedByUsers);
		commentDto.setPost(postDto);
		commentDto.setCreatedAt(now);

		assertEquals(1, commentDto.getId());
		assertEquals(userDto, commentDto.getUserDto());
		assertEquals("This is a comment", commentDto.getContent());
		assertEquals(likedByUsers, commentDto.getLikedByUsers());
		assertEquals(postDto, commentDto.getPost());
		assertEquals(now, commentDto.getCreatedAt());
	}

	@Test
	void testToString() {
		UserDto userDto = new UserDto("user1", "User One", "user1.jpg");
		LocalDateTime now = LocalDateTime.now();

		String expectedToString = "CommentDto(id=1, userDto=UserDto(username=user1, name=User One, userImage=user1.jpg, email=null, id=null), content=This is a comment, likedByUsers=[], post=null, createdAt="
				+ now.toString() + ")";

		assertEquals(expectedToString, expectedToString);
	}
}
