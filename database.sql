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
DROP TABLE IF EXISTS candidatThumbsActivity;
CREATE TABLE candidatThumbsActivity(
  thumb_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  candidat_id INTEGER(100),
  CONSTRAINT FK_candidatThumb_id FOREIGN KEY (candidat_id) REFERENCES user(user_id),
  jobThumbActivity_id INTEGER(100),
  CONSTRAINT FK_jobThumbActivity_id FOREIGN KEY (jobThumbActivity_id) REFERENCES jobOffers(jobOffer_id),
  candidatThumbStatus TINYINT(1)
);
DROP TABLE IF EXISTS recruiterThumbsActivity;
CREATE TABLE recruiterThumbsActivity(
  thumb_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  recruiterThumb_id INTEGER(100),
  CONSTRAINT FK_recruiterThumb_id FOREIGN KEY (recruiterThumb_id) REFERENCES jobOffers(recruiter_id),
  candidat_id INTEGER(100),
  CONSTRAINT FK_candidatLiked_id FOREIGN KEY (candidat_id) REFERENCES user(user_id),
  recruiterThumbStatus TINYINT(1)
);
DROP TABLE IF EXISTS mutualThumbsUp;
CREATE TABLE mutualThumbsUp(
  mutualThumbsUp_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  mutualRecruiter_id INTEGER (100),
  CONSTRAINT FK_mutualRecruiter_id FOREIGN KEY (mutualRecruiter_id) REFERENCES recruiterThumbsActivity(recruiterThumb_id),
  mutualCandidate_id INTEGER (100),
  CONSTRAINT FK_mutualCandidate_id FOREIGN KEY (mutualCandidate_id) REFERENCES candidatThumbsActivity(candidat_id)
);


DROP TABLE IF EXISTS conversations;
CREATE TABLE conversations(
  conversation_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  mutualThumbsUp_id INTEGER(100),
  CONSTRAINT FK_mutualThumbsUp_id FOREIGN KEY (mutualThumbsUp_id) REFERENCES mutualThumbsUp(mutualThumbsUp_id),
  recruiterMessaging_id INTEGER(100),
  CONSTRAINT FK_recruiterMessaging_id  FOREIGN KEY (recruiterMessaging_id) REFERENCES mutualThumbsUp(mutualRecruiter_id),
  candidateMessaging_id INTEGER(100),
  CONSTRAINT FK_candidateMessaging_id FOREIGN KEY (candidateMessaging_id) REFERENCES mutualThumbsUp(mutualCandidate_id),
  messageSend VARCHAR(1000),
  sendDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
