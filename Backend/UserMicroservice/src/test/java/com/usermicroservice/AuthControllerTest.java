//package com.usermicroservice;
//
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.MockitoAnnotations;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.springframework.test.web.servlet.MockMvc;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
//import com.usermicroservice.config.JwtGenratorFilter;
//import com.usermicroservice.controller.AuthController;
//import com.usermicroservice.repository.UserRepository;
//import com.usermicroservice.service.UserUserDetailService;
//
//@WebMvcTest(AuthController.class)
//public class AuthControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private UserRepository userRepository;
//
//    @MockBean
//    private PasswordEncoder passwordEncoder;
//
//    @MockBean
//    private JwtGenratorFilter jwtGenratorFilter;
//
//    @MockBean
//    private UserUserDetailService customUserDetails;
//
//    @InjectMocks
//    private AuthController authController;
//
//    private ObjectMapper objectMapper;
//
//    @BeforeEach
//    public void setup() {
//        MockitoAnnotations.openMocks(this);
//
//        objectMapper = new ObjectMapper();
//        objectMapper.registerModule(new JavaTimeModule());
//    }
//
//    @Test
//    @WithMockUser
//    public void testGet() throws Exception {
//        mockMvc.perform(post("/get")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content("Sample Request"))
//                .andExpect(status().isOk());
//    }
//}
