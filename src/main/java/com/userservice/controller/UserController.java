
package com.userservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.userservice.Config.JwtProvider;
import com.userservice.entity.User;
import com.userservice.service.UserServiceImp;

import jakarta.validation.Valid;



@RestController
//@RequestMapping("/api/users")
@Validated
public class UserController {

    @Autowired
    private UserServiceImp userService;

    @GetMapping("/user/io")
    public User displayq(@RequestHeader("Authorization") String jwt) {
    	User loggeduser=getUsrfromToken(jwt);
    	System.out.println(JwtProvider.getUserIdFromJWT(jwt));
    	
        return userService.findById(loggeduser.getId());
    }
   
    @GetMapping("/api/users/user")
    public User display(@RequestHeader("Authorization") String jwt) {
    	System.out.println(jwt);
    	User loggeduser=getUsrfromToken(jwt);
    	
        return userService.findById(loggeduser.getId());
    }
    @PutMapping("/api/users/updateuser")
    public User update(@RequestHeader("Authorization") String jwt,@RequestBody User user) throws Exception{
    	User loggeduser=getUsrfromToken(jwt);
    	
        return userService.updateUser(loggeduser.getId(), user);
    }
    @PutMapping("/api/users/users/follow/{id2}")
    public User followUser(@RequestHeader("Authorization") String jwt, @PathVariable  Integer id2)throws Exception {
    	User loggeduser=getUsrfromToken(jwt);
    	
    	return userService.followUser(loggeduser.getId(), id2);
    }
    
    @GetMapping("/api/users/users/search")
    public List<User> searchUser(@RequestParam("query") String query){
    	
    	return userService.search(query);
    }
    @GetMapping("/api/users/users")
    public List<User> getAll(){
    	
    	return userService.getAll();
    }
    @GetMapping("/api/users/useremail/{email}")
    public User getByemail(@PathVariable String email) {
      
        return userService.findByemail(email);
    }
    @DeleteMapping("/api/users/user/{id}")
    public User delete(@PathVariable Integer id) {
      
        return userService.deleteUser(id);
    }
    @GetMapping("/api/users/profile")
    public User getUsrfromToken(@RequestHeader("Authorization") String jwt) {
    	System.out.println(jwt);
    	
    	return userService.findByJwtToken(jwt);
    	
    }
    @GetMapping("/save/user")
    public void save(@RequestBody User user) {
      
        userService.save(user);
    }
    
    @PostMapping("/api/users/user/savedpost/{postId}")
    public ResponseEntity<?> savedpost(@RequestHeader("Authorization") String jwt, @PathVariable Integer postId) {
        try {
            User user = getUsrfromToken(jwt);
            System.out.println(user);
            userService.addSavedPost(user.getId(), postId);
            return ResponseEntity.ok().build(); // Return 200 OK if successful
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save post: " + e.getMessage());
        }
    }

}
