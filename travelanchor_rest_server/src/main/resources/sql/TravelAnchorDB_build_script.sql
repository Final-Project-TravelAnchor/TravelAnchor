DROP TABLE IF EXISTS tbl_get_badge CASCADE;
DROP TABLE IF EXISTS tbl_badge CASCADE;
DROP TABLE IF EXISTS tbl_member CASCADE;
DROP TABLE IF EXISTS tbl_authority CASCADE;
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
DROP TABLE IF EXISTS tbl_member_role CASCADE;

-- 권한 테이블
CREATE TABLE IF NOT EXISTS tbl_authority
(
    authority_code INT AUTO_INCREMENT NOT NULL COMMENT '권한코드',
    authority_name VARCHAR(255) NOT NULL COMMENT '권한명',
    authority_desc VARCHAR(4000) NOT NULL COMMENT '권한설명',
    CONSTRAINT pk_authority_code PRIMARY KEY (authority_code)

) ENGINE=InnoDB COMMENT '권한';

-- tbl_member_role(회원별권한)
CREATE TABLE IF NOT EXISTS tbl_member_role
(
    member_code int auto_increment comment '회원식별코드',
    authority_code int not null comment '권한식별코드',
    constraint pk_member_role primary key (member_code, authority_code)
) ENGINE=InnoDB COMMENT '회원별권한';

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

-- 권한 테이블 더미 데이터
INSERT INTO tbl_authority (authority_code, authority_name, authority_desc)
VALUES
    (1, 'Admin', '관리자 권한'),
    (2, 'User', '일반 사용자 권한');

-- 회원 테이블 더미 데이터
INSERT INTO tbl_member (member_code, authority_code, member_name, member_nickname, member_mobile_number, member_created_at, member_id, member_password, member_level, member_certification) VALUES
(1, 1, '홍길동', '길동이', '010-1234-5678', '2024-01-01', 'user1', '$2a$10$IhDb9e29Zr.dCr7nPUA/0e0WShLAy.g6EEMZVBY7HF4U4GbCM/hem', 1, 'Y'),
(2, 2, '김철수', '철수', '010-9876-5432', '2024-02-15', 'user2', '$2a$10$X0HHRqJiasK1lnV84b83guyl6Fuiy72dHz0gRqMWQbpFUG56CPwu6', 2, 'N'),
(3, 2, '박영희', '영희', '010-1111-2222', '2024-03-01', 'user3', '$2a$10$RaUrEJIDuNOc73mn.9TNF.t1E/0BiX4NJGuIGNg0oAVlOFset9CPe', 3, 'Y'),
(4, 2, '이민호', '민호', '010-2222-3333', '2024-03-10', 'user4', '$2a$10$koZtyqOFbMZ/zuHGd1k.R.LAL4fVMfC60MuiVImjCLs7XHNkUu4DK', 1, 'Y'),
(5, 2, '최수지', '수지', '010-3333-4444', '2024-04-20', 'user5', '$2a$10$312n.LuQ2AAPF9LkNTNOHeM9V5USiBqA7B6yeQX6fzyCoBWYuO68y', 2, 'N'),
(6, 2, '정준하', '준하', '010-4444-5555', '2024-05-05', 'user6', '$2a$10$aZ5.qhA0dJ0n.PjaV.rOHeO2/H6Ksx1ZJyd5DAKO1kTqYq6hawMfi', 3, 'Y'),
(7, 2, '강동원', '동원', '010-5555-6666', '2024-06-12', 'user7', '$2a$10$5w7VezVF36an5LwgCQAWxeCZfuIO1YrAGy4mZrU0TZVvPH/zLwj8a', 1, 'N'),
(8, 2, '한소희', '소희', '010-6666-7777', '2024-07-08', 'user8', '$2a$10$140Sv/sKmV/TkD3MN3yzWe4iljEdAwy/79Bl8TYSFobiYCVc.ksAy', 2, 'Y'),
(9, 2, '김유나', '유나', '010-7777-8888', '2024-08-16', 'user9', '$2a$10$gQoxt8swFds4eO0Du.lV1ukQLolDiYWabK9uV7AGsmcoRhBzyobYa', 3, 'N'),
(10, 2, '이강현', '강현', '010-8888-9999', '2024-09-01', 'user10', '$2a$10$2H5vp7906QZQxicmDCTJeuDuxL4ye/0YthOlVStS5N/KQOYLUiun2', 1, 'Y');

-- 배지 테이블 더미 데이터
INSERT INTO tbl_badge (badge_code, badge_name, badge_criteria, badge_create_at) VALUES
(1, '초심자', '첫 가입 후 활동 시작', '2024-01-10'),
(2, '활동가', '활동 10회 이상', '2024-02-10');

-- 배지 획득 테이블 더미 데이터
INSERT INTO tbl_get_badge (badge_code, member_code) VALUES
(1, 1),
(2, 2);

-- 포인트 리워드 테이블 더미 데이터
INSERT INTO tbl_point_reward (point_reward_code, member_code, point_reward_reason, point_reward_point) VALUES
(1, 1, '가입 기념 포인트', 50),
(2, 2, '리뷰 작성', 30);

-- 리뷰 카테고리 테이블 더미 데이터
INSERT INTO tbl_review_category (review_category_code, reivew_category_level) VALUES
(1, 1),
(2, 2);

-- 회원 후기 테이블 더미 데이터
INSERT INTO tbl_member_reviews (member_review_code, review_category_code, member_code, member_review) VALUES
(1, 1, 1, '매우 친절합니다.'),
(2, 2, 2, '여행 동반자로 추천합니다.');

INSERT INTO tbl_review_text (review_category_code, review_text) VALUES
(1, '매우 친절합니다.1'),
(2, '여행 동반자로 추천합니다.2');

-- 여행 일정 테이블 더미 데이터
INSERT INTO tbl_travel_schedule (travel_code, member_code, travel_name, travel_start_date, travel_end_date, travel_total_date, travel_total_night, travel_destination, travel_onoff) VALUES
(1, 1, '유럽 여행', '2024-04-01', '2024-04-14', '14일', '13박', '파리', 'N'),
(2, 2, '일본 도쿄 여행', '2024-05-05', '2024-05-10', '6일', '5박', '도쿄', 'Y'),
(3, 3, '미국 뉴욕 여행', '2024-06-01', '2024-06-10', '10일', '9박', '뉴욕', 'N'),
(4, 4, '호주 시드니 여행', '2024-07-10', '2024-07-17', '8일', '7박', '시드니', 'Y'),
(5, 5, '태국 방콕 여행', '2024-08-15', '2024-08-20', '6일', '5박', '방콕', 'N'),
(6, 6, '이탈리아 로마 여행', '2024-09-01', '2024-09-10', '10일', '9박', '로마', 'Y'),
(7, 7, '그리스 아테네 여행', '2024-10-05', '2024-10-12', '8일', '7박', '아테네', 'N'),
(8, 8, '영국 런던 여행', '2024-11-10', '2024-11-15', '6일', '5박', '런던', 'Y'),
(9, 9, '스페인 바르셀로나 여행', '2024-12-01', '2024-12-08', '8일', '7박', '바르셀로나', 'N'),
(10, 10, '캐나다 토론토 여행', '2025-01-10', '2025-01-20', '11일', '10박', '토론토', 'Y');

INSERT INTO tbl_travel_day (day_code, travel_code, day_number, day_date) VALUES
(1, 1, 1, 1),
(2, 1, 2, 2),
(3, 1, 1, 1),
(4, 1, 1, 1),
(5, 1, 1, 1),
(6, 1, 1, 1),
(7, 1, 1, 1),
(8, 1, 1, 1),
(9, 1, 1, 1),
(10, 1, 1, 1);
# (3, 1, 1, 2);

INSERT INTO tbl_activity (activity_code, day_code, activity_title, activity_detail) VALUES
(1, 1, '세부활동제목1', '세부적인 활동을 적는 란.1'),
(2, 2, '세부활동제목2', '세부적인 활동을 적는 란.2'),
(3, 3, '세부활동제목3', '세부적인 활동을 적는 란.3'),
(4, 4, '세부활동제목4', '세부적인 활동을 적는 란.4'),
(5, 5, '세부활동제목5', '세부적인 활동을 적는 란.5'),
(6, 6, '세부활동제목6', '세부적인 활동을 적는 란.6'),
(7, 7, '세부활동제목7', '세부적인 활동을 적는 란.7'),
(8, 8, '세부활동제목8', '세부적인 활동을 적는 란.8'),
(9, 9, '세부활동제목9', '세부적인 활동을 적는 란.9'),
(10, 10, '세부활동제목10', '세부적인 활동을 적는 란.10');
# (3, 3, '세부활동제목3', '세부적인 활동을 적는 란.3');

