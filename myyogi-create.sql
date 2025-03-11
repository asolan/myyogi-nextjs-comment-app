-- Create the customer table
CREATE TABLE person (
    ID SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL

);

CREATE TABLE customer (
    ID SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
);

-- Create the quote table
CREATE TABLE quote (
    ID SERIAL PRIMARY KEY,
    customerID INT REFERENCES customer(ID),
    chapterNum INT,
    paragraphNum INT,
    posStart INT,
    posEnd INT,
    created DATE,
    isActive BIT
);

-- Create the note table
CREATE TABLE note (
    ID SERIAL PRIMARY KEY,
    customerID INT REFERENCES customer(ID),
    quoteID INT REFERENCES quote(ID),
    title VARCHAR(255) NOT NULL,
    details TEXT,
    created DATE,
    updated DATE,
    isActive BIT
);

-- Create the vote table
CREATE TABLE vote (
    ID SERIAL PRIMARY KEY,
    noteID INT REFERENCES note(ID),
    customerID INT REFERENCES customer(ID),
    created DATE,
    details TEXT
);

-- Create the notequote table
-- CREATE TABLE notequote (
--     ID SERIAL PRIMARY KEY,
--     noteid INT REFERENCES note(ID),
--     quoteid INT REFERENCES quote(ID)
-- );