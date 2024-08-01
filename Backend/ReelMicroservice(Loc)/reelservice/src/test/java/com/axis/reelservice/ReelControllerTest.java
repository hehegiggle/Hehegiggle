package com.axis.reelservice;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.axis.reelservice.controller.ReelController;
import com.axis.reelservice.dto.UserDTO;
import com.axis.reelservice.entity.Reel;
import com.axis.reelservice.service.ReelService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(ReelController.class)
public class ReelControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ReelService reelService;

    @InjectMocks
    private ReelController reelController;

    private UserDTO user;
    private Reel reel;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(reelController).build();
        
        user = new UserDTO();
        user.setId(1);
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john.doe@example.com");

        reel = new Reel();
        reel.setId(1);
        reel.setTitle("Sample Reel");
        reel.setVideo("http://example.com/video.mp4");
        reel.setUserId(user.getId());
    }

    @Test
    public void testCreateReels() throws Exception {
        when(reelService.getUserById(any(String.class))).thenReturn(user);
        when(reelService.createReel(any(Reel.class), any(UserDTO.class))).thenReturn(reel);

        mockMvc.perform(post("/api/reels")
                .header("Authorization", "Bearer token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(reel)))
                .andExpect(status().isOk())
                .andExpect(content().json(new ObjectMapper().writeValueAsString(reel)));
    }

    @Test
    public void testFindAllReels() throws Exception {
        List<Reel> reels = Arrays.asList(reel);
        when(reelService.getUserById(any(String.class))).thenReturn(user);
        when(reelService.findAllReels()).thenReturn(reels);

        mockMvc.perform(get("/api/reels")
                .header("Authorization", "Bearer token")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(new ObjectMapper().writeValueAsString(reels)));
    }

    @Test
    public void testFindUsersReels() throws Exception {
        List<Reel> reels = Arrays.asList(reel);
        when(reelService.getUserById(any(String.class))).thenReturn(user);
        when(reelService.findUsersReel(any(Integer.class))).thenReturn(reels);

        mockMvc.perform(get("/api/reels/user/{userId}", user.getId())
                .header("Authorization", "Bearer token")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(new ObjectMapper().writeValueAsString(reels)));
    }
}
