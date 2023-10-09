USE pastebin_db;

CREATE TABLE IF NOT EXIST links (
    link VARCHAR(6) PRIMARY KEY,
    text TEXT
);