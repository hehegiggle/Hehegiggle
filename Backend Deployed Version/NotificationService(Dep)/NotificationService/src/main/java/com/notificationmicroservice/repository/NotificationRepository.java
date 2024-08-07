package com.notificationmicroservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.notificationmicroservice.entity.Notification;

public interface NotificationRepository extends MongoRepository<Notification, String> {
}
