CREATE TABLE IF NOT EXISTS pastes (
    paste VARCHAR(10) PRIMARY KEY,
    text TEXT
);

INSERT IGNORE INTO pastes (paste, text) VALUES 
    ("paste123", "Hello! This is just an example paste. Click 'new' to start your own paste.");