CREATE TABLE seq_group_id (seq_group_id int    , PRIMARY KEY (seq_group_id))
CREATE TABLE user_attendance_requests_info 
    (user_id Int   ,attendance_request_id Int   ,is_attendance varchar(10)   ,is_response varchar(10)   ,message varchar(1000)    , PRIMARY KEY (user_id,attendance_request_id))
CREATE TABLE attendance_requests 
    (attendance_request_id Int   ,purpose varchar(1000)   ,created Timestamp DEFAULT CURRENT_TIMESTAMP  ,location varchar(1000)   ,start_date Timestamp DEFAULT CURRENT_TIMESTAMP  ,end_date Timestamp DEFAULT CURRENT_TIMESTAMP  ,organizer_id Int   ,describes varchar(1000)   ,bring varchar(1000)   ,organizer_name varchar(1000)    , PRIMARY KEY (attendance_request_id))
CREATE TABLE event_paticipants (paticipant_id Int   ,attendance_request_id Int    , PRIMARY KEY (attendance_request_id))
CREATE TABLE users_info (user_id Int   ,user_name varchar(100)   ,image_path varchar(100)  , PRIMARY KEY (user_id) )
CREATE TABLE seq_event_id (seq_event_id int    , PRIMARY KEY (seq_event_id))
CREATE TABLE groups (gruop_id Int   ,gruop_name varchar(100)    , PRIMARY KEY (gruop_id))
CREATE TABLE user_groups (gruop_id Int   ,user_id Int    , PRIMARY KEY (gruop_id,user_id))
CREATE TABLE users_login (user_id int   ,name varchar(100)   ,password varchar(256)    , PRIMARY KEY (user_id,name,password))