INSERT INTO tbl_expense (expense_code, activity_code, expense_total_amount) VALUES
(1, 1, 1000),
(2, 2, 2500),
(3, 3, 1500),
(4, 4, 3200),
(5, 5, 2800),
(6, 6, 5000),
(7, 7, 4000),
(8, 8, 2300),
(9, 9, 1800),
(10, 10, 3000);

INSERT INTO tbl_expense_detail (expense_detail_code, expense_code, expense_detail_amount, member_code) VALUES
(1, 1, 500, 1),
(2, 1, 500, 2),
(3, 2, 1250, 3),
(4, 2, 1250, 4),
(5, 3, 750, 5),
(6, 3, 750, 6),
(7, 4, 1600, 7),
(8, 4, 1600, 8),
(9, 5, 1400, 9),
(10, 5, 1400, 10);

INSERT INTO tbl_travel_country (country_code, country_name) VALUES
(1, 'Korea'),
(2, 'Japan'),
(3, 'France'),
(4, 'USA'),
(5, 'Canada'),
(6, 'Germany'),
(7, 'Australia'),
(8, 'Brazil'),
(9, 'Italy'),
(10, 'India');

INSERT INTO tbl_population (travel_code, member_code, country_code, population_title, population_description, population_created_at, population_views, population_people, population_onoff) VALUES
(1, 1, 1, 'Korea Adventure', 'Join us for an exciting trip across Korea', '2024-01-01', 100, 5, 'Y'),
(2, 2, 2, 'Japan Discovery', 'Explore the beauty of Japan together', '2024-02-15', 200, 4, 'N'),
(3, NULL, 3, 'France Romance', 'Romantic getaway in France', '2024-03-10', 150, 2, 'Y'),
(4, 3, 4, 'USA Road Trip', 'Cross-country adventure in the USA', '2024-04-05', 300, 10, 'N'),
(5, 4, 5, 'Canada Nature Trek', 'Experience the wilderness of Canada', '2024-05-20', 250, 8, 'Y'),
(6, 5, 6, 'Germany History Tour', 'Dive deep into German culture', '2024-06-18', 180, 7, 'N'),
(7, NULL, 7, 'Australia Outback', 'Adventure in the Australian outback', '2024-07-25', 90, 3, 'Y'),
(8, 6, 8, 'Brazil Carnival', 'Experience the vibrant Carnival', '2024-08-12', 400, 15, 'N'),
(9, 7, 9, 'Italy Food Tour', 'Gastronomic trip through Italy', '2024-09-03', 270, 6, 'Y'),
(10, NULL, 10, 'India Spiritual Journey', 'Discover the spirituality of India', '2024-10-10', 320, 12, 'N');

INSERT INTO tbl_notice_category (notice_category_code, notice_category_name) VALUES
(1, 'General Notice'),
(2, 'Travel Tips'),
(3, 'Event Announcements'),
(4, 'Updates'),
(5, 'Safety Guidelines'),
(6, 'Promotions'),
(7, 'Member Stories'),
(8, 'Travel Deals'),
(9, 'Policy Changes'),
(10, 'Miscellaneous');

INSERT INTO tbl_notice (notice_code, notice_category_code, notice_title, notice_content, notice_created_at, member_code) VALUES
(1, 1, 'Welcome to the Travel Community', 'A warm welcome to all our new members!', '2024-01-01', 1),
(2, 2, 'Packing Tips for Your Next Trip', 'Check out our essential packing guide.', '2024-02-10', 2),
(3, 3, 'Upcoming Travel Fair', 'Join us at the biggest travel fair this summer.', '2024-03-05', NULL),
(4, 4, 'System Maintenance Notice', 'Scheduled maintenance on April 15th.', '2024-04-01', 3),
(5, 5, 'Safety Tips While Traveling', 'Important safety tips to remember.', '2024-05-12', 4),
(6, 6, 'Summer Sale Announcement', 'Exciting summer discounts available now!', '2024-06-20', NULL),
(7, 7, 'Share Your Travel Stories', 'We are looking for member stories.', '2024-07-05', 5),
(8, 8, 'Limited-Time Travel Deals', 'Book your trip before the deals expire.', '2024-08-18', 6),
(9, 9, 'Policy Updates on Bookings', 'Updates to our booking policies.', '2024-09-25', 7),
(10, 10, 'General Information', 'Find answers to common questions.', '2024-10-30', NULL);

