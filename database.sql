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

--  psql Common Commands
-- \l — List all databases
--  \c DB_NAME — connect to DB_NAME
--  \dt —- List all tables (in current db)
--  \d TABLE_NAME — Get details about TABLE_NAME (in current db)
--  \q — Quit psql (can also type <Control-D>)

-- todo_database=# SELECT * FROM todo; will pull up all todos 
-- Show details
--  \d+ TABLE_NAME