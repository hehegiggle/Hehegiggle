package com.usermicroservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zosh.model.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {

	PasswordResetToken findByToken(String token);

}
