DROP TABLE IF EXISTS tbl_get_badge CASCADE;
DROP TABLE IF EXISTS tbl_member CASCADE;
DROP TABLE IF EXISTS tbl_authority CASCADE;
DROP TABLE IF EXISTS tbl_badge CASCADE;
DROP TABLE IF EXISTS tbl_point_reward CASCADE;

DROP TABLE IF EXISTS tbl_member_reviews CASCADE;
DROP TABLE IF EXISTS tbl_review_category CASCADE;
DROP TABLE IF EXISTS tbl_review_text CASCADE;
DROP TABLE IF EXISTS tbl_travel_schedule CASCADE;
DROP TABLE IF EXISTS tbl_travel_day CASCADE;

DROP TABLE IF EXISTS tbl_activity CASCADE;
DROP TABLE IF EXISTS tbl_expense CASCADE;
DROP TABLE IF EXISTS tbl_expense_detail CASCADE;
DROP TABLE IF EXISTS tbl_population CASCADE;
DROP TABLE IF EXISTS tbl_travel_country CASCADE;

DROP TABLE IF EXISTS tbl_notice_category CASCADE;
DROP TABLE IF EXISTS tbl_notice CASCADE;
DROP TABLE IF EXISTS tbl_comment CASCADE;
DROP TABLE IF EXISTS tbl_population_review CASCADE;
DROP TABLE IF EXISTS tbl_chatroom CASCADE;
DROP TABLE IF EXISTS tbl_message CASCADE;

-- 권한 테이블
CREATE TABLE IF NOT EXISTS tbl_authority
(
    authority_code INT AUTO_INCREMENT NOT NULL COMMENT '권한코드',
    authority_name VARCHAR(255) NOT NULL COMMENT '권한명',
    authority_desc VARCHAR(4000) NOT NULL COMMENT '권한설명',
    CONSTRAINT pk_authority_code PRIMARY KEY (authority_code)
) ENGINE=InnoDB COMMENT '권한';

-- 회원 테이블
CREATE TABLE IF NOT EXISTS tbl_member
(
    member_code INT AUTO_INCREMENT COMMENT '회원식별코드',
    authority_code INT NOT NULL COMMENT '권한코드',
    member_name VARCHAR(255) NOT NULL COMMENT '회원이름',
    member_nickname VARCHAR(255) NOT NULL COMMENT '닉네임',
    member_mobile_number VARCHAR(255) NOT NULL COMMENT '휴대폰번호',
    member_created_at DATE NOT NULL COMMENT '생성일자',
    member_id VARCHAR(255) UNIQUE NOT NULL COMMENT '아이디',
    member_password VARCHAR(255) NOT NULL COMMENT '비밀번호',
    member_level INT NOT NULL COMMENT '등급',
    member_certification VARCHAR(1) NOT NULL COMMENT '본인인증',
    CONSTRAINT pk_member_code PRIMARY KEY (member_code),
    CONSTRAINT fk_authority_code FOREIGN KEY (authority_code) REFERENCES tbl_authority(authority_code)
) ENGINE=InnoDB COMMENT '회원';

-- 배지 테이블
CREATE TABLE IF NOT EXISTS tbl_badge
(
    badge_code INT AUTO_INCREMENT NOT NULL COMMENT '배지코드',
    badge_name VARCHAR(255) NOT NULL COMMENT '배지이름',
    badge_criteria VARCHAR(255) NOT NULL COMMENT '획득조건',
    badge_create_at DATE NOT NULL COMMENT '생성일자',
    CONSTRAINT pk_badge_code PRIMARY KEY (badge_code)
) ENGINE=InnoDB COMMENT '배지';

-- 배지 획득 테이블
CREATE TABLE IF NOT EXISTS tbl_get_badge
(
    badge_code INT NOT NULL COMMENT '배지코드',
    member_code INT NOT NULL COMMENT '회원식별코드',
    CONSTRAINT fk_badge_code FOREIGN KEY (badge_code) REFERENCES tbl_badge(badge_code),
    CONSTRAINT fk_member_code FOREIGN KEY (member_code) REFERENCES tbl_member(member_code)
) ENGINE=InnoDB COMMENT '획득배지';