INSERT INTO tbl_comment (comment_code, notice_code, member_code, comment_content, comment_created_at) VALUES
(1, 1, 1, 'Great announcement! Looking forward to it.', '2024-01-02'),
(2, 2, 2, 'Thanks for the packing tips, very helpful.', '2024-02-11'),
(3, 3, NULL, 'Can\'t wait for the travel fair!', '2024-03-06'),
(4, 4, 3, 'Noted about the maintenance. Thanks!', '2024-04-02'),
(5, 5, 4, 'Good safety tips. Very useful.', '2024-05-13'),
(6, 6, 5, 'Looking forward to the promotions!', '2024-06-21'),
(7, 7, NULL, 'I will definitely share my story soon.', '2024-07-06'),
(8, 8, 6, 'The travel deals are amazing!', '2024-08-19'),
(9, 9, 7, 'Policy updates are always good to know.', '2024-09-26'),
(10, 10, NULL, 'Thanks for the general information.', '2024-10-31');

INSERT INTO tbl_population_review (population_review_code, population_code, member_code, review_content, review_created_at) VALUES
(1, 1, 1, 'Had a fantastic experience on the Korea trip!', '2024-01-15'),
(2, 2, 2, 'Japan was beautiful, would recommend!', '2024-02-20'),
(3, 3, NULL, 'Romantic trip to France was unforgettable.', '2024-03-25'),
(4, 4, 3, 'USA road trip was a blast, lots of memories.', '2024-04-18'),
(5, 5, 4, 'Nature trekking in Canada was refreshing.', '2024-05-30'),
(6, 6, 5, 'Germany history tour was deeply insightful.', '2024-06-25'),
(7, 7, NULL, 'Outback adventure in Australia was unique.', '2024-07-30'),
(8, 8, 6, 'Carnival in Brazil was full of energy!', '2024-08-25'),
(9, 9, 7, 'Italian food tour was delicious and fulfilling.', '2024-09-15'),
(10, 10, NULL, 'India\'s spiritual journey was life-changing.', '2024-10-20');

-- 채팅방 테이블 더미 데이터
INSERT INTO tbl_chatroom (chatroom_code, chatroom_name, chatroom_created_at) VALUES
(1, 'General Discussion', '2024-01-05'),
(2, 'Travel Buddies', '2024-02-15'),
(3, 'Foodies Chat', '2024-03-10'),
(4, 'Tech Enthusiasts', '2024-04-20'),
(5, 'Photography Club', '2024-05-01'),
(6, 'Fitness Fanatics', '2024-06-18'),
(7, 'Book Lovers', '2024-07-12'),
(8, 'Pet Owners Corner', '2024-08-03'),
(9, 'Outdoor Adventures', '2024-09-22'),
(10, 'Movie Buffs', '2024-10-11');

-- 메시지 테이블 더미 데이터
INSERT INTO tbl_message (message_code, chatroom_code, member_code, message_content, message_sent_at) VALUES
(1, 1, 1, 'Welcome to the General Discussion chat!', '2024-01-05 10:00:00'),
(2, 1, 2, 'Hi everyone! How are you all doing?', '2024-01-05 10:05:00'),
(3, 2, 3, 'Anyone up for a trip to Japan next month?', '2024-02-16 09:30:00'),
(4, 2, NULL, 'Sounds interesting! I might join.', '2024-02-16 09:45:00'),
(5, 3, 4, 'What\'s your favorite street food?', '2024-03-10 12:15:00'),
(6, 3, 5, 'I love tacos! Especially the spicy ones.', '2024-03-10 12:20:00'),
(7, 4, 6, 'Has anyone tried the new VR headset?', '2024-04-20 16:00:00'),
(8, 5, NULL, 'Looking for tips on landscape photography.', '2024-05-01 14:45:00'),
(9, 6, 7, 'What\'s your workout routine these days?', '2024-06-18 07:30:00'),
(10, 7, NULL, 'Just finished a great book on self-growth!', '2024-07-12 18:20:00');
