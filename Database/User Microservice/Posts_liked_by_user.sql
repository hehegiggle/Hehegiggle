CREATE TABLE `post_liked_by_users` (
  `post_id` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `user_image` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  KEY `FKacet8j61anp5y4v9p341jpsyf` (`post_id`),
  CONSTRAINT `FKacet8j61anp5y4v9p341jpsyf` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) 