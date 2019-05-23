CREATE TABLE books (
    id serial PRIMARY KEY UNIQUE NOT NULL,
    isbn varchar(255) UNIQUE NOT NULL,
    name varchar(255) NOT NULL,
    authors varchar(255),
    publisher varchar(255),
    content varchar(511),
    created_at timestamp NOT NULL DEFAULT NOW()
);
