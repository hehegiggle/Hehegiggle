package com.postmicroservice;

import org.junit.jupiter.api.Test;

import com.postmicroservice.dto.AddCommentRequest;
import com.postmicroservice.dto.CommentDto;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class AddCommentRequestTest {

    @Test
    public void testNoArgsConstructor() {
        AddCommentRequest addCommentRequest = new AddCommentRequest();
        assertNull(addCommentRequest.getComment());
        assertNull(addCommentRequest.getPostId());
    }

    @Test
    public void testAllArgsConstructor() {
        CommentDto commentDto = new CommentDto();
        AddCommentRequest addCommentRequest = new AddCommentRequest(commentDto, "123");
        
        assertEquals(commentDto, addCommentRequest.getComment());
        assertEquals("123", addCommentRequest.getPostId());
    }

    @Test
    public void testSettersAndGetters() {
        AddCommentRequest addCommentRequest = new AddCommentRequest();
        CommentDto commentDto = new CommentDto();

        addCommentRequest.setComment(commentDto);
        addCommentRequest.setPostId("456");

        assertEquals(commentDto, addCommentRequest.getComment());
        assertEquals("456", addCommentRequest.getPostId());
    }
}

