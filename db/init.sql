DROP TABLE IF EXISTS mensajes;

CREATE TABLE mensajes(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mensaje TEXT NOT NULL
);

INSERT INTO mensajes (mensaje) VALUES ('Hola')
