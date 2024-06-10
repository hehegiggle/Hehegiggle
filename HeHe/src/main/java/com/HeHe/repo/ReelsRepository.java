package com.HeHe.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.HeHe.entity.Reels;

public interface ReelsRepository extends JpaRepository<Reels, Integer>{

	public List<Reels> findByUserId(Integer userId);
	
}