-- 포인트 리워드 테이블
CREATE TABLE IF NOT EXISTS tbl_point_reward
(
    point_reward_code INT AUTO_INCREMENT NOT NULL COMMENT '점수코드',
    member_code INT COMMENT '회원식별코드',
    point_reward_reason VARCHAR(255) NOT NULL COMMENT '점수이유',
    point_reward_point INT COMMENT '포인트',
    CONSTRAINT pk_point_reward_code PRIMARY KEY (point_reward_code),
    CONSTRAINT fk_member_code1 FOREIGN KEY (member_code) REFERENCES tbl_member(member_code)
) ENGINE=InnoDB COMMENT '포인트 리워드';

-- 리뷰 카테고리 테이블
CREATE TABLE IF NOT EXISTS tbl_review_category
(
    review_category_code INT AUTO_INCREMENT NOT NULL COMMENT '리뷰카테고리코드',
    reivew_category_level INT COMMENT '카테고리등급',
    CONSTRAINT pk_review_category_code PRIMARY KEY (review_category_code)
) ENGINE=InnoDB COMMENT '후기카테고리';

-- 회원 후기 테이블
CREATE TABLE IF NOT EXISTS tbl_member_reviews
(
    member_review_code INT AUTO_INCREMENT NOT NULL COMMENT '후기코드',
    review_category_code INT NOT NULL COMMENT '리뷰카테고리코드',
    member_code INT COMMENT '회원식별코드',
    member_review VARCHAR(100) NOT NULL COMMENT '리뷰내용',
    CONSTRAINT pk_member_review_code PRIMARY KEY (member_review_code),
    CONSTRAINT fk_review_category_code FOREIGN KEY (review_category_code) REFERENCES tbl_review_category(review_category_code),
    CONSTRAINT fk_member_code2 FOREIGN KEY (member_code) REFERENCES tbl_member(member_code)
) ENGINE=InnoDB COMMENT '회원후기';

-- 리뷰 내용 테이블
CREATE TABLE IF NOT EXISTS tbl_review_text
(
    review_category_code INT NOT NULL COMMENT '리뷰카테고리코드',
    review_text VARCHAR(100) NOT NULL COMMENT '내용',
    CONSTRAINT fk_review_category_code1 FOREIGN KEY (review_category_code) REFERENCES tbl_review_category(review_category_code)
) ENGINE=InnoDB COMMENT '후기내용';

-- 여행 일정 테이블
CREATE TABLE IF NOT EXISTS tbl_travel_schedule
(
    travel_code INT AUTO_INCREMENT NOT NULL COMMENT '여행코드',
    member_code INT COMMENT '회원식별코드',
    travel_name VARCHAR(100) NOT NULL COMMENT '여행제목',
    travel_start_date DATE NOT NULL COMMENT '여행시작',
    travel_end_date DATE NOT NULL COMMENT '여행종료',
    travel_total_date VARCHAR(10) NOT NULL COMMENT '총일수',
    travel_total_night VARCHAR(10) NOT NULL COMMENT '총박수',
    travel_destination VARCHAR(10) NOT NULL COMMENT '목적지',
    travel_onoff VARCHAR(1) NOT NULL COMMENT '여행완료여부',
    CONSTRAINT pk_travel_code PRIMARY KEY (travel_code),
    CONSTRAINT fk_member_code3 FOREIGN KEY (member_code) REFERENCES tbl_member(member_code)
) ENGINE=InnoDB COMMENT '여행일정';

-- 여행 일정별 일과 테이블
CREATE TABLE IF NOT EXISTS tbl_travel_day
(
    day_code INT AUTO_INCREMENT NOT NULL COMMENT '일과코드',
    travel_code INT NOT NULL COMMENT '여행코드',
    day_number INT NOT NULL COMMENT '여행차수',
    day_date INT NOT NULL COMMENT '해당 일',
    CONSTRAINT pk_day_code PRIMARY KEY (day_code),
    CONSTRAINT fk_travel_code FOREIGN KEY (travel_code) REFERENCES tbl_travel_schedule(travel_code)
) ENGINE=InnoDB COMMENT '일정별일과';

