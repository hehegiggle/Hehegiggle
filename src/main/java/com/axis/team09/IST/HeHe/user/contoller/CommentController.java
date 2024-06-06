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
import com.axis.team09.IST.HeHe.user.entity.Comment;
import com.axis.team09.IST.HeHe.user.entity.User;
import com.axis.team09.IST.HeHe.user.service.CommentService;
import com.axis.team09.IST.HeHe.user.service.UserServiceImp;
import com.axis.team09.IST.HeHe.user.service.UserServicee;

import jakarta.validation.Valid;



@RestController
@RequestMapping("/api/comments")
@Validated
public class CommentController {

    @Autowired
    private CommentService commService;
    
    @Autowired
	private  UserServicee userservice;
   
   
    @PostMapping("/post/{postid}")
    public Comment createComment(@RequestHeader("Authorization") String jwt,@RequestBody Comment comm,
    		@PathVariable Integer postid) throws Exception{
  
    	User user=userservice.findByJwtToken(jwt);
    	Comment comment=commService.createComment(comm, postid, user.getId());
        return comment;
    }
    @PutMapping("/like/{commentid}")
    public Comment likeComment(@RequestHeader("Authorization") String jwt, @PathVariable  Integer commentid)throws Exception {
    	User loggeduser=userservice.findByJwtToken(jwt);
    	Comment comment=commService.likedComment(commentid, loggeduser.getId());
    	return comment;
    }
    
   

    
    
   
}
