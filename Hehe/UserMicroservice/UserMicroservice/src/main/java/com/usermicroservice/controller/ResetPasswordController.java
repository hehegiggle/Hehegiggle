package com.usermicroservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.usermicroservice.entity.PasswordResetToken;
import com.usermicroservice.entity.User;
import com.usermicroservice.exception.UserException;
import com.usermicroservice.repository.UserRepository;
import com.usermicroservice.request.ResetPasswordRequest;
import com.usermicroservice.response.ApiResponse;
import com.usermicroservice.service.PasswordResetTokenService;
import com.usermicroservice.service.UserService;

@RestController
@RequestMapping("/resetpassword")
public class ResetPasswordController {

	@Autowired
	private PasswordResetTokenService passwordResetTokenService;

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository repo;

	@PostMapping("/reset")
	public ResponseEntity<ApiResponse> resetPassword(@RequestParam("email") String email) throws UserException {
		User user = repo.findByEmail(email).get();
		System.out.println("nottttttttttttt");
		System.out.println("ResetPasswordController.resetPassword()" + email);

		if (user == null) {
			throw new UserException("user not found");
		}

		userService.sendPasswordResetEmail(user);

		ApiResponse res = new ApiResponse();
		res.setMessage("Password reset email sent successfully.");
		res.setStatus(true);

		return ResponseEntity.ok(res);
	}

	@PostMapping
	public ResponseEntity<ApiResponse> resetPassword(

			@RequestBody ResetPasswordRequest req) throws UserException {

		PasswordResetToken resetToken = passwordResetTokenService.findByToken(req.getToken());

		if (resetToken == null) {
			throw new UserException("token is required...");
		}
		if (resetToken.isExpired()) {
			passwordResetTokenService.delete(resetToken);
			throw new UserException("token get expired...");

		}

		// Update user's password
		User user = resetToken.getUser();
		userService.updatePassword(user, req.getPassword());

		// Delete the token
		passwordResetTokenService.delete(resetToken);

		ApiResponse res = new ApiResponse();
		res.setMessage("Password updated successfully.");
		res.setStatus(true);

		return ResponseEntity.ok(res);
	}

}