-- 활동 정보 테이블
CREATE TABLE IF NOT EXISTS tbl_activity
(
    activity_code INT AUTO_INCREMENT NOT NULL COMMENT '활동코드',
    day_code INT NOT NULL COMMENT '일과코드',
    activity_title VARCHAR(10) NOT NULL COMMENT '세부활동제목',
    activity_detail VARCHAR(100) NOT NULL COMMENT '세부활동',
    CONSTRAINT pk_activity_code PRIMARY KEY (activity_code),
    CONSTRAINT fk_day_code FOREIGN KEY (day_code) REFERENCES tbl_travel_day(day_code)
) ENGINE=InnoDB COMMENT '활동정보';

-- 활동 비용 테이블
CREATE TABLE IF NOT EXISTS tbl_expense
(
    expense_code INT AUTO_INCREMENT NOT NULL COMMENT '활동금액코드',
    activity_code INT NOT NULL COMMENT '활동코드',
    expense_total_amount INT NOT NULL COMMENT '활동총비용',
    CONSTRAINT pk_expense_code PRIMARY KEY (expense_code),
    CONSTRAINT fk_activity_code FOREIGN KEY (activity_code) REFERENCES tbl_activity(activity_code)
) ENGINE=InnoDB COMMENT '활동정보';


-- 활동 비용 세부 테이블
CREATE TABLE IF NOT EXISTS tbl_expense_detail
(
    expense_detail_code INT AUTO_INCREMENT NOT NULL COMMENT '활동금액세부코드',
    expense_code INT NOT NULL COMMENT '활동금액코드',
    expense_detail_amount INT NOT NULL COMMENT '세부활동비용',
    member_code INT COMMENT '회원식별코드',
    CONSTRAINT pk_expense_detail_code PRIMARY KEY (expense_detail_code),
    CONSTRAINT fk_expense_code FOREIGN KEY (expense_code) REFERENCES tbl_expense(expense_code),
    CONSTRAINT fk_member_code4 FOREIGN KEY (member_code) REFERENCES tbl_member(member_code)
) ENGINE=InnoDB COMMENT '세부활동정보';

-- 국가 테이블
CREATE TABLE IF NOT EXISTS tbl_travel_country
(
    country_code INT AUTO_INCREMENT NOT NULL COMMENT '국가코드',
    country_name VARCHAR(20) NOT NULL COMMENT '국가',
    CONSTRAINT pk_country_code PRIMARY KEY (country_code)
) ENGINE=InnoDB COMMENT '국가';

-- 모집 공고 테이블
CREATE TABLE IF NOT EXISTS tbl_population
(
    population_code INT AUTO_INCREMENT NOT NULL COMMENT '공고코드',
    travel_code INT NOT NULL COMMENT '여행코드',
    member_code INT COMMENT '회원식별코드',
    country_code INT NOT NULL COMMENT '국가코드',
    population_title VARCHAR(255) NOT NULL COMMENT '공고제목',
    population_description VARCHAR(255) NOT NULL COMMENT '공고설명',
    population_created_at DATE NOT NULL COMMENT '생성일자',
    population_views INT NOT NULL COMMENT '조회수',
    population_people INT NOT NULL COMMENT '모집인원수',
    population_onoff VARCHAR(1) NOT NULL COMMENT '모집여부',
    CONSTRAINT pk_population_code PRIMARY KEY (population_code),
    CONSTRAINT fk_travel_code1 FOREIGN KEY (travel_code) REFERENCES tbl_travel_schedule(travel_code),
    CONSTRAINT fk_member_code5 FOREIGN KEY (member_code) REFERENCES tbl_member(member_code),
    CONSTRAINT fk_country_code FOREIGN KEY (country_code) REFERENCES tbl_travel_country(country_code)
) ENGINE=InnoDB COMMENT '모집공고';

-- 공지사항 카테고리 테이블
CREATE TABLE IF NOT EXISTS tbl_notice_category
(
    notice_category_code INT AUTO_INCREMENT NOT NULL COMMENT '공지사항 카테고리 코드',
    notice_category_name VARCHAR(100) NOT NULL COMMENT '공지사항 카테고리명',
    CONSTRAINT pk_notice_category_code PRIMARY KEY (notice_category_code)
) ENGINE=InnoDB COMMENT '공지사항 카테고리';

