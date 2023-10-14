CREATE TABLE IF NOT EXISTS pastes (
    paste VARCHAR(10) PRIMARY KEY,
    text TEXT,
    language VARCHAR(15)
);

INSERT IGNORE INTO pastes (paste, text, language) VALUES 
    ("paste123", "Hello! This is just an example paste. Click 'new' to start your own paste.", "plain");