package com.postmicroservice.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.postmicroservice.entity.Post;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {

	@Query("{ 'user_id' : ?0 }")
	public List<Post> findByUserId(Integer userId);

	@Query("{ 'user.id' : { $in: :#{#users} } }")
	public List<Post> findAllPostByUserIds(@Param("users") List<Integer> userIds);

	@Query("{ 'user.id' : { $in: :#{#users} } }")
	public List<Post> findAllPostByUserIdsSortedByDateDesc(@Param("users") List<Integer> userIds);

	@Query("{}")
	List<Post> findAllPosts(Sort sort);

}
