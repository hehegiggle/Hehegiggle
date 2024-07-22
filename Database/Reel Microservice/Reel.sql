CREATE TABLE `reel` (
  `id` int NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `timestamp` datetime(6) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `user_image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `user_username` varchar(255) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
)