-- 공지사항 테이블
CREATE TABLE IF NOT EXISTS tbl_notice
(
    notice_code INT AUTO_INCREMENT NOT NULL COMMENT '공지사항 코드',
    notice_category_code INT NOT NULL COMMENT '공지사항 카테고리 코드',
    notice_title VARCHAR(255) NOT NULL COMMENT '공지사항 제목',
    notice_content TEXT NOT NULL COMMENT '공지사항 내용',
    notice_created_at DATE NOT NULL COMMENT '작성일자',
    member_code INT COMMENT '작성자 회원식별코드',
    CONSTRAINT pk_notice_code PRIMARY KEY (notice_code),
    CONSTRAINT fk_notice_category_code FOREIGN KEY (notice_category_code) REFERENCES tbl_notice_category(notice_category_code),
    CONSTRAINT fk_member_code6 FOREIGN KEY (member_code) REFERENCES tbl_member(member_code)
) ENGINE=InnoDB COMMENT '공지사항';

-- 댓글 테이블
CREATE TABLE IF NOT EXISTS tbl_comment
(
    comment_code INT AUTO_INCREMENT NOT NULL COMMENT '댓글코드',
    notice_code INT NOT NULL COMMENT '공지사항 코드',
    member_code INT COMMENT '작성자 회원식별코드',
    comment_content TEXT NOT NULL COMMENT '댓글내용',
    comment_created_at DATE NOT NULL COMMENT '작성일자',
    CONSTRAINT pk_comment_code PRIMARY KEY (comment_code),
    CONSTRAINT fk_notice_code FOREIGN KEY (notice_code) REFERENCES tbl_notice(notice_code),
    CONSTRAINT fk_member_code7 FOREIGN KEY (member_code) REFERENCES tbl_member(member_code)
) ENGINE=InnoDB COMMENT '댓글';

-- 모집공고에 대한 후기 테이블
CREATE TABLE IF NOT EXISTS tbl_population_review
(
    population_review_code INT AUTO_INCREMENT NOT NULL COMMENT '모집공고 후기코드',
    population_code INT NOT NULL COMMENT '공고코드',
    member_code INT COMMENT '회원식별코드',
    review_content TEXT NOT NULL COMMENT '후기내용',
    review_created_at DATE NOT NULL COMMENT '작성일자',
    CONSTRAINT pk_population_review_code PRIMARY KEY (population_review_code),
    CONSTRAINT fk_population_code FOREIGN KEY (population_code) REFERENCES tbl_population(population_code),
    CONSTRAINT fk_member_code8 FOREIGN KEY (member_code) REFERENCES tbl_member(member_code)
) ENGINE=InnoDB COMMENT '모집공고에 대한 후기';

-- 채팅방 테이블
CREATE TABLE IF NOT EXISTS tbl_chatroom
(
    chatroom_code INT AUTO_INCREMENT NOT NULL COMMENT '채팅방코드',
    chatroom_name VARCHAR(255) NOT NULL COMMENT '채팅방명',
    chatroom_created_at DATE NOT NULL COMMENT '생성일자',
    CONSTRAINT pk_chatroom_code PRIMARY KEY (chatroom_code)
) ENGINE=InnoDB COMMENT '채팅방';

-- 메시지 테이블
CREATE TABLE IF NOT EXISTS tbl_message
(
    message_code INT AUTO_INCREMENT NOT NULL COMMENT '메시지코드',
    chatroom_code INT NOT NULL COMMENT '채팅방코드',
    member_code INT COMMENT '작성자 회원식별코드',
    message_content TEXT NOT NULL COMMENT '메시지 내용',
    message_sent_at DATETIME NOT NULL COMMENT '전송 시간',
    CONSTRAINT pk_message_code PRIMARY KEY (message_code),
    CONSTRAINT fk_chatroom_code FOREIGN KEY (chatroom_code) REFERENCES tbl_chatroom(chatroom_code),
    CONSTRAINT fk_member_code9 FOREIGN KEY (member_code) REFERENCES tbl_member(member_code)
) ENGINE=InnoDB COMMENT '메시지';
