package com.axis.team09.IST.HeHe.user.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.axis.team09.IST.HeHe.user.entity.Post;
import com.axis.team09.IST.HeHe.user.entity.Reels;

public interface ReelsRepository extends JpaRepository<Reels, Integer> {

	
	List<Reels> findReelsByUserId(Integer userid);
}

