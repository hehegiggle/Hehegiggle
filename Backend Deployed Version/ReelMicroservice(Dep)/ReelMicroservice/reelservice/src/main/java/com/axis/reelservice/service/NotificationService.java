package com.axis.reelservice.service;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.axis.reelservice.event.NotificationEvent;

@Service
public class NotificationService {

	@Autowired
	private RabbitTemplate rabbitTemplate;

	@Value("${notification.exchange}")
	private String notificationExchange;

	@Value("${notification.routingkey}")
	private String notificationRoutingKey;

	public void sendNotification(NotificationEvent notificationEvent) {
		rabbitTemplate.convertAndSend(notificationExchange, notificationRoutingKey, notificationEvent);
	}
}
