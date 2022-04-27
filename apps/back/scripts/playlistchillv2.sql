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

CREATE TABLE "profil"
(
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	classical INT DEFAULT 0,
	country INT DEFAULT 0,
    electronicDanceMusic INT DEFAULT 0,
    hipHop INT DEFAULT 0,
    indieRock INT DEFAULT 0,
    jazz INT DEFAULT 0,
    kPop INT DEFAULT 0,
    metal INT DEFAULT 0,
    oldies INT DEFAULT 0,
    pop INT DEFAULT 0,
    rap INT DEFAULT 0,
    rhythmBlues INT DEFAULT 0,
    rock INT DEFAULT 0,
    techno INT DEFAULT 0,
	id_person INT REFERENCES person(id)
);

CREATE TABLE "kind"
(
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	classical INT DEFAULT 0,
	country INT DEFAULT 0,
    electronicDanceMusic INT DEFAULT 0,
    hipHop INT DEFAULT 0,
    indieRock INT DEFAULT 0,
    jazz INT DEFAULT 0,
    kPop INT DEFAULT 0,
    metal INT DEFAULT 0,
    oldies INT DEFAULT 0,
    pop INT DEFAULT 0,
    rap INT DEFAULT 0,
    rhythmBlues INT DEFAULT 0,
    rock INT DEFAULT 0,
    techno INT DEFAULT 0,
	id_track INT REFERENCES track(id)
);
