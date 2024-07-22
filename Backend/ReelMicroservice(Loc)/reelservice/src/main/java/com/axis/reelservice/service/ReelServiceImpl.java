package com.axis.reelservice.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.axis.reelservice.dto.UserDTO;
import com.axis.reelservice.entity.Reel;
import com.axis.reelservice.repo.ReelRepository;


@Service
public class ReelServiceImpl implements ReelService {

    @Autowired
    private ReelRepository reelRepository;
    
    @Autowired
    private RestTemplate restTemplate;
    
    private final String userServiceUrl = "http://USER-SERVICE/api/users/req";

    @Override
    public Reel createReel(Reel reel, UserDTO user) {

        Reel createReel = new Reel();
        
        createReel.setCaption(reel.getCaption());
        createReel.setTimestamp(LocalDateTime.now());
        createReel.setVideo(reel.getVideo());
        createReel.setUser(reel.getUser());
        return reelRepository.save(createReel);
    }

    @Override
    public List<Reel> findAllReels() {
        return reelRepository.findAllInDesc();
    }

    @Override
    public List<Reel> findUsersReel(Integer userId) throws Exception {
        return reelRepository.findByUserId(userId);
    }

	@Override
	public UserDTO getUserById(String jwt) {
		System.out.println("token +"+jwt);
		HttpHeaders headers = new HttpHeaders();
		
		headers.set("Authorization", jwt);
		HttpEntity<UserDTO> entity = new HttpEntity<>(headers);
		ResponseEntity<UserDTO> response = restTemplate.exchange(userServiceUrl, HttpMethod.GET, entity, UserDTO.class);
		System.out.println("Response is----------"+response);
		
		return response.getBody();
	}


}
