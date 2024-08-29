package com.axis.commentservice;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableDiscoveryClient
public class CommentMicroserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CommentMicroserviceApplication.class, args);
	}
	@Bean
	 @LoadBalanced
	    public RestTemplate restTemplate() {
	        return new RestTemplate();
	    }
	
	@Bean
	public ModelMapper mapper() {
	    return new ModelMapper();

}
}
