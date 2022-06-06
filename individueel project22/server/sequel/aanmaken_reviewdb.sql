Create DATABASE if not exists il_reviews;

use il_reviews;
DROP TABLE IF EXISTS reviews;

CREATE TABLE IF NOT EXISTS reviews (
  id INT NOT NULL AUTO_INCREMENT,
  fname VARCHAR(30)NOT NULL,
  name VARCHAR(40) NOT NULL,
  comment VARCHAR(200),
  score TINYINT NOT NULL,
  date DATE NOT NULL,
  PRIMARY KEY (`id`)
);
INSERT INTO reviews (fname, name, comment, score, date) VALUES 
	("Henk", "Steen", "Trekt oep niks kmoet nie eejn", 1, "2015-01-15"),
    ("Charel", "Ferme", "Leuk concept", 4, "2019-11-30"),
    ("Bart", "Peeters", "Want de kat zat op de krant", 4, "2021-10-1"),
    ("Bart", "Buls", "Een ferm kat kank wel apprecieren aan de kanten van Gent", 3, "2022-02-02")
    ;