CREATE TABLE users (
	userID int not null auto_increment,
    username varchar(50),
    email varchar(100),
    hash_password CHAR(60),
    token varchar(255),
    secret varchar(255),
    PRIMARY KEY (userID)
);
