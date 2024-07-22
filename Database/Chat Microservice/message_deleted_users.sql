CREATE TABLE `message_deleted_users` (
  `message_message_id` int NOT NULL,
  `deleted_users` int DEFAULT NULL,
  KEY `FK873ymwljt21gnqs09c4t7stoq` (`message_message_id`),
  CONSTRAINT `FK873ymwljt21gnqs09c4t7stoq` FOREIGN KEY (`message_message_id`) REFERENCES `message` (`message_id`)
) 