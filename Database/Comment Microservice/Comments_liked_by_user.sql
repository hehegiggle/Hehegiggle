CREATE TABLE `comments_liked_by_users` (
  `comments_comment_id` int NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `userimage` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  KEY `FK2r9p2rc5x46alsu7u6g3fi8cg` (`comments_comment_id`),
  CONSTRAINT `FK2r9p2rc5x46alsu7u6g3fi8cg` FOREIGN KEY (`comments_comment_id`) REFERENCES `comments` (`comment_id`)
)
