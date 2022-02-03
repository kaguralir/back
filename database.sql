CREATE DATABASE neksoo DEFAULT CHARACTER SET = 'utf8mb4';
DROP TABLE IF EXISTS user;
CREATE TABLE user (
  user_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  demo TINYINT DEFAULT(0),
  role VARCHAR(100),
  name VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(100),
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE IF EXISTS searchedJob;
CREATE TABLE searchedJob(
  searchedJob_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  candidat_id INTEGER (100),
  CONSTRAINT FK_candidat_id FOREIGN KEY (candidat_id) REFERENCES user(user_id),
  available TINYINT DEFAULT(1),
  remote VARCHAR(20),
  beginDate DATE,
  city VARCHAR(100),
  country VARCHAR (100),
  car_ownership  TINYINT (1),
  job_title VARCHAR(100),
  description VARCHAR(100),
  projects VARCHAR(100),
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE IF EXISTS uploads;
CREATE TABLE uploads(
  uploads_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  userUploader_id INTEGER (100),
  CONSTRAINT FK_userUploader_id FOREIGN KEY (userUploader_id) REFERENCES user(user_id),
  fileName VARCHAR(100),
  pdfFileName VARCHAR(100),
  jobOffer_id INTEGER (100),
  CONSTRAINT FK_jobOffer_id FOREIGN KEY (jobOffer_id) REFERENCES jobOffers (jobOffer_id)
);

DROP TABLE IF EXISTS skills;
CREATE TABLE skills (
  skills_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  jobSkills_id INTEGER(100),
  CONSTRAINT FK_jobSkills_id FOREIGN KEY (jobSkills_id) REFERENCES searchedJob(searchedJob_id),
  candidatSkills_id INTEGER(100),
  CONSTRAINT FK_candidatSkills_id FOREIGN KEY (candidatSkills_id) REFERENCES user(user_id),
  skills VARCHAR(100),
  softSkills VARCHAR(100),
  hobbies VARCHAR(100)

);
DROP TABLE IF EXISTS jobOffers;
CREATE TABLE jobOffers(
  jobOffer_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  recruiter_id INTEGER(100),
  CONSTRAINT FK_recruiter_id FOREIGN KEY (recruiter_id) REFERENCES user(user_id),
  available TINYINT DEFAULT(1),
  remote VARCHAR(50),
  organizationName VARCHAR(100),
  jobOffer_role VARCHAR(100),
  jobOffer_description VARCHAR(100),
  country VARCHAR(100),
  city VARCHAR(100),
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
  jobApplied_id INTEGER(100) NULL,
  CONSTRAINT FK_jobApplied_id FOREIGN KEY (jobApplied_id) REFERENCES jobOffers(jobOffer_id),
  candidateWhoApplied_id INTEGER(100),
  CONSTRAINT FK_candidateWhoApplied_id FOREIGN KEY (candidateWhoApplied_id) REFERENCES user(user_id),
  recruiterJobOffer_id INTEGER(100) NULL,
  interest TINYINT(1) NULL
);
DROP TABLE IF EXISTS kanbanRecruiter;
CREATE TABLE kanbanRecruiter(
  kanbanRecruiter_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  mutual_interest_id INTEGER(100),
  CONSTRAINT FK_mutual_interest_id FOREIGN KEY (mutual_interest_id) REFERENCES interest(interest_id),
  interview_id INTEGER(100),
  candidateProgress VARCHAR(100)
);
DROP TABLE IF EXISTS interviews;
CREATE TABLE interviews(
  interviews_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  interviewOnKanban_id INTEGER(100),
  CONSTRAINT FK_interviewOnKanban_id FOREIGN KEY (interviewOnKanban_id) REFERENCES kanbanRecruiter(kanbanRecruiter_id),
  mode VARCHAR(100),
  note VARCHAR(100),
  pickedDate DATE,
  pickedTime TIME
);