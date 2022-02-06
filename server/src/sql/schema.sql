-- NOTE: I figured we'd want this for the section on SQL
PRAGMA foreign_keys;

-- NOTE: For the SQL assignment, we could have them normalize
-- this database farther. Perhaps they can learn about SERIAL and
-- then go implement a way to change a room_name without losing
-- references by using a FOREIGN KEY into a rooms table with an 
-- int primary key.
CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	notes varchar NOT NULL,
	artist varchar,
	genre varchar,
	album varchar
);

INSERT INTO songs (id, song_title, notes)
VALUES (1, 'Ode to Joy (Dubstep Remix)', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4');

INSERT INTO songs (id, song_title, notes, artist, genre, album)
VALUES (2, 'New Age Track', 'B4 B4 D4 B4 B4 D4 G4 A4 B4 B4 D4 C4 C4 C4 B4 B4', 'The Reacts', 'DubStep', 'FrontEnd Rocks');

INSERT INTO songs (id, song_title, notes, artist, genre, album)
VALUES (3, 'Allegro', 'C3 D6 D4 B4 D6 C3 G4 A4 C3 D6 D4 C4 D6 C4 B4 B4', 'Mozart', 'Classic', 'Eine kleine Nachtmusik');

INSERT INTO songs (id, song_title, notes, artist, genre, album)
VALUES (4, 'Fur Elise', 'C7 D7 A4 B4 C7 D7 A4 B4 C7 D7 A4 B4 C7 D7 A4 B4', 'Beeethoven', 'Classic', 'Fur Elise');

INSERT INTO songs (id, song_title, notes, artist, genre, album)
VALUES (5, 'O mio babbino caro', 'B4 C5 D4 B4 C5 D4 G4 A4 B4 B4 C5 D4 C4 C4 B4 B4', 'Puccini', 'Classic', 'The Most Relaxiing Feel');