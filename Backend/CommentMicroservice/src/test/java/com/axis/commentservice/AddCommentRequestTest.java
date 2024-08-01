package com.axis.commentservice;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.axis.commentservice.dto.AddCommentRequest;
import com.axis.commentservice.dto.CommentDto;

public class AddCommentRequestTest {

    @Test
    public void testDefaultConstructor() {
        AddCommentRequest request = new AddCommentRequest();
        assertNull(request.getComment());
        assertNull(request.getPostId());
    }

    @Test
    public void testAllArgsConstructor() {
        CommentDto comment = new CommentDto();
        String postId = "postId123";
        AddCommentRequest request = new AddCommentRequest(comment, postId);

        assertEquals(comment, request.getComment());
        assertEquals(postId, request.getPostId());
    }

    @Test
    public void testGettersAndSetters() {
        AddCommentRequest request = new AddCommentRequest();
        CommentDto comment = new CommentDto();
        String postId = "postId123";

        request.setComment(comment);
        request.setPostId(postId);

        assertEquals(comment, request.getComment());
        assertEquals(postId, request.getPostId());
    }

    @Test
    public void testToString() {
        CommentDto comment = new CommentDto();
        String postId = "postId123";
        AddCommentRequest request = new AddCommentRequest(comment, postId);

        String expectedString = "AddCommentRequest(comment=" + comment + ", postId=" + postId + ")";
        assertEquals(expectedString, request.toString());
    }
}

