CREATE TABLE `user_following` (
  `user_id` int NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `user_image` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  KEY `FKiauj02dmro0awb3hetthnrlye` (`user_id`),
  CONSTRAINT `FKiauj02dmro0awb3hetthnrlye` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
)
