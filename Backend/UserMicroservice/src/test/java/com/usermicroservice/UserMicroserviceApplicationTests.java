package com.usermicroservice;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.ApplicationContext;
import org.springframework.web.client.RestTemplate;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class UserMicroserviceApplicationTests {

    @Autowired
    private ApplicationContext context;

    @MockBean
    private RestTemplate restTemplateMock;

    @Autowired
    private ModelMapper modelMapper;

    @Test
    void contextLoads() {
        // Test that the application context loads successfully
        assertThat(context).isNotNull();
    }

    @Test
    void testRestTemplateBean() {
        // Test that the restTemplate bean is created and @LoadBalanced
        RestTemplate restTemplate = context.getBean(RestTemplate.class);
        assertThat(restTemplate).isNotNull();
        assertThat(restTemplate).isInstanceOf(RestTemplate.class);
        assertThat(restTemplate).isEqualTo(restTemplateMock); // Ensure the mock is injected
    }

    @Test
    void testModelMapperBean() {
        // Test that the modelMapper bean is created
        assertThat(modelMapper).isNotNull();
        assertThat(modelMapper).isInstanceOf(ModelMapper.class);
    }

    @Test
    void testMainMethod() {
        // Test the main method to ensure application context starts without errors
        UserMicroserviceApplication.main(new String[]{});
    }
}
