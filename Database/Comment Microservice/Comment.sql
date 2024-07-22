CREATE TABLE `comments` (
  `comment_id` int NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `postid` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `user_username` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_idd` int DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `user_image` varchar(255) DEFAULT NULL,
  `user_usernamee` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`comment_id`)
)
