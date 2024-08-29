package com.notificationmicroservice.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.amqp.core.Exchange;
import org.springframework.amqp.core.ExchangeBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RabbitMQConfig {

	@Bean
	public Jackson2JsonMessageConverter jsonMessageConverter() {
		return new Jackson2JsonMessageConverter();
	}

	@Bean
	public RabbitTemplate rabbitTemplate(final ConnectionFactory connectionFactory) {
		final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
		rabbitTemplate.setMessageConverter(jsonMessageConverter());
		return rabbitTemplate;
	}

	@Bean
	public Queue notificationQueue() {
		return new Queue("notification-queue", true);
	}

	@Bean
	public Exchange notificationExchange() {
		return ExchangeBuilder.directExchange("notification-exchange").durable(true).build();
	}

	@Bean
	public Binding binding(Queue notificationQueue, Exchange notificationExchange) {
		return BindingBuilder.bind(notificationQueue).to(notificationExchange).with("notification-routing-key")
				.noargs();
	}

	@Bean
	@LoadBalanced
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}
}
