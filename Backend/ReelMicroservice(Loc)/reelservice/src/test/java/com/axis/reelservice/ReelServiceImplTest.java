package com.axis.reelservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.axis.reelservice.dto.UserDTO;
import com.axis.reelservice.entity.Reel;
import com.axis.reelservice.repo.ReelRepository;
import com.axis.reelservice.service.ReelServiceImpl;

public class ReelServiceImplTest {

    @Mock
    private ReelRepository reelRepository;

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private ReelServiceImpl reelService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateReel() {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(1);

        Reel reel = new Reel();
        reel.setTitle("Sample Reel");
        reel.setVideo("sample_video_url");

        Reel savedReel = new Reel();
        savedReel.setId(1);
        savedReel.setTitle("Sample Reel");
        savedReel.setVideo("sample_video_url");
        savedReel.setUserId(1);

        when(reelRepository.save(any(Reel.class))).thenReturn(savedReel);

        Reel result = reelService.createReel(reel, userDTO);

        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals("Sample Reel", result.getTitle());
        assertEquals("sample_video_url", result.getVideo());
        assertEquals(1, result.getUserId());
    }

    @Test
    public void testFindAllReels() {
        Reel reel = new Reel();
        reel.setId(1);
        reel.setTitle("Sample Reel");
        reel.setVideo("sample_video_url");
        reel.setUserId(1);

        List<Reel> reels = Arrays.asList(reel);

        when(reelRepository.findAll()).thenReturn(reels);

        List<Reel> result = reelService.findAllReels();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Sample Reel", result.get(0).getTitle());
    }

    @Test
    public void testFindUsersReel() throws Exception {
        Reel reel = new Reel();
        reel.setId(1);
        reel.setTitle("Sample Reel");
        reel.setVideo("sample_video_url");
        reel.setUserId(1);

        List<Reel> reels = Arrays.asList(reel);

        when(reelRepository.findByUserId(any(Integer.class))).thenReturn(reels);

        List<Reel> result = reelService.findUsersReel(1);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Sample Reel", result.get(0).getTitle());
    }

    @Test
    public void testGetUserById() {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(1);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer sampleToken");
        HttpEntity<UserDTO> entity = new HttpEntity<>(headers);

        ResponseEntity<UserDTO> responseEntity = ResponseEntity.ok(userDTO);

        when(restTemplate.exchange(
                any(String.class), 
                any(HttpMethod.class), 
                any(HttpEntity.class), 
                any(Class.class)
        )).thenReturn(responseEntity);

        UserDTO result = reelService.getUserById("Bearer sampleToken");

        assertNotNull(result);
        assertEquals(1, result.getId());
    }
}


