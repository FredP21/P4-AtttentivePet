CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nickname VARCHAR(50) NOT NULL,
  email VARCHAR(80) NOT NULL,
  password TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT 0
  
);
CREATE TABLE announcement (
  id INT PRIMARY KEY AUTO_INCREMENT,
  image_pet BLOB ,
  description TEXT NOT NULL,
  city VARCHAR(80) NOT NULL,
  phone_number VARCHAR(10) NOT NULL,
  status_id INT NOT NULL,
  validation_id INT NOT NULL,
  user_id INT NOT NULL
);
CREATE TABLE status_announcement (
  id INT PRIMARY KEY AUTO_INCREMENT,
  status VARCHAR(80) NOT NULL
);
CREATE TABLE status_validation (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  status VARCHAR(80) NOT NULL
);

ALTER TABLE announcement ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user(id);
ALTER TABLE announcement ADD CONSTRAINT fk_status_id FOREIGN KEY (status_id) REFERENCES status_announcement(id);
ALTER TABLE announcement ADD CONSTRAINT fk_validation_id FOREIGN KEY (validation_id) REFERENCES status_validation(id);
