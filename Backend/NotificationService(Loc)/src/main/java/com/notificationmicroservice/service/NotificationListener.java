package com.notificationmicroservice.service;

import com.notificationmicroservice.entity.RealTimeNotification;
import com.notificationmicroservice.event.NotificationEvent;
import com.notificationmicroservice.repository.RealTimeNotificationRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationListener {

    @Autowired
    private RealTimeNotificationRepository realTimeNotificationRepo;

    @RabbitListener(queues = "${notification.queue}")
    public void receiveMessage(NotificationEvent notificationEvent) {
        System.out.println("Received notification: " + notificationEvent);

        // Save the notification to MongoDB
        RealTimeNotification realTimeNotification = new RealTimeNotification(
            notificationEvent.getNotificationId(),
            notificationEvent.getType(),
            notificationEvent.getUserId(),
            notificationEvent.getPostId(),
            notificationEvent.getCommentId(),
            notificationEvent.getSenderId(),
            notificationEvent.getMessage(),
            false,
            notificationEvent.getNotificationAt()
        );

        realTimeNotificationRepo.save(realTimeNotification);
    }
}
