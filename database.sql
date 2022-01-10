CREATE DATABASE neksoo DEFAULT CHARACTER SET = 'utf8mb4';
DROP TABLE IF EXISTS user;
CREATE TABLE user (
  user_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  demo TINYINT NOT NULL DEFAULT(0),
  role VARCHAR(100),
  organizationId INTEGER (255),
  projectId INTEGER (255),
  CONSTRAINT UC_projectId UNIQUE (projectId),
  name VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(100),
  mobile INTEGER (255),
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
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
DROP TABLE IF EXISTS jobOffers;
CREATE TABLE jobOffers(
  jobOffer_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  recruiter_id INTEGER(100),
  CONSTRAINT FK_recruiter_id FOREIGN KEY (recruiter_id) REFERENCES user(user_id),
  available TINYINT(1),
  organizationName VARCHAR(100),
  jobProject_id INTEGER(100),
  CONSTRAINT FK_jobProject_id FOREIGN KEY (jobProject_id) REFERENCES user(projectId),
  jobOffer_role VARCHAR(100),
  jobOffer_description VARCHAR(100),
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);



DROP TABLE IF EXISTS conversations;
CREATE TABLE conversations(
  conversation_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  mutualInterest_id INTEGER(100),
  CONSTRAINT FK_mutualInterest_id FOREIGN KEY (mutualInterest_id) REFERENCES interest(interest_id),
  sender_id INTEGER(100),
  messageSend VARCHAR(1000),
  sendDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);


DROP TABLE IF EXISTS interest;
CREATE TABLE interest(
  interest_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  jobApplied_id  INTEGER(100) NULL,
  CONSTRAINT FK_jobApplied_id FOREIGN KEY (jobApplied_id) REFERENCES jobOffers(jobOffer_id),
  candidateWhoApplied_id INTEGER(100),
  CONSTRAINT FK_candidateWhoApplied_id FOREIGN KEY (candidateWhoApplied_id) REFERENCES user(user_id),
  recruiterJobOffer_id  INTEGER(100)NULL,
  interest  TINYINT(1) NULL
);
