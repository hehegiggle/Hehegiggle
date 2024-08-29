package com.notificationmicroservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.notificationmicroservice.entity.RealTimeNotification;

@Repository
public interface RealTimeNotificationRepository extends MongoRepository<RealTimeNotification, String> {

	// Custom query to find notifications by userId
	List<RealTimeNotification> findByUserId(String id);

}