package com.axis.reelservice.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.axis.reelservice.dto.UserDTO;
import com.axis.reelservice.entity.Reel;
import com.axis.reelservice.entity.ReelLikedBy;
import com.axis.reelservice.event.NotificationEvent;
import com.axis.reelservice.repo.ReelLikeRepository;
import com.axis.reelservice.repo.ReelRepository;

@Service
public class ReelServiceImpl implements ReelService {

	@Autowired
	private ReelRepository reelRepository;

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private NotificationService notificationService;

	@Autowired
	private ReelLikeRepository likeRepository;

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
		System.out.println("token +" + jwt);
		HttpHeaders headers = new HttpHeaders();

		headers.set("Authorization", jwt);
		HttpEntity<UserDTO> entity = new HttpEntity<>(headers);
		ResponseEntity<UserDTO> response = restTemplate.exchange(userServiceUrl, HttpMethod.GET, entity, UserDTO.class);
		System.out.println("Response is----------" + response);

		return response.getBody();
	}

	@Override
	public String deleteReelByReelId(Integer reelId, String token) throws Exception {

		UserDTO user = getUserById(token);

		Optional<Reel> reel = reelRepository.findById(reelId);

		if (reel.get().getUser().getId().equals(user.getId())) {
			reelRepository.deleteById(reelId);
			return "Reel Deleted Successfully";
		} else {
			throw new Exception("Unauthorized Access!!!");
		}
	}

	public String likeReel(Integer reelId, String token) throws Exception {
		UserDTO user = getUserById(token);
		Reel reel = reelRepository.findById(reelId).orElseThrow(() -> new Exception("Reel not found"));

		if (likeRepository.existsByUserIdAndReelId(user.getId(), reelId)) {
			throw new Exception("User has already liked this reel");
		}

		ReelLikedBy like = new ReelLikedBy();
		like.setUser(user);
		like.setReelId(reelId);
		like.setLikedAt(LocalDateTime.now());

		reel.addLike(like);

		// Send Notification
		NotificationEvent notificationEvent = new NotificationEvent(null, "Reel Like",
				reel.getUser().getId().toString(), null, reelId.toString(), null, user.getId().toString(),
				user.getUsername() + " liked your reel", LocalDateTime.now());
		if (!reel.getUser().getId().toString().equals(user.getId().toString())) {
			notificationService.sendNotification(notificationEvent);
			reelRepository.save(reel);
		} else {
			reelRepository.save(reel);
		}

		return "Reel liked successfully";
	}

	public String unlikeReel(Integer reelId, String token) throws Exception {
		UserDTO user = getUserById(token);
		Reel reel = reelRepository.findById(reelId).orElseThrow(() -> new Exception("Reel not found"));

		ReelLikedBy like = reel.getLikes().stream().filter(l -> l.getUser().getId().equals(user.getId())).findFirst()
				.orElseThrow(() -> new Exception("Like not found"));

		reel.removeLike(like);
		likeRepository.delete(like);
		reelRepository.save(reel);

		return "Reel unliked successfully";
	}

	public Optional<Reel> getReelById(Integer reelId, String token) {
		UserDTO user = getUserById(token);
		Optional<Reel> reelGot = reelRepository.findById(reelId);
		System.out.println("I GOT REEL------------" + reelGot);
		return reelGot;

	}
}
