package com.axis.team09.IST.HeHe.user.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.axis.team09.IST.HeHe.user.entity.Comment;
import com.axis.team09.IST.HeHe.user.entity.Post;
import com.axis.team09.IST.HeHe.user.entity.User;
import com.axis.team09.IST.HeHe.user.repo.CommentRepository;
import com.axis.team09.IST.HeHe.user.repo.PostRepository;

@Service
public class CommentserviceImp implements CommentService {
	@Autowired
	private PostService postservice;
	@Autowired
	private  UserServicee userservice;
	@Autowired
	private CommentRepository repo;
	
	@Autowired
	private PostRepository postrepo;

	@Override
	public Comment createComment(Comment comm, Integer postid, Integer userid) throws Exception {
		// TODO Auto-generated method stub
		User user=userservice.findById(userid);
		Post post=postservice.findPostByid(postid);
		
		comm.setUser(user);
		comm.setCreatedAt(LocalDateTime.now());
		Comment savedcomment=repo.save(comm);
		
		post.getComments().add(savedcomment);
		postrepo.save(post);
		return savedcomment;
	}

	@Override
	public Comment findById(Integer CommentId) throws Exception {
		// TODO Auto-generated method stub
	Optional<Comment>op=repo.findById(CommentId);
	if(op.isEmpty()) {
		throw new Exception("Cmment not exists");
	}
		return op.get();
	}

	@Override
	public Comment likedComment(Integer commentId, Integer userId) throws Exception {
		// TODO Auto-generated method stub
		Comment comm=findById(commentId);
		User user=userservice.findById(userId);
		if(!comm.getLiked().contains(user)) {
			comm.getLiked().add(user);
		}
		else
			comm.getLiked().remove(user);
		return repo.save(comm);
	}

}
