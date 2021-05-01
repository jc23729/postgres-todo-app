CREATE DATABASE todo_database;

--\c into todo_database

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

--Steps in postgress
-- 1 command line psql -U postgres
-- 2 postgres=# \l list all the databases
-- 3 postgres=# CREATE DATABASE todo_database;
-- 4 postgres=# \c todo_database    conncects to the databases
-- 5 we take the create table todo line and past into psql
--  CREATE TABLE todo(
--     todo_id SERIAL PRIMARY KEY,
--     description VARCHAR(255)
-- );
