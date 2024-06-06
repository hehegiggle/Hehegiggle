package com.axis.team09.IST.HeHe.user.contoller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.axis.team09.IST.HeHe.user.entity.Message;
import com.axis.team09.IST.HeHe.user.entity.User;
import com.axis.team09.IST.HeHe.user.service.MessageService;
import com.axis.team09.IST.HeHe.user.service.UserServicee;



@RestController
@RequestMapping("/api/message")
@Validated
public class MessageController {

    @Autowired
    private MessageService ser;
    
    @Autowired
	private  UserServicee userservice;
   
   
    @PostMapping("/chat/{chatid}")
    public Message createMessage(@RequestHeader("Authorization") String jwt,@RequestBody Message message,
    		@PathVariable Integer chatid) throws Exception{

    	User user=userservice.findByJwtToken(jwt);
    	Message mess=ser.createMessage(user, chatid, message);
    	
    	
    	
        return mess;
    }
    @GetMapping("/chat/{chatid}")
    public List<Message> findChatMessage(@RequestHeader("Authorization") String jwt,@PathVariable Integer chatid
    		) throws Exception{

    	User user=userservice.findByJwtToken(jwt);
    	List<Message> mess=ser.findMessage(chatid);
    	
    	
    	
        return mess;
    }
   

    
    
   
}
