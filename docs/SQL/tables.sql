CREATE TABLE "usuarios"
(
    "id_usuario" SERIAL NOT NULL,
    "nombre_usuario" varchar(50) NOT NULL,
    "correo" text NOT NULL,
    "contrasena" text NOT NULL

);

CREATE UNIQUE INDEX "PK_usuarios" ON "usuarios"
(
 "id_usuario"
);

-- ************************************** "nota"

CREATE TABLE "nota"
(
    "id_nota" SERIAL NOT NULL,
    "titulo" varchar(50) NOT NULL,
    "contenido" text NOT NULL,
    "lista" boolean NOT NULL,
    "id_usuario" int NOT NULL,
    CONSTRAINT "FK_28" FOREIGN KEY ( "id_usuario" ) REFERENCES "usuarios" ( "id_usuario" )
);

CREATE UNIQUE INDEX "PK_nota" ON "nota"
(
 "id_nota"
);

CREATE INDEX "fkIdx_28" ON "nota"
(
 "id_usuario"
);

-- ************************************** "etiquetas"

CREATE TABLE "etiquetas"
(
    "id_etiqueta" SERIAL NOT NULL,
    "nombre" text NOT NULL,
    "color" varchar(7) NOT NULL

);

CREATE UNIQUE INDEX "PK_etiquetas" ON "etiquetas"
(
 "id_etiqueta"
);

-- ************************************** "notas_etiquetas"

CREATE TABLE "notas_etiquetas"
(
    "fecha_creacion" timestamp NOT NULL,
    "id_nota" int NOT NULL,
    "id_etiqueta" int NOT NULL,
    CONSTRAINT "FK_16" FOREIGN KEY ( "id_nota" ) REFERENCES "nota" ( "id_nota" ),
    CONSTRAINT "FK_19" FOREIGN KEY ( "id_etiqueta" ) REFERENCES "etiquetas" ( "id_etiqueta" )
);

CREATE INDEX "fkIdx_16" ON "notas_etiquetas"
(
 "id_nota"
);

CREATE INDEX "fkIdx_19" ON "notas_etiquetas"
(
 "id_etiqueta"
);










