package com.usermicroservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.usermicroservice.entity.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {

	PasswordResetToken findByToken(String token);

}