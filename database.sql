CREATE TABLE IF NOT EXISTS `Work` (
  `id_work` int(10) UNSIGNED AUTO_INCREMENT NOT NULL,
  `title_work` varchar(1000) DEFAULT NULL,
  `description_work` varchar(1000) DEFAULT NULL,
  `date` varchar(1000) DEFAULT NULL,
  `file_url` varchar(500) DEFAULT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Comment` (
  `id_comment` int(10) UNSIGNED  AUTO_INCREMENT NOT NULL,
  `email_user` varchar(500) DEFAULT NULL,
  `username` varchar(500) DEFAULT NULL,
  `title_comment` varchar(500) DEFAULT NULL,
  `content_comment` varchar(1000) DEFAULT NULL,
  `etoile` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
)ENGINE=InnoDB;