package com.axis.team09.IST.HeHe.user.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.axis.team09.IST.HeHe.Config.JwtProvider;
import com.axis.team09.IST.HeHe.user.entity.User;
import com.axis.team09.IST.HeHe.user.repo.UserRepository;
@Service
public class UserServiceImp implements UserServicee{

    @Autowired
    private UserRepository userRepository;

	@Override
	public User register(User user) {
		// TODO Auto-generated method stub
		
		return userRepository.save(user);
	}

	@Override
	public User findById(Integer id) {
		// TODO Auto-generated method stub
		return userRepository.findById(id).get();
	}

	@Override
	public User findByemail(String email) {
		// TODO Auto-generated method stub
		User user=userRepository.findByEmail(email);
		return user;
	}

	@Override
	public User followUser(Integer reqid1, Integer id2) throws Exception{
		// TODO Auto-generated method stub   // localhost/1/2
		User user1=findById(reqid1);
		User user2=findById(id2);
		
		user2.getFollowers().add(user1.getId());
		user1.getFollowing().add(user2.getId());
		register(user1);
		register(user2);
		
		return user1;
	}

	
	@Override
	public User updateUser(Integer id, User user) throws Exception {
	    // Retrieve the user by ID
	    Optional<User> ui = userRepository.findById(id);

	    if (ui.isPresent()) {
	        User existingUser = ui.get();
	        
	        // Update the fields of the existing user with the values from the input user
	        // Assuming the User class has setters for these fields

	        existingUser.setFirstName(user.getFirstName());
	        existingUser.setLastName(user.getLastName());
	        existingUser.setGender(user.getGender());
	        
	      

	        // Save the updated user back to the repository
	        userRepository.save(existingUser);
	        
	        // Return the updated user
	        return existingUser;
	    } else {
	        throw new Exception("User does not exist with id " + id);
	    }
	}


	@Override
	public List<User> search(String query) {
		// TODO Auto-generated method stub
		
		return userRepository.searchUser(query);
	}
	@Override
	public List<User> getAll() {
		// TODO Auto-generated method stub
		return userRepository.findAll();
	}

	@Override
	public User deleteUser(Integer id) {
		// TODO Auto-generated method stub
		User user= userRepository.findById(id).get();
		userRepository.deleteById(id);
		
		return user;
	}

	@Override
	public User findByJwtToken(String jwt) {
		// TODO Auto-generated method stub
		String email=JwtProvider.getEmailFromJWT(jwt);
		
		return userRepository.findByEmail(email);
	}

    
    
    
}
