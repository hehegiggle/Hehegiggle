CREATE TABLE `chat_users` (
  `chat_id` int NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `followers` varbinary(255) DEFAULT NULL,
  `followings` varbinary(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `id` int DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  KEY `FKglok2i2m8cbulbt5xxmfqixw3` (`chat_id`),
  CONSTRAINT `FKglok2i2m8cbulbt5xxmfqixw3` FOREIGN KEY (`chat_id`) REFERENCES `chat` (`id`)
)
