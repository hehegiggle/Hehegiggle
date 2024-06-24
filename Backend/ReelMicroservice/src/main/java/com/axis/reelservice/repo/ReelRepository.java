
package com.axis.reelservice.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.axis.reelservice.entity.Reel;



public interface ReelRepository extends JpaRepository<Reel, Integer>{

	public List<Reel> findByUserId(Integer userId);
}
