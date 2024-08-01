package com.usermicroservice;
import com.usermicroservice.config.*;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class SecurityContestTest {

    @Test
    public void testJWT_KEY() {
        assertEquals("zjdbfagvqruuyzbhgdfpeoajnebxiueban", SecurityContest.JWT_KEY);
    }

    @Test
    public void testHEADER() {
        assertEquals("Authorization", SecurityContest.HEADER);
    }
}

