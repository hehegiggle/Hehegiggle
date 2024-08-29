package com.axis.reelservice.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.axis.reelservice.entity.ReelLikedBy;

public interface ReelLikeRepository extends JpaRepository<ReelLikedBy, Integer> {
	boolean existsByUserIdAndReelId(Integer userId, Integer reelId);
}
