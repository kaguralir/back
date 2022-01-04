CREATE DATABASE neksoo DEFAULT CHARACTER SET = 'utf8mb4';
DROP TABLE IF EXISTS user;
CREATE TABLE user (
  user_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  demo TINYINT NOT NULL DEFAULT(0),
  role VARCHAR(100),
  organizationId INTEGER,
  projectId INTEGER,
  name VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(100),
  mobile INTEGER,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DDATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ATE
);
DROP TABLE IF EXISTS searchedJob;
CREATE TABLE searchedJob(
  searchedJob_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  candidat_id INTEGER (100),
  CONSTRAINT FK_candidat_id FOREIGN KEY (candidat_id) REFERENCES user(user_id),
  available TINYINT(1),
  remote TINYINT(1),
  beginDate DATE,
  locations VARCHAR(100),
  job VARCHAR(100),
  category VARCHAR(100),
  portfolio VARCHAR(100),
  linkedin VARCHAR(100),
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE IF EXISTS uploads;
CREATE TABLE uploads(
  uploads_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  userUpload_id INTEGER (100),
  CONSTRAINT FK_userUpload_id FOREIGN KEY (userUpload_id) REFERENCES user(user_id),
  cv VARCHAR(100)
);
DROP TABLE IF EXISTS images;
CREATE TABLE images (
  image_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  uploadedFiles_id INTEGER(100),
CONSTRAINT FK_uploadedFiles_id FOREIGN KEY (uploadedFiles_id) REFERENCES uploads(uploads_id),
  filename varchar(255)
);

DROP TABLE IF EXISTS skillsCandidate;
CREATE TABLE skillsCandidate (
  skillsCandidate_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  job_id INTEGER(100),
  CONSTRAINT FK_job_id FOREIGN KEY (job_id) REFERENCES searchedJob(searchedJob_id)

);