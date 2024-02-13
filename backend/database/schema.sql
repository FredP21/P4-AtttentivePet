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
  ('trouvé'),
  ('perdu');

INSERT INTO status_validation (status) VALUES
  ('en attente'),
  ('validé'),
  ('refusé');
INSERT INTO user (nickname, email, hash_password, is_admin) VALUES
  ('FredP','gg@gg.com','$argon2id$v=19$m=19456,t=2,p=1$qBDcGauRdkq4t9knFtB8Kg$OTlW3jP1qdv52q9vv/Ng6KeI5OLu6WUQjkoElAhq8kI',1),
  ('FredG','dd@dd.com','$argon2id$v=19$m=19456,t=2,p=1$qBDcGauRdkq4t9knFtB8Kg$OTlW3jP1qdv52q9vv/Ng6KeI5OLu6WUQjkoElAhq8kI',0);
INSERT INTO announcement (image_pet, description, city, phone_number, status_id, validation_id, user_id) VALUES
    ( 
  'https://cdn.pixabay.com/photo/2016/11/29/09/58/dog-1868871_960_720.jpg',
          '    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, doloribus. Vero incidunt cupiditate modi! Alias cumque quo voluptatibus architecto ipsam ipsum veritatis, beatae similique quibusdam hic fugit optio, nulla nisi!
          Ut harum autem animi neque? Quis consequuntur repudiandae ex quia! Modi dolorum ullam minus! Vel facilis a natus laudantium mollitia, quo modi laborum voluptatibus, impedit ex quisquam incidunt. Veniam, debitis.',
          'Paris',
          '0123456789',
          1,
          2,
          1
          ),
          ( 
          'https://cdn.pixabay.com/photo/2016/11/29/09/58/dog-1868871_960_720.jpg',
          '    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, doloribus. Vero incidunt cupiditate modi! Alias cumque quo voluptatibus architecto ipsam ipsum veritatis, beatae similique quibusdam hic fugit optio, nulla nisi!
          Ut harum autem animi neque? Quis consequuntur repudiandae ex quia! Modi dolorum ullam minus! Vel facilis a natus laudantium mollitia, quo modi laborum voluptatibus, impedit ex quisquam incidunt. Veniam, debitis.',
          'Paris',
          '0123456789',
          2,
          1,
          2
          ),
          (
          'https://cdn.pixabay.com/photo/2016/11/29/09/58/dog-1868871_960_720.jpg',
          '    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, doloribus. Vero incidunt cupiditate modi! Alias cumque quo voluptatibus architecto ipsam ipsum veritatis, beatae similique quibusdam hic fugit optio, nulla nisi!
          Ut harum autem animi neque? Quis consequuntur repudiandae ex quia! Modi dolorum ullam minus! Vel facilis a natus laudantium mollitia, quo modi laborum voluptatibus, impedit ex quisquam incidunt. Veniam, debitis.',
          'Paris',
          '0123456789',
          2,
          2,
          2
          ),
          (
         'https://cdn.pixabay.com/photo/2016/11/29/09/58/dog-1868871_960_720.jpg',
          '    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, doloribus. Vero incidunt cupiditate modi! Alias cumque quo voluptatibus architecto ipsam ipsum veritatis, beatae similique quibusdam hic fugit optio, nulla nisi!
          Ut harum autem animi neque? Quis consequuntur repudiandae ex quia! Modi dolorum ullam minus! Vel facilis a natus laudantium mollitia, quo modi laborum voluptatibus, impedit ex quisquam incidunt. Veniam, debitis.',
          'Paris',
          '0123456789',
          1,
          2,
          1);
