CREATE TABLE IF NOT EXISTS `Work` (
  `id_work` int(10) UNSIGNED AUTO_INCREMENT NOT NULL,
  `title_work` varchar(1000) DEFAULT NULL,
  `description_work` varchar(1000) DEFAULT NULL,
  `date` varchar(1000) DEFAULT NULL,
  `type` varchar(100) NOT NULL,
  `file_url` varchar(500) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `status` varchar(100) DEFAULT 'en cours',
  `category` varchar(500) DEFAULT NULL,
  `tags` varchar(1000) DEFAULT NULL,
  `progress` int DEFAULT 0 CHECK (`progress` BETWEEN 0 AND 100),
  `client_name` varchar(500) DEFAULT NULL,
  `team_members` text DEFAULT NULL,
  `visibility` varchar(50) DEFAULT 'public',
  `technologies_used` text DEFAULT NULL,
  `rating` int DEFAULT NULL CHECK (`rating` BETWEEN 1 AND 5),
  PRIMARY KEY (`id_work`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Comment` (
  `id_comment` int(10) UNSIGNED AUTO_INCREMENT NOT NULL,
  `id_work` int(10) UNSIGNED NOT NULL,
  `email_user` varchar(500) DEFAULT NULL,
  `username` varchar(500) DEFAULT NULL,
  `title_comment` varchar(500) DEFAULT NULL,
  `content_comment` varchar(1000) DEFAULT NULL,
  `etoile` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_comment`),
  FOREIGN KEY (`id_work`) REFERENCES `Work`(`id_work`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;
