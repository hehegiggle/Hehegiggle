package com.axis.team09.IST.HeHe.user.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.axis.team09.IST.HeHe.user.entity.Post;
import com.axis.team09.IST.HeHe.user.entity.User;
import com.axis.team09.IST.HeHe.user.repo.PostRepository;
import com.axis.team09.IST.HeHe.user.repo.UserRepository;

@Service
public class PostServiceImp implements PostService {

	@Autowired
	private PostRepository repo;
	@Autowired
	private UserServicee userservice;

	@Autowired
	private UserRepository userrepo;

	@Override
	public Post createpost(Post posta,Integer id) throws Exception {
		User user=userservice.findById(id);
		// TODO Auto-generated method stub
		posta.setUser(user);
     	posta.setCreatedAt(LocalDateTime.now());
		return repo.save(posta);
	}

	@Override
	public String deletePost(Integer id, Integer postId) throws Exception {
		// TODO Auto-generated method stub
		Post post=findPostByid(postId);
     	User user=userservice.findById(id);
		if(post.getUser().getId()!=user.getId()) {
			throw new Exception("You can delete another post");
		}
		repo.deleteById(postId);
		return "deleted";
	}

	@Override
	public List<Post> findPostByUserId(Integer id) throws Exception {
		// TODO Auto-generated method stub
		return repo.findPostByUserId(id);
	}

	@Override
	public List<Post> findAllPost() throws Exception {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	@Override
	public Post findPostByid(Integer PostId) throws Exception {
		// TODO Auto-generated method stub
		Optional<Post>op=repo.findById(PostId);
		if(op.isEmpty()) {
			throw new Exception("post not found"+PostId);
		}
		return op.get();
	}

	@Override
	public Post savePost(Integer postId, Integer id) throws Exception, Exception {
		// TODO Auto-generated method stub
		Post post=findPostByid(postId);
     	User user=userservice.findById(id);
     	
     	if (user.getSavedPost().contains(post)) {
     	    user.getSavedPost().remove(post);
     	}
     	
     	else {
     		user.getSavedPost().add(post);
     	}
     	userrepo.save(user);
		return post ;
	}

	@Override
	public Post likedPost(Integer postId, Integer id) throws Exception {
		// TODO Auto-generated method stub
		Post post=findPostByid(postId);
     	User user=userservice.findById(id);
     	
     	if(post.getLiked().contains(user)) {
     		post.getLiked().remove(user);
     	}
     	else {
     		post.getLiked().add(user);
     	}
     
		return repo.save(post);
	}

}