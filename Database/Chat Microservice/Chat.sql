CREATE TABLE `chat` (
  `id` int NOT NULL,
  `chat_image` varchar(255) DEFAULT NULL,
  `chat_name` varchar(255) DEFAULT NULL,
  `timestamp` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) 