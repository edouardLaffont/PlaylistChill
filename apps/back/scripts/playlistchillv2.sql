CREATE TABLE "track"
(
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	title VARCHAR(50) NOT NULL,
    artist VARCHAR(50) NOT NULL,
	link VARCHAR(255) NOT NULL

);

CREATE TABLE "person"
(
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	username VARCHAR(50) NOT NULL
);

CREATE TABLE "like"
(
	id_person INT REFERENCES person(id),
	id_track INT REFERENCES track(id),
	PRIMARY KEY (id_person, id_track)
);

CREATE TABLE "playlist"
(
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL,
	id_person INT REFERENCES person(id)
);

CREATE TABLE "associate_playlist_track"
(
	id_playlist INT REFERENCES playlist(id),
	id_track INT REFERENCES track(id),
	PRIMARY KEY (id_playlist, id_track)
);