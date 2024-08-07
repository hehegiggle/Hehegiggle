package com.postmicroservice;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.postmicroservice.controller.PostController;
import com.postmicroservice.entity.Comments;
import com.postmicroservice.entity.Post;
import com.postmicroservice.exception.PostException;
import com.postmicroservice.exception.UserException;
import com.postmicroservice.response.MessageResponse;
import com.postmicroservice.service.PostService;

public class PostControllerTest {

    private MockMvc mockMvc;

    @Mock
    private PostService postService;

    @InjectMocks
    private PostController postController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(postController).build();
    }

    @Test


    
    public void testFindPostByUserIdHandler() throws Exception {
        Post post = new Post();
        post.setCaption("Test Caption");

        List<Post> posts = Arrays.asList(post);

        when(postService.findPostByUserId(1)).thenReturn(posts);

        mockMvc.perform(get("/api/posts/all/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].caption").value("Test Caption"));
    }

    @Test
    public void testFindAllPostHandler() throws Exception {
        Post post = new Post();
        post.setCaption("Test Caption");

        List<Post> posts = Arrays.asList(post);

        when(postService.findAllPost()).thenReturn(posts);

        mockMvc.perform(get("/api/posts/"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].caption").value("Test Caption"));
    }

    @Test
    public void testFindPostByIdHandler() throws Exception {
        Post post = new Post();
        post.setCaption("Test Caption");

        when(postService.findePostById("1")).thenReturn(post);

        mockMvc.perform(get("/api/posts/1")
                .header("Authorization", "token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.caption").value("Test Caption"));
    }

    @Test
    public void testLikePostHandler() throws Exception {
        Post post = new Post();
        post.setCaption("Test Caption");

        when(postService.likePost("1", "token")).thenReturn(post);

        mockMvc.perform(put("/api/posts/like/1")
                .header("Authorization", "token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.caption").value("Test Caption"));
    }

    @Test
    public void testUnLikePostHandler() throws Exception {
        Post post = new Post();
        post.setCaption("Test Caption");

        when(postService.unLikePost("1", "token")).thenReturn(post);

        mockMvc.perform(put("/api/posts/unlike/1")
                .header("Authorization", "token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.caption").value("Test Caption"));
    }

    @Test
    public void testDeletePostHandler() throws Exception {
        String message = "Post Deleted Successfully";

        when(postService.deletePost("1", "token")).thenReturn(message);

        mockMvc.perform(delete("/api/posts/delete/1")
                .header("Authorization", "token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(message));
    }

    @Test
    public void testSavedPostHandler() throws Exception {
        String message = "Post Saved Successfully";

        when(postService.savedPost("1", "token")).thenReturn(message);

        mockMvc.perform(put("/api/posts/save_post/1")
                .header("Authorization", "token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(message));
    }

    @Test
    public void testUnSavedPostHandler() throws Exception {
        String message = "Post Removed Successfully";

        when(postService.unSavePost("1", "token")).thenReturn(message);

        mockMvc.perform(put("/api/posts/unsave_post/1")
                .header("Authorization", "token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(message));
    }

    @Test
    public void testEditPostHandler() throws Exception {
        Post post = new Post();
        post.setCaption("Updated Caption");

        mockMvc.perform(put("/api/posts/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(post)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Post Updated Succefully"));
    }


}

