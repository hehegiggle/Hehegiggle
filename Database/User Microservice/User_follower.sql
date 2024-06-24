CREATE TABLE `user_follower` (
  `user_id` int NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `user_image` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  KEY `FK31vprrcmt5cwijol72deguk3y` (`user_id`),
  CONSTRAINT `FK31vprrcmt5cwijol72deguk3y` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) 