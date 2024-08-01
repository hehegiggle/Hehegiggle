package com.axis.reelservice;

import com.axis.reelservice.entity.Reel;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class ReelTest {

    @Test
    public void testNoArgsConstructor() {
        Reel reel = new Reel();
        assertNotNull(reel);
        assertNull(reel.getId());
        assertNull(reel.getTitle());
        assertNull(reel.getVideo());
        assertNull(reel.getUserId());
    }

    @Test
    public void testAllArgsConstructor() {
        Reel reel = new Reel(1, "Sample Title", "sample_video_url", 100);
        assertNotNull(reel);
        assertEquals(1, reel.getId());
        assertEquals("Sample Title", reel.getTitle());
        assertEquals("sample_video_url", reel.getVideo());
        assertEquals(100, reel.getUserId());
    }

    @Test
    public void testSettersAndGetters() {
        Reel reel = new Reel();
        reel.setId(1);
        reel.setTitle("Sample Title");
        reel.setVideo("sample_video_url");
        reel.setUserId(100);

        assertEquals(1, reel.getId());
        assertEquals("Sample Title", reel.getTitle());
        assertEquals("sample_video_url", reel.getVideo());
        assertEquals(100, reel.getUserId());
    }

    @Test
    public void testEqualsAndHashCode() {
        Reel reel1 = new Reel(1, "Sample Title", "sample_video_url", 100);
        Reel reel2 = new Reel(1, "Sample Title", "sample_video_url", 100);

        assertEquals(reel1, reel2);
        assertEquals(reel1.hashCode(), reel2.hashCode());
    }

    @Test
    public void testToString() {
        Reel reel = new Reel(1, "Sample Title", "sample_video_url", 100);
        String expectedToString = "Reel(id=1, title=Sample Title, video=sample_video_url, userId=100)";

        assertEquals(expectedToString, reel.toString());
    }

    @Test
    public void testSetNullValues() {
        Reel reel = new Reel();
        reel.setId(null);
        reel.setTitle(null);
        reel.setVideo(null);
        reel.setUserId(null);

        assertNull(reel.getId());
        assertNull(reel.getTitle());
        assertNull(reel.getVideo());
        assertNull(reel.getUserId());
    }

    @Test
    public void testEmptyStrings() {
        Reel reel = new Reel();
        reel.setTitle("");
        reel.setVideo("");

        assertEquals("", reel.getTitle());
        assertEquals("", reel.getVideo());
    }

    @Test
    public void testLongStrings() {
        String longTitle = "a".repeat(1000);
        String longVideo = "a".repeat(1000);

        Reel reel = new Reel();
        reel.setTitle(longTitle);
        reel.setVideo(longVideo);

        assertEquals(longTitle, reel.getTitle());
        assertEquals(longVideo, reel.getVideo());
    }

    @Test
    public void testDifferentObjectsNotEqual() {
        Reel reel1 = new Reel(1, "Sample Title", "sample_video_url", 100);
        String differentObject = "I am not a Reel";

        assertNotEquals(reel1, differentObject);
    }

    @Test
    public void testSameObjectEqual() {
        Reel reel = new Reel(1, "Sample Title", "sample_video_url", 100);

        assertEquals(reel, reel);
    }

    @Test
    public void testDifferentReelsNotEqual() {
        Reel reel1 = new Reel(1, "Sample Title", "sample_video_url", 100);
        Reel reel2 = new Reel(2, "Different Title", "different_video_url", 101);

        assertNotEquals(reel1, reel2);
    }
}

