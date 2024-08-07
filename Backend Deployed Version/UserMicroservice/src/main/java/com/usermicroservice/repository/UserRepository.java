package com.usermicroservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.usermicroservice.entity.User;
public interface UserRepository extends JpaRepository<User, Integer>{

	public Optional<User> findByEmail(String email);
	
	public Optional<User> findByUsername(String username);
	
	@Query("SELECT u FROM User u WHERE u.id IN :users")
    public List<User> findAllUserByUserIds(@Param("users") List<Integer> userIds);
	
	@Query("SELECT DISTINCT u FROM User u WHERE u.username LIKE %:query% OR u.email LIKE %:query%")
	public List<User> findByQuery(@Param("query") String query);
	
}
