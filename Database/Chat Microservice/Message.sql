CREATE TABLE `message` (
  `message_id` int NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `timestamp` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `followers` varbinary(255) DEFAULT NULL,
  `followings` varbinary(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `chat_id` int DEFAULT NULL,
  PRIMARY KEY (`message_id`),
  KEY `FKmejd0ykokrbuekwwgd5a5xt8a` (`chat_id`),
  CONSTRAINT `FKmejd0ykokrbuekwwgd5a5xt8a` FOREIGN KEY (`chat_id`) REFERENCES `chat` (`id`)
)