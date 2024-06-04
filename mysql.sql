CREATE DATABASE push_notification;

USE push_notification;

CREATE TABLE tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  token VARCHAR(255) NOT NULL
);
