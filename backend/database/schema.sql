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
  ('Admin','admin@email.com','$argon2id$v=19$m=65536,t=3,p=4$d77hMFt8mtrvMeBNfTN12w$vNuWpX4txuAiM5RH/QGo9DR48zu9xCyU+hUJsgaEE8g',1),
  ('Jean','jean@email.com','$argon2id$v=19$m=65536,t=3,p=4$RKlzJY/Q1/xGbp4ffuX7uw$orZYIBR89XeHXTvEDMwZZno7Yxd5Awnjs1qsdGdZoqM',0),
  ('Alice', 'alice@email.com', '$argon2id$v=19$m=65536,t=3,p=4$RKlzJY/Q1/xGbp4ffuX7uw$orZYIBR89XeHXTvEDMwZZno7Yxd5Awnjs1qsdGdZoqM', 0),
('Bob', 'bob@email.com', '$argon2id$v=19$m=65536,t=3,p=4$RKlzJY/Q1/xGbp4ffuX7uw$orZYIBR89XeHXTvEDMwZZno7Yxd5Awnjs1qsdGdZoqM', 0),
('Charlie', 'charlie@email.com', '$argon2id$v=19$m=65536,t=3,p=4$RKlzJY/Q1/xGbp4ffuX7uw$orZYIBR89XeHXTvEDMwZZno7Yxd5Awnjs1qsdGdZoqM', 0),
('David', 'david@email.com', '$argon2id$v=19$m=65536,t=3,p=4$RKlzJY/Q1/xGbp4ffuX7uw$orZYIBR89XeHXTvEDMwZZno7Yxd5Awnjs1qsdGdZoqM', 0),
('Emma', 'emma@email.com', '$argon2id$v=19$m=65536,t=3,p=4$RKlzJY/Q1/xGbp4ffuX7uw$orZYIBR89XeHXTvEDMwZZno7Yxd5Awnjs1qsdGdZoqM', 0),
('Frank', 'frank@email.com', '$argon2id$v=19$m=65536,t=3,p=4$RKlzJY/Q1/xGbp4ffuX7uw$orZYIBR89XeHXTvEDMwZZno7Yxd5Awnjs1qsdGdZoqM', 0),
('Grace', 'grace@email.com', '$argon2id$v=19$m=65536,t=3,p=4$RKlzJY/Q1/xGbp4ffuX7uw$orZYIBR89XeHXTvEDMwZZno7Yxd5Awnjs1qsdGdZoqM', 0),
('Henry', 'henry@email.com', '$argon2id$v=19$m=65536,t=3,p=4$RKlzJY/Q1/xGbp4ffuX7uw$orZYIBR89XeHXTvEDMwZZno7Yxd5Awnjs1qsdGdZoqM', 0);
INSERT INTO announcement (image_pet, description, city, phone_number, status_id, validation_id, user_id) VALUES
(
'dog1.jpg',
'Un petit chien joueur et affectueux, répondant au nom de Fino. Aperçu pour la dernière fois en train de courir joyeusement. Veuillez me contacter si vous le retrouvez.',
'Paris',
'0123456789',
1,
2,
5
),

(
'dog2.jpg',
'Un grand chien de couleur marron foncé avec une queue touffue. Porte un collier rouge. Répond au nom de Max. Si vous l apercevez, veuillez me contacter rapidement.',
'Marseille',
'0234567891',
2,
2,
3
),

(
'dog3.jpg',
'Un chien tacheté de noir et blanc, très énergique et joueur. Il répond au nom de Lucky. Disparu près du parc central. Merci de m aider à le retrouver.',
'Lyon',
'0345678912',
1,
2,
8
),

(
'dog4.jpg',
'Un petit chien blanc avec des oreilles tombantes. Porte un collier bleu. Répond au nom de Daisy. Dernièrement vu près de la rivière. Aidez-moi à le ramener à la maison.',
'Toulouse',
'0456789123',
2,
2,
4
),

(
'dog5.jpg',
'Un chiot noir avec une tache blanche sur le museau. Très sociable et aimable. Si vous l apercevez, veuillez m appeler immédiatement.',
'Nice',
'0567891234',
1,
2,
6
),

(
'dog6.jpg',
'Un chien de taille moyenne avec des poils longs et bruns. Très joueur et sociable. Il répond au nom de Charlie. Dernièrement vu près du parc à chiens.',
'Strasbourg',
'0678912345',
2,
2,
2
),

(
'dog7.jpg',
'Un petit chien noir avec une queue touffue. Très timide mais amical. Si vous le voyez, veuillez me contacter. Récompense offerte.',
'Bordeaux',
'0789123456',
1,
2,
7
),

(
'dog5.jpg',
'Un grand chien de race husky blanc et gris. Porte un harnais rouge. Très joueur et dynamique. Si vous le retrouvez, veuillez me contacter dès que possible.',
'Nantes',
'0891234567',
2,
2,
2
),

(
'dog8.jpg',
'Un petit chien brun avec une queue courte. Très espiègle et aime les câlins. Répond au nom de Bella. Merci de m aider à la retrouver.',
'Montpellier',
'0912345678',
1,
1,
4
),

(
'dog6.jpg',
'Un chiot doré avec des yeux marron foncé. Très joueur et aimable. Si vous l apercevez, veuillez me contacter. Récompense offerte.',
'Rennes',
'0123456780',
2,
1,
8
);

