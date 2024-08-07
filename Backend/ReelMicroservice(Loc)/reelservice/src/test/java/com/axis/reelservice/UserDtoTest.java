package com.axis.reelservice;

import com.axis.reelservice.dto.UserDTO;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class UserDtoTest {

    @Test
    public void testNoArgsConstructor() {
        UserDTO user = new UserDTO();
        assertNotNull(user);
        assertNull(user.getId());
        assertNull(user.getName());
        assertNull(user.getEmail());
    }

    @Test
    public void testAllArgsConstructor() {
        UserDTO user = new UserDTO(1, "John", "john.doe@example.com");
        assertNotNull(user);
        assertEquals(1, user.getId());
        assertEquals("John", user.getName());
        assertEquals("john.doe@example.com", user.getEmail());
    }

    @Test
    public void testSettersAndGetters() {
        UserDTO user = new UserDTO();
        user.setId(1);
        user.setName("John");
        user.setEmail("john.doe@example.com");

        assertEquals(1, user.getId());
        assertEquals("John", user.getName());
        assertEquals("john.doe@example.com", user.getEmail());
    }

    @Test
    public void testEqualsAndHashCode() {
        UserDTO user1 = new UserDTO(1, "John", "john.doe@example.com");
        UserDTO user2 = new UserDTO(1, "John", "john.doe@example.com");

        assertEquals(user1, user2);
        assertEquals(user1.hashCode(), user2.hashCode());
    }

    @Test
    public void testToString() {
        UserDTO user = new UserDTO(1, "John", "john.doe@example.com");
        String expectedToString = "UserDTO(id=1, firstName=John, lastName=Doe, email=john.doe@example.com)";

        assertEquals(expectedToString, user.toString());
    }

    @Test
    public void testSetNullValues() {
        UserDTO user = new UserDTO();
        user.setId(null);
        user.setName(null);
        user.setEmail(null);

        assertNull(user.getId());
        assertNull(user.getName());
        assertNull(user.getEmail());
    }

    @Test
    public void testEmptyStrings() {
        UserDTO user = new UserDTO();
        user.setName("");
        user.setEmail("");

        assertEquals("", user.getName());
        assertEquals("", user.getEmail());
    }

    @Test
    public void testLongStrings() {
        String longName = "a".repeat(1000);
        String longEmail = "a".repeat(1000) + "@example.com";

        UserDTO user = new UserDTO();
        user.setName(longName);
        user.setEmail(longEmail);

        assertEquals(longName, user.getName());
        assertEquals(longEmail, user.getEmail());
    }

    @Test
    public void testEqualsAndHashCodeWithDifferentObjects() {
        UserDTO user1 = new UserDTO(1, "John", "john.doe@example.com");
        UserDTO user2 = new UserDTO(2, "Jane", "jane.doe@example.com");

        assertNotEquals(user1, user2);
        assertNotEquals(user1.hashCode(), user2.hashCode());
    }

    @Test
    public void testEqualsAndHashCodeWithNullFields() {
        UserDTO user1 = new UserDTO();
        UserDTO user2 = new UserDTO();

        assertEquals(user1, user2);
        assertEquals(user1.hashCode(), user2.hashCode());

        user1.setId(1);
        assertNotEquals(user1, user2);
        assertNotEquals(user1.hashCode(), user2.hashCode());
    }

    @Test
    public void testEqualsWithDifferentTypes() {
        UserDTO user = new UserDTO(1, "John", "john.doe@example.com");
        String differentObject = "I am not a UserDTO";

        assertNotEquals(user, differentObject);
    }

    @Test
    public void testSameObjectEquality() {
        UserDTO user = new UserDTO(1, "John", "john.doe@example.com");

        assertEquals(user, user);
    }

    @Test
    public void testEqualityWithNull() {
        UserDTO user = new UserDTO(1, "John", "john.doe@example.com");

        assertNotEquals(user, null);
    }

    @Test
    public void testSetterWithNullValues() {
        UserDTO user = new UserDTO();
        user.setName(null);
        user.setEmail(null);

        assertNull(user.getName());
        assertNull(user.getEmail());
    }

    @Test
    public void testDifferentIdEquality() {
        UserDTO user1 = new UserDTO(1, "John", "john.doe@example.com");
        UserDTO user2 = new UserDTO(2, "John", "john.doe@example.com");

        assertNotEquals(user1, user2);
    }

    @Test
    public void testDifferentFirstNameEquality() {
        UserDTO user1 = new UserDTO(1, "John", "john.doe@example.com");
        UserDTO user2 = new UserDTO(1, "Jane", "john.doe@example.com");

        assertNotEquals(user1, user2);
    }

    @Test
    public void testDifferentLastNameEquality() {
        UserDTO user1 = new UserDTO(1, "John", "john.doe@example.com");
        UserDTO user2 = new UserDTO(1, "John",  "john.doe@example.com");

        assertNotEquals(user1, user2);
    }

    @Test
    public void testDifferentEmailEquality() {
        UserDTO user1 = new UserDTO(1, "John", "john.doe@example.com");
        UserDTO user2 = new UserDTO(1, "John", "jane.doe@example.com");

        assertNotEquals(user1, user2);
    }
}

