CREATE TABLE `chat_deleted_by_users` (
  `chat_id` int NOT NULL,
  `deleted_by_users` int DEFAULT NULL,
  KEY `FKe3gwcgjj9ur7uexrlaaxvdnwo` (`chat_id`),
  CONSTRAINT `FKe3gwcgjj9ur7uexrlaaxvdnwo` FOREIGN KEY (`chat_id`) REFERENCES `chat` (`id`)
) 