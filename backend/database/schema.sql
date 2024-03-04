DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS announcement;
DROP TABLE IF EXISTS status_announcement;
DROP TABLE IF EXISTS status_validation;

CREATE TABLE status_announcement (
  id INT PRIMARY KEY AUTO_INCREMENT,
  status VARCHAR(80) NOT NULL
);
CREATE TABLE status_validation (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  status VARCHAR(80) NOT NULL
);
CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nickname VARCHAR(50) NOT NULL,
  email VARCHAR(80) NOT NULL,
  hash_password VARCHAR(255) NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT 0
  
)ENGINE=InnoDB;
CREATE TABLE announcement (
  id INT PRIMARY KEY AUTO_INCREMENT,
  image_pet VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  city VARCHAR(80) NOT NULL,
  phone_number VARCHAR(10) NOT NULL,
  status_id INT NOT NULL,
  CONSTRAINT fk_status_announcement FOREIGN KEY (status_id) REFERENCES status_announcement(id),
  validation_id INT NOT NULL,
  CONSTRAINT fk_status_validation FOREIGN KEY (validation_id) REFERENCES status_validation(id),
  user_id INT NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES user(id)
) ENGINE = InnoDB;

INSERT INTO status_announcement (status) VALUES
  ('Trouvé'),
  ('Perdu');

INSERT INTO status_validation (status) VALUES
  ('En attente'),
  ('Validé'),
  ('Refusé');
INSERT INTO user (nickname, email, hash_password, is_admin) VALUES
  ('Admin','gg@gg.com','$argon2id$v=19$m=65536,t=3,p=4$dMC07QHG7Mzx8jcwqQZQ9Q$kPiN5dwKq/0U6UZxv++1IwjtTeMKzvfFInikGGsZiIE',1),
  ('User','dd@dd.com','$argon2id$v=19$m=65536,t=3,p=4$0j2U+v3obe6PllPs1rZhFg$F6q4SOPEM4WCe6ZA/12lytl6p6/Mn7oSYJQZCRDstFA',0);
INSERT INTO announcement (image_pet, description, city, phone_number, status_id, validation_id, user_id) VALUES
    ( 
  'dogdog.jpg',
          ' J ai perdu mon chien, il est de couleur marron et il est très gentil. Il s appelle Fino, Si vous le trouvez, merci de me contacter.',
          'Paris',
          '0123456789',
          1,
          1,
          1
          ),
          ( 
          'dogdog.jpg',
          '   J ai perdu mon chien, il est de couleur marron et il est très gentil. Il s appelle GIGI, Si vous le trouvez, merci de me contacter.',
          'Vienne',
          '0123456789',
          2,
          1,
          2
          ),
          (
          'dogdog.jpg',
          ' AAAA AAAAAAAAA AAAAAAAAAAAAAA AAAAAAAAAAA AAAAAAAA AAAAAAAAAAAAAAAA AAAAAAAAAAaaa aaaaaaaaaaaa aaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaa aaaa aaaaaaaa aaa',
          'Paris',
          '0123456789',
          2,
          2,
          2
          ),
          (
         'dogdog.jpg',
          '    J ai perdu mon chien, il est de couleur marron et il est très gentil. Il s appelle Fino, Si vous le trouvez, merci de me contacter.',
          'Vienne',
          '0123456789',
          1,
          2,
          1);
