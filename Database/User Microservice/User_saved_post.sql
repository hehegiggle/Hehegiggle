CREATE TABLE `user_saved_posts` (
  `user_id` int NOT NULL,
  `post_id` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`,`post_id`),
  KEY `FKfjboec06sljv15wcql71mpt69` (`post_id`),
  CONSTRAINT `FKfjboec06sljv15wcql71mpt69` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `FKpybk3r1op0bkirt44hwnjisx0` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) 
