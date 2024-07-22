CREATE TABLE `posts` (
  `id` varchar(255) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `user_image` varchar(255) DEFAULT NULL,
  `user_username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) 
