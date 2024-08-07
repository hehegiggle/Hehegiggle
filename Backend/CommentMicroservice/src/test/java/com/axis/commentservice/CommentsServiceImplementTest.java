package com.axis.commentservice;


import com.axis.commentservice.entity.Comments;
import com.axis.commentservice.entity.Post;
import com.axis.commentservice.entity.User;
import com.axis.commentservice.dto.UserDto;
import com.axis.commentservice.exception.CommentException;
import com.axis.commentservice.exception.PostException;
import com.axis.commentservice.exception.UserException;
import com.axis.commentservice.repository.CommentRepository;
import com.axis.commentservice.service.CommentsServiceImplement;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

public class CommentsServiceImplementTest {

    @InjectMocks
    private CommentsServiceImplement commentService;

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private ModelMapper modelMapper;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateComment() throws PostException, UserException {
        Comments comment = new Comments();
        comment.setContent("Test Comment");
        comment.setCreatedAt(LocalDateTime.now());
        User user = new User(null, "1", "user@example.com", "username", "User", "userimage.png", null, null, null, null, null, null, null);
        Post post = new Post();
        post.setId("1");

        when(commentRepository.save(any(Comments.class))).thenReturn(comment);
        when(restTemplate.exchange(anyString(), eq(HttpMethod.GET), any(HttpEntity.class), eq(User.class)))
                .thenReturn(ResponseEntity.ok(user));
        when(restTemplate.exchange(anyString(), eq(HttpMethod.GET), any(HttpEntity.class), eq(Post.class)))
                .thenReturn(ResponseEntity.ok(post));

        Comments createdComment = commentService.createComment(comment, "1", "token");

        assertNotNull(createdComment);
        assertEquals("Test Comment", createdComment.getContent());
        verify(commentRepository, times(1)).save(any(Comments.class));
    }

    @Test
    public void testFindCommentById() throws CommentException {
        Comments comment = new Comments(1, new UserDto(), "Test Comment", new HashSet<>(), null, LocalDateTime.now());
        when(commentRepository.findById(1)).thenReturn(Optional.of(comment));

        Comments foundComment = commentService.findCommentById(1);

        assertNotNull(foundComment);
        assertEquals(1, foundComment.getCommentId());
        assertEquals("Test Comment", foundComment.getContent());
    }

    
 

    @Test
    public void testDeleteCommentById() throws CommentException {
        Comments comment = new Comments(1, new UserDto(), "Test Comment", new HashSet<>(), null, LocalDateTime.now());
        when(commentRepository.findById(1)).thenReturn(Optional.of(comment));

        String response = commentService.deleteCommentById(1);

        assertEquals("Comment Deleted Successfully", response);
        verify(commentRepository, times(1)).deleteById(1);
    }

    @Test
    public void testEditComment() throws CommentException {
        Comments comment = new Comments(1, new UserDto(), "Original Comment", new HashSet<>(), null, LocalDateTime.now());
        when(commentRepository.findById(1)).thenReturn(Optional.of(comment));

        Comments updatedComment = new Comments();
        updatedComment.setContent("Updated Comment");

        String response = commentService.editComment(updatedComment, 1);

        assertEquals("Comment Updated Successfully", response);
        assertEquals("Updated Comment", comment.getContent());
        verify(commentRepository, times(1)).save(any(Comments.class));
    }

   
}


