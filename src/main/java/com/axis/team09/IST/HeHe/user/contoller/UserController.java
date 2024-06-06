package com.axis.team09.IST.HeHe.user.contoller;



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

import com.axis.team09.IST.HeHe.Config.JwtProvider;
import com.axis.team09.IST.HeHe.user.entity.User;
import com.axis.team09.IST.HeHe.user.service.UserServiceImp;

import jakarta.validation.Valid;



@RestController
@RequestMapping("/api/users")
@Validated
public class UserController {

    @Autowired
    private UserServiceImp userService;

   
    @GetMapping("/user")
    public User display(@RequestHeader("Authorization") String jwt) {
    	User loggeduser=getUsrfromToken(jwt);
    	
        return userService.findById(loggeduser.getId());
    }
    @PutMapping("/updateuser")
    public User update(@RequestHeader("Authorization") String jwt,@RequestBody User user) throws Exception{
    	User loggeduser=getUsrfromToken(jwt);
    	
        return userService.updateUser(loggeduser.getId(), user);
    }
    @PutMapping("/users/follow/{id2}")
    public User followUser(@RequestHeader("Authorization") String jwt, @PathVariable  Integer id2)throws Exception {
    	User loggeduser=getUsrfromToken(jwt);
    	
    	return userService.followUser(loggeduser.getId(), id2);
    }
    
    @GetMapping("/users/search")
    public List<User> searchUser(@RequestParam("query") String query){
    	
    	return userService.search(query);
    }
    @GetMapping("/users")
    public List<User> getAll(){
    	
    	return userService.getAll();
    }
    @GetMapping("/useremail/{email}")
    public User getByemail(@PathVariable String email) {
      
        return userService.findByemail(email);
    }
    @DeleteMapping("/user/{id}")
    public User delete(@PathVariable Integer id) {
      
        return userService.deleteUser(id);
    }
    @GetMapping("/profile")
    public User getUsrfromToken(@RequestHeader("Authorization") String jwt) {
    	System.out.println(jwt);
    	
    	return userService.findByJwtToken(jwt);
    	
    }
    
   
}
