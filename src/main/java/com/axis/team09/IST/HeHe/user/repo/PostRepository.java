package com.axis.team09.IST.HeHe.user.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.axis.team09.IST.HeHe.user.entity.Post;

public interface PostRepository extends JpaRepository<Post, Integer> {

	@Query("select p from Post p where p.user.id=:userid")
	List<Post> findPostByUserId(Integer userid);
}
