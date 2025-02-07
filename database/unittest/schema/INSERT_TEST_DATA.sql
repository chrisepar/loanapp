INSERT INTO APPLICANTS(APPLICANT_NAME)
VALUES
('John Doe'), ('Jane Doe'), ('Smith Doe'), ('John Smith'), ('Smith John'), 
('Test Applicant'), ('My Applicant'), ('Smither'), ('Gimly'), ('Aragorn'), 
('Legolas'), ('Gandalf'), ('Sauron'), ('Galadriel'), ('Elrond'), 
('Arwen'), ('Gollum'), ('Frodo'), ('Samwise'), ('Bilbo');

INSERT INTO LOANS(APPLICANT_ID, LOANED_AMOUNT,STATUS_ID)
VALUES
(12, 1000000, 'APR'),
(13, 5, 'REJ');
