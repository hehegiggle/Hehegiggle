package com.usermicroservice;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.usermicroservice.config.AppConfig;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class AppConfigTest {

    @InjectMocks
    private AppConfig appConfig;
    
    @Autowired
    private SecurityFilterChain securityFilterChain;

    private HttpSecurity httpSecurity;

    @BeforeEach
    void setUp() throws Exception {
        httpSecurity = mock(HttpSecurity.class);
        
   
    }

    @Test
    void testSecurityFilterChain() {
        // Assert that securityFilterChain is not null
        assertThat(securityFilterChain).isNotNull();
    }


    @Test
    void testPasswordEncoder() {
        PasswordEncoder passwordEncoder = appConfig.passwordEncoder();

            assertThat(passwordEncoder)
                    .isNotNull()
                    .isInstanceOf(BCryptPasswordEncoder.class);
        }
    }

