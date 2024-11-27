DROP TABLE IF EXISTS tbl_get_badge CASCADE;
DROP TABLE IF EXISTS tbl_badge CASCADE;
DROP TABLE IF EXISTS tbl_point_reward CASCADE;
DROP TABLE IF EXISTS tbl_member_reviews CASCADE;
DROP TABLE IF EXISTS tbl_expense_detail CASCADE;
DROP TABLE IF EXISTS tbl_expense CASCADE;
DROP TABLE IF EXISTS tbl_activity CASCADE;
DROP TABLE IF EXISTS tbl_travel_day CASCADE;
DROP TABLE IF EXISTS tbl_population CASCADE;
DROP TABLE IF EXISTS tbl_travel_plans CASCADE;
DROP TABLE IF EXISTS tbl_comment CASCADE;
DROP TABLE IF EXISTS tbl_free_board CASCADE;
DROP TABLE IF EXISTS tbl_travel_reports CASCADE;
DROP TABLE IF EXISTS tbl_message CASCADE;

DROP TABLE IF EXISTS tbl_member_declare CASCADE;
DROP TABLE IF EXISTS tbl_member_reviews_text CASCADE;
DROP TABLE IF EXISTS tbl_travel_destination_favorite CASCADE;
DROP TABLE IF EXISTS tbl_restaurant_favorite CASCADE;

DROP TABLE IF EXISTS tbl_member_reviews_category CASCADE;

DROP TABLE IF EXISTS tbl_travel_city CASCADE;
DROP TABLE IF EXISTS tbl_travel_country CASCADE;

DROP TABLE IF EXISTS tbl_free_board_category CASCADE;
DROP TABLE IF EXISTS tbl_chatroom CASCADE;
DROP TABLE IF EXISTS tbl_message CASCADE;
DROP TABLE IF EXISTS tbl_member_role CASCADE;

DROP TABLE IF EXISTS tbl_notice CASCADE;

DROP TABLE IF EXISTS tbl_member CASCADE;
DROP TABLE IF EXISTS tbl_authority CASCADE;



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
    member_birth_date DATE NOT NULL COMMENT '생년월일',
    member_gender VARCHAR(2) NOT NULL COMMENT '성별',
    member_address VARCHAR(255) NOT NULL COMMENT '주소',
    member_level INT NOT NULL COMMENT '등급',
    member_certification VARCHAR(1) NOT NULL COMMENT '본인인증',
    profile_photo VARCHAR(255) NOT NULL COMMENT '프로필사진',
    CONSTRAINT pk_member_code PRIMARY KEY (member_code)
#     CONSTRAINT fk_authority_code FOREIGN KEY (authority_code) REFERENCES tbl_authority(authority_code)
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
    member_code INT NOT NULL COMMENT '회원식별코드'
#     CONSTRAINT fk_badge_code FOREIGN KEY (badge_code) REFERENCES tbl_badge(badge_code),
#     CONSTRAINT fk_member_code FOREIGN KEY (member_code) REFERENCES tbl_member(member_code)
) ENGINE=InnoDB COMMENT '획득배지';

-- 포인트 리워드 테이블
CREATE TABLE IF NOT EXISTS tbl_point_reward
(
#     point_reward_code INT AUTO_INCREMENT NOT NULL COMMENT '점수코드',
    member_code INT COMMENT '회원식별코드',
#     point_reward_reason VARCHAR(255) NOT NULL COMMENT '점수이유',
    point_reward_total_count INT COMMENT '평가사람수',
    point_reward_point INT COMMENT '포인트'
#     CONSTRAINT pk_point_reward_code PRIMARY KEY (point_reward_code),
#     CONSTRAINT fk_member_code1 FOREIGN KEY (member_code) REFERENCES tbl_member(member_code)
) ENGINE=InnoDB COMMENT '포인트 리워드';

-- 리뷰 카테고리 테이블
CREATE TABLE IF NOT EXISTS tbl_member_reviews_category
(
    review_category_code INT AUTO_INCREMENT NOT NULL COMMENT '리뷰카테고리코드',
    review_category_level INT COMMENT '카테고리등급',
    review_category_sub_code INT NOT NULL COMMENT '리뷰카테고리서브코드',
    member_review VARCHAR(100) NOT NULL COMMENT '내용',
    CONSTRAINT pk_review_category_code PRIMARY KEY (review_category_code)
) ENGINE=InnoDB COMMENT '후기카테고리';

-- 회원 후기 테이블
CREATE TABLE IF NOT EXISTS tbl_member_reviews
(
    member_review_code INT AUTO_INCREMENT NOT NULL COMMENT '후기코드',
    member_code INT COMMENT '회원식별코드',
    review_category_code INT NOT NULL COMMENT '리뷰카테고리코드',
    review_category_sub_code INT NOT NULL COMMENT '리뷰카테고리서브코드',
    member_rating_code int NOT NULL COMMENT '평가회원코드',
    member_review VARCHAR(100) NOT NULL COMMENT '리뷰내용',
    member_review_isvisible VARCHAR(1) NOT NULL COMMENT '화면표시여부',
    CONSTRAINT pk_member_review_code PRIMARY KEY (member_review_code)
#     CONSTRAINT fk_review_category_code FOREIGN KEY (review_category_code) REFERENCES tbl_member_reviews_category(review_category_code),
#     CONSTRAINT fk_member_code2 FOREIGN KEY (member_code) REFERENCES tbl_member(member_code)
) ENGINE=InnoDB COMMENT '회원후기';

# -- 리뷰 내용 테이블
# CREATE TABLE IF NOT EXISTS tbl_member_reviews_text
# (
#     review_category_code INT NOT NULL COMMENT '리뷰카테고리코드',
#     review_category_sub_code INT NOT NULL COMMENT '리뷰카테고리코드',
#     review_text VARCHAR(100) NOT NULL COMMENT '내용',
#     CONSTRAINT fk_review_category_code1 FOREIGN KEY (review_category_code) REFERENCES tbl_member_reviews_category(review_category_code)
# ) ENGINE=InnoDB COMMENT '후기내용';

-- 여행 일정 테이블
CREATE TABLE IF NOT EXISTS tbl_travel_plans
(
    travel_code INT AUTO_INCREMENT NOT NULL COMMENT '여행코드',
    member_code INT COMMENT '회원식별코드',
    travel_name VARCHAR(100) NOT NULL COMMENT '여행제목',
    travel_start_date TEXT NOT NULL COMMENT '여행시작',
    travel_end_date TEXT NOT NULL COMMENT '여행종료',
    travel_total_date VARCHAR(10) NOT NULL COMMENT '총일수',
    travel_destination VARCHAR(10) NOT NULL COMMENT '목적지',
    travel_onoff VARCHAR(1) NOT NULL COMMENT '여행완료여부',
    travel_isdeleted VARCHAR(1) NOT NULL COMMENT '삭제여부',
    CONSTRAINT pk_travel_code PRIMARY KEY (travel_code)
#     CONSTRAINT fk_member_code3 FOREIGN KEY (member_code) REFERENCES tbl_member(member_code)
) ENGINE=InnoDB COMMENT '여행일정';

-- 여행 일정별 일과 테이블
CREATE TABLE IF NOT EXISTS tbl_travel_day
(
    day_code INT AUTO_INCREMENT NOT NULL COMMENT '일과코드',
    travel_code INT NOT NULL COMMENT '여행코드',
    day_number INT NOT NULL COMMENT '여행차수',
    day_date INT NOT NULL COMMENT '해당 일',
    CONSTRAINT pk_day_code PRIMARY KEY (day_code)
#     CONSTRAINT fk_travel_code FOREIGN KEY (travel_code) REFERENCES tbl_travel_plans(travel_code)
) ENGINE=InnoDB COMMENT '일정별일과';

-- 활동 정보 테이블
CREATE TABLE IF NOT EXISTS tbl_activity
(
    activity_code INT AUTO_INCREMENT NOT NULL COMMENT '활동코드',
    day_code INT NOT NULL COMMENT '일과코드',
    activity_title VARCHAR(20) NOT NULL COMMENT '세부활동제목',
    activity_detail VARCHAR(100) NOT NULL COMMENT '세부활동',
    CONSTRAINT pk_activity_code PRIMARY KEY (activity_code)
#     CONSTRAINT fk_day_code FOREIGN KEY (day_code) REFERENCES tbl_travel_day(day_code)
) ENGINE=InnoDB COMMENT '활동정보';

-- 활동 비용 테이블
CREATE TABLE IF NOT EXISTS tbl_expense
(
    expense_code INT AUTO_INCREMENT NOT NULL COMMENT '활동금액코드',
    activity_code INT NOT NULL COMMENT '활동코드',
    expense_total_amount INT NOT NULL COMMENT '활동총비용',
    CONSTRAINT pk_expense_code PRIMARY KEY (expense_code)
#     CONSTRAINT fk_activity_code FOREIGN KEY (activity_code) REFERENCES tbl_activity(activity_code)
) ENGINE=InnoDB COMMENT '활동정보';


-- 활동 비용 세부 테이블
CREATE TABLE IF NOT EXISTS tbl_expense_detail
(
    expense_detail_code INT AUTO_INCREMENT NOT NULL COMMENT '활동금액세부코드',
    expense_code INT NOT NULL COMMENT '활동금액코드',
    expense_detail_amount INT NOT NULL COMMENT '세부활동비용',
    member_code INT COMMENT '회원식별코드',
    CONSTRAINT pk_expense_detail_code PRIMARY KEY (expense_detail_code)
#     CONSTRAINT fk_expense_code FOREIGN KEY (expense_code) REFERENCES tbl_expense(expense_code),
#     CONSTRAINT fk_member_code4 FOREIGN KEY (member_code) REFERENCES tbl_member(member_code)
) ENGINE=InnoDB COMMENT '세부활동정보';

-- 국가 테이블
CREATE TABLE IF NOT EXISTS tbl_travel_country
(
    country_code INT AUTO_INCREMENT NOT NULL COMMENT '국가코드',
    country_name VARCHAR(20) NOT NULL COMMENT '국가',
    CONSTRAINT pk_country_code PRIMARY KEY (country_code)
) ENGINE=InnoDB COMMENT '국가';

-- 도시 테이블
CREATE TABLE  IF NOT EXISTS tbl_travel_city
(
    city_code INT AUTO_INCREMENT NOT NULL COMMENT '도시코드',
    country_code INT NOT NULL COMMENT '국가코드',
    city_name VARCHAR(20) NOT NULL COMMENT '도시',
    city_iata_code VARCHAR(3)  NOT NULL COMMENT '코드',
    CONSTRAINT pk_city_code PRIMARY KEY (city_code)
#     CONSTRAINT fk_country_code2 FOREIGN KEY (country_code) REFERENCES tbl_travel_country(country_code)
) ENGINE=InnoDB COMMENT '도시';

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
    CONSTRAINT pk_population_code PRIMARY KEY (population_code)
#     CONSTRAINT fk_travel_code1 FOREIGN KEY (travel_code) REFERENCES tbl_travel_plans(travel_code),
#     CONSTRAINT fk_member_code5 FOREIGN KEY (member_code) REFERENCES tbl_member(member_code),
#     CONSTRAINT fk_country_code1 FOREIGN KEY (country_code) REFERENCES tbl_travel_country(country_code)
) ENGINE=InnoDB COMMENT '모집공고';

-- 공지사항 카테고리 테이블
CREATE TABLE IF NOT EXISTS tbl_free_board_category
(
    free_board_category_code INT AUTO_INCREMENT NOT NULL COMMENT '공지사항 카테고리 코드',
    free_board_category_name VARCHAR(100) NOT NULL COMMENT '공지사항 카테고리명',
    CONSTRAINT pk_free_board_category_code PRIMARY KEY (free_board_category_code)
) ENGINE=InnoDB COMMENT '공지사항 카테고리';

-- 공지사항 테이블
CREATE TABLE IF NOT EXISTS tbl_free_board
(
    free_board_code INT AUTO_INCREMENT NOT NULL COMMENT '공지사항 코드',
    free_board_category_code INT NOT NULL COMMENT '공지사항 카테고리 코드',
    free_board_title VARCHAR(255) NOT NULL COMMENT '공지사항 제목',
    free_board_content TEXT NOT NULL COMMENT '공지사항 내용',
    free_board_created_at DATE NOT NULL COMMENT '작성일자',
    member_code INT COMMENT '작성자 회원식별코드',
    free_board_isdeleted VARCHAR(1) NOT NULL COMMENT '삭제 여부',
    CONSTRAINT pk_free_board_code PRIMARY KEY (free_board_code)
#     CONSTRAINT fk_free_board_category_code FOREIGN KEY (free_board_category_code) REFERENCES tbl_free_board_category(free_board_category_code),
#     CONSTRAINT fk_member_code6 FOREIGN KEY (member_code) REFERENCES tbl_member(member_code)
) ENGINE=InnoDB COMMENT '공지사항';

-- 댓글 테이블
CREATE TABLE IF NOT EXISTS tbl_comment
(
    comment_code INT AUTO_INCREMENT NOT NULL COMMENT '댓글코드',
    free_board_code INT NOT NULL COMMENT '공지사항 코드',
    member_code INT COMMENT '작성자 회원식별코드',
    comment_content TEXT NOT NULL COMMENT '댓글내용',
    comment_created_at DATE NOT NULL COMMENT '작성일자',
    member_nickname TEXT NOT NULL COMMENT '닉네임',
    CONSTRAINT pk_comment_code PRIMARY KEY (comment_code)
#     CONSTRAINT fk_free_board_code FOREIGN KEY (free_board_code) REFERENCES tbl_free_board(free_board_code),
#     CONSTRAINT fk_member_code7 FOREIGN KEY (member_code) REFERENCES tbl_member(member_code)
) ENGINE=InnoDB COMMENT '댓글';

-- 여행 후기 테이블
CREATE TABLE IF NOT EXISTS tbl_travel_reports
(
    report_code INT AUTO_INCREMENT NOT NULL COMMENT '여행후기코드',
    member_code INT COMMENT '회원식별코드',
    report_title TEXT NOT NULL COMMENT '후기제목',
    report_content TEXT NOT NULL COMMENT '후기내용',
    report_start_date TEXT NOT NULL COMMENT '여행시작',
    report_end_date TEXT NOT NULL COMMENT '여행종료',
    report_destination TEXT NOT NULL COMMENT '여행지',
    report_created_at DATE NOT NULL COMMENT '작성일자',
    report_isdeleted VARCHAR(1) NOT NULL COMMENT '삭제여부',
    report_image_url TEXT NOT NULL COMMENT '이미지 URL',
    CONSTRAINT pk_report_code PRIMARY KEY (report_code)
#     CONSTRAINT fk_member_code8 FOREIGN KEY (member_code) REFERENCES tbl_member(member_code)
) ENGINE=InnoDB COMMENT '여행후기';

-- 채팅방 테이블
CREATE TABLE IF NOT EXISTS tbl_chatroom
(
    chatroom_code BIGINT AUTO_INCREMENT NOT NULL COMMENT '채팅방코드',
    population_code INT NOT NULL COMMENT '공고코드',
#     chatroom_name VARCHAR(255) NOT NULL COMMENT '채팅방명',
#     chatroom_created_at Timestamp NOT NULL COMMENT '생성일자',
    CONSTRAINT pk_chatroom_code PRIMARY KEY (chatroom_code)
) ENGINE=InnoDB COMMENT '채팅방';

-- 메시지 테이블
CREATE TABLE IF NOT EXISTS tbl_message
(
    message_code INT AUTO_INCREMENT NOT NULL COMMENT '메시지코드',
    chatroom_code INT NOT NULL COMMENT '채팅방코드',
    member_code INT COMMENT '작성자 회원식별코드',
    member_name TEXT NOT NULL COMMENT '작성자 이름',
    message_content TEXT NOT NULL COMMENT '메시지 내용',
    message_sent_at timestamp NOT NULL COMMENT '전송 시간',
    message_type text NOT NULL COMMENT '전송 타입',
    CONSTRAINT pk_message_code PRIMARY KEY (message_code)
#     CONSTRAINT fk_chatroom_code FOREIGN KEY (chatroom_code) REFERENCES tbl_chatroom(chatroom_code),
#     CONSTRAINT fk_member_code9 FOREIGN KEY (member_code) REFERENCES tbl_member(member_code)
) ENGINE=InnoDB COMMENT '메시지';

CREATE TABLE IF NOT EXISTS tbl_member_declare
(
    declare_code int AUTO_INCREMENT NOT NULL COMMENT '신고코드',
    member_code INT COMMENT '회원식별코드',
    declare_created_at DATE NOT NULL COMMENT '생성일자',
    declare_content TEXT NOT NULL COMMENT '신고내용',
    CONSTRAINT pk_declare_code PRIMARY KEY (declare_code)
#     CONSTRAINT fk_member_code10 FOREIGN KEY (member_code) REFERENCES tbl_member(member_code)
) ENGINE=InnoDB COMMENT '회원신고';

-- 여행지 저장 테이블
CREATE TABLE IF NOT EXISTS tbl_travel_destination_favorite
(
    favorite_code int AUTO_INCREMENT NOT NULL COMMENT '즐겨찾기 코드',
    member_code INT COMMENT '회원식별코드',
    api_link VARCHAR(2083) NOT NULL COMMENT 'API 링크',
    destination_name VARCHAR(50) NOT NULL COMMENT '여행지 이름',
    destination_photos VARCHAR(2083) NOT NULL COMMENT '여행지 사진',
    CONSTRAINT pk_favorite_code PRIMARY KEY (favorite_code),
    CONSTRAINT fk_member_code11 FOREIGN KEY (member_code) REFERENCES tbl_member(member_code)
) ENGINE=InnoDB COMMENT '여행지 저장';

-- 맛집 저장 테이블
CREATE TABLE IF NOT EXISTS tbl_restaurant_favorite
(
    favorite_code int AUTO_INCREMENT NOT NULL COMMENT '즐겨찾기 코드',
    member_code INT COMMENT '회원식별코드',
    api_link VARCHAR(2083) NOT NULL COMMENT 'API 링크',
    restaurant_name VARCHAR(50) NOT NULL COMMENT '맛집 이름',
    restaurant_photos VARCHAR(2083) NOT NULL COMMENT '맛집 사진',
    place_type VARCHAR(50) NOT NULL COMMENT '장소 타입',
    CONSTRAINT pk_favorite_code PRIMARY KEY (favorite_code)
#     CONSTRAINT fk_member_code12 FOREIGN KEY (member_code) REFERENCES tbl_member(member_code)
) ENGINE=InnoDB COMMENT '맛집 저장';

CREATE TABLE IF NOT EXISTS tbl_notice
(
    notice_code int AUTO_INCREMENT NOT NULL COMMENT '공지사항 코드',
    notice_name VARCHAR(100) NOT NULL COMMENT '공지사항 제목',
    notice_writer VARCHAR(100) NOT NULL COMMENT '공지사항 작성자',
    notice_created_at DATE NOT NULL COMMENT '생성일자',
    notice_views int NOT NULL COMMENT '조회수',
    notice_contents text NOT NULL COMMENT "공지사항 내용",
    notice_onoff VARCHAR(1) NOT NULL COMMENT '게시여부',
    CONSTRAINT pk_notice_code PRIMARY KEY (notice_code)
) ENGINE=InnoDB COMMENT '공지사항';

-- 권한 테이블 더미 데이터
INSERT INTO tbl_authority (authority_code, authority_name, authority_desc)
VALUES
    (1, 'Admin', '관리자 권한'),
    (2, 'User', '일반 사용자 권한');

-- 회원별 권한 더미 데이터
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (1, 1);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (1, 2);
INSERT INTO tbl_member_role (member_code, authority_code) VALUES (2, 2);

-- 회원 테이블 더미 데이터
INSERT INTO tbl_member (member_code, authority_code, member_name, member_nickname, member_mobile_number, member_created_at, member_id, member_password, member_birth_date, member_gender, member_address, member_level, profile_photo, member_certification) VALUES
(1, 1, '홍길동', '길동이', '010-1234-5678', '2024-01-01', 'user1', '$2a$10$IhDb9e29Zr.dCr7nPUA/0e0WShLAy.g6EEMZVBY7HF4U4GbCM/hem', '1990-05-15', '남', '서울특별시 강남구 역삼로 12길 25, 502호', 1, '06a0060ae2da4dffb9a8a440ba5d9c5e.PNG', 'Y'),
(2, 2, '김철수', '철수', '010-9876-5432', '2024-02-15', 'user2', '$2a$10$X0HHRqJiasK1lnV84b83guyl6Fuiy72dHz0gRqMWQbpFUG56CPwu6', '1988-08-22', '남', '경기도 수원시 영통구 광교로 230, 3층', 2, 'fcb3e0c8f94940cf99724d26e6020259.PNG', 'N'),
(3, 2, '박영희', '영희', '010-1111-2222', '2024-03-01', 'user3', '$2a$10$RaUrEJIDuNOc73mn.9TNF.t1E/0BiX4NJGuIGNg0oAVlOFset9CPe', '1995-04-10', '여', '서울특별시 마포구 합정동 366-16, 301호', 2, '8e2492fd197e42d5855ffbbb5142b4ed.PNG', 'Y'),
(4, 2, '이민호', '민호', '010-2222-3333', '2024-03-10', 'user4', '$2a$10$koZtyqOFbMZ/zuHGd1k.R.LAL4fVMfC60MuiVImjCLs7XHNkUu4DK', '1992-07-17', '남', '서울특별시 송파구 잠실로 25, 잠실빌딩 10층', 1, '58b3fd68f6074de2b33d4430fd29244b.PNG', 'Y'),
(5, 2, '최수지', '수지', '010-3333-4444', '2024-04-20', 'user5', '$2a$10$312n.LuQ2AAPF9LkNTNOHeM9V5USiBqA7B6yeQX6fzyCoBWYuO68y', '1993-02-28', '여', '경상북도 포항시 남구 동빈로 1길 17, 101호', 2, '7580adcf59d04240b7a16f6cf07bd34b.PNG', 'N'),
(6, 2, '정준하', '준하', '010-4444-5555', '2024-05-05', 'user6', '$2a$10$aZ5.qhA0dJ0n.PjaV.rOHeO2/H6Ksx1ZJyd5DAKO1kTqYq6hawMfi', '1987-12-11', '남', '대전광역시 유성구 봉명동 125, 유성빌딩 2층', 2, '7b91aee3ddec49a69a9b7d2849493f7f.PNG', 'Y'),
(7, 2, '강동원', '동원', '010-5555-6666', '2024-06-12', 'user7', '$2a$10$5w7VezVF36an5LwgCQAWxeCZfuIO1YrAGy4mZrU0TZVvPH/zLwj8a', '1991-01-25', '남', '부산광역시 해운대구 좌동로 33, 7층', 1, '8a4cd876df574970a565b41e47561080.PNG', 'N'),
(8, 2, '한소희', '소희', '010-6666-7777', '2024-07-08', 'user8', '$2a$10$140Sv/sKmV/TkD3MN3yzWe4iljEdAwy/79Bl8TYSFobiYCVc.ksAy', '1997-09-10', '여', '울산광역시 남구 삼산로 205, 4층', 2, 'c0a177a658b44f749699f91a23c47d8b.PNG', 'Y'),
(9, 2, '김유나', '유나', '010-7777-8888', '2024-08-16', 'user9', '$2a$10$gQoxt8swFds4eO0Du.lV1ukQLolDiYWabK9uV7AGsmcoRhBzyobYa', '1996-11-01', '여', '서울특별시 강북구 도봉로 189, 3층', 2, '053626c2d16f4814a5e81b842a115dc7.PNG', 'N'),
(10, 2, '이강현', '강현', '010-8888-9999', '2024-09-01', 'user10', '$2a$10$2H5vp7906QZQxicmDCTJeuDuxL4ye/0YthOlVStS5N/KQOYLUiun2', '1994-03-17', '남', '경기도 성남시 분당구 수내로 73, 5층', 1, '323a5df17163482d90a74f8198a4e4c6.PNG', 'Y');


-- 배지 테이블 더미 데이터
INSERT INTO tbl_badge (badge_code, badge_name, badge_criteria, badge_create_at) VALUES
(1, '초심자', '첫 가입 후 활동 시작', '2024-01-10'),
(2, '활동가', '활동 10회 이상', '2024-02-10');

-- 배지 획득 테이블 더미 데이터
INSERT INTO tbl_get_badge (badge_code, member_code) VALUES
(1, 1),
(2, 2);

-- 포인트 리워드 테이블 더미 데이터
INSERT INTO tbl_point_reward (member_code, point_reward_total_count, point_reward_point) VALUES
(1, 2, 8.5),
(2, 8, 30);

-- 리뷰 카테고리 테이블 더미 데이터
INSERT INTO tbl_member_reviews_category (review_category_code, review_category_level, review_category_sub_code, member_review) VALUES
(1, 1, 1, '매우 친절합니다.1'),
(2, 1, 2, '매우 친절합니다.2'),
(3, 1, 3, '매우 친절합니다.3'),
(4, 1, 4, '매우 친절합니다.4'),
(5, 1, 5, '매우 친절합니다.5'),
(6, 2, 6, '친절합니다.1'),
(7, 2, 7, '친절합니다.2'),
(8, 2, 8, '친절합니다.3'),
(9, 2, 9, '친절합니다.4'),
(10,2, 10,  '친절합니다.5'),
(11,3, 11,  '불친절합니다.1'),
(12,3, 12,  '불친절합니다.2'),
(13,3, 13,  '불친절합니다.3'),
(14,3, 14,  '불친절합니다.4'),
(15,3, 15,  '불친절합니다.5');

-- 회원 후기 테이블 더미 데이터
INSERT INTO tbl_member_reviews (member_review_code, member_code, review_category_code, review_category_sub_code, member_rating_code, member_review, member_review_isvisible) VALUES
(1, 1, 1, 1, 2, '매우 친절합니다.', 'Y'),
(2, 2, 2, 6, 3, '여행 동반자로 추천합니다.', 'Y'),
(3, 2, 3, 15, 1, '여행 동반자로 비추천합니다.', 'Y'),
(NULL, 1, 2, 6, 2, '여행 동반자로 비추천합니다.', 'Y'),
(NULL, 1, 1, 2, 3, '경로를 잘 압니다.', 'Y'),
(NULL, 1, 3, 13, 3, '말이 많습니다.', 'Y');

# INSERT INTO tbl_member_reviews_text (review_category_code, review_category_sub_code, review_text) VALUES

-- 여행 일정 테이블 더미 데이터
INSERT INTO tbl_travel_plans (travel_code, member_code, travel_name, travel_start_date, travel_end_date, travel_total_date, travel_destination, travel_onoff, travel_isdeleted) VALUES
(1, 1, '유럽 여행', '2024-04-01', '2024-04-14', '14일', '파리', 'N','N'),
(2, 2, '일본 도쿄 여행', '2024-05-05', '2024-05-10', '6일', '도쿄', 'Y','N'),
(3, 3, '미국 뉴욕 여행', '2024-06-01', '2024-06-10', '10일', '뉴욕', 'N','N'),
(4, 4, '호주 시드니 여행', '2024-07-10', '2024-07-17', '8일', '시드니', 'Y','N'),
(5, 5, '태국 방콕 여행', '2024-08-15', '2024-08-20', '6일',  '방콕', 'N','N'),
(6, 6, '이탈리아 로마 여행', '2024-09-01', '2024-09-10', '10일', '로마', 'Y','N'),
(7, 7, '그리스 아테네 여행', '2024-10-05', '2024-10-12', '8일', '아테네', 'N','N'),
(8, 8, '영국 런던 여행', '2024-11-10', '2024-11-15', '6일', '런던', 'Y','N'),
(9, 9, '스페인 바르셀로나 여행', '2024-12-01', '2024-12-08', '8일', '바르셀로나', 'N','N'),
(10, 10, '캐나다 토론토 여행', '2025-01-10', '2025-01-20', '11일', '토론토', 'Y','N');

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
(1, 1, '아침식사', '고기구워먹느라 50000원씀'),
(2, 1, '카페', '갬성카페가서 커피먹느라 25000원씀'),
(3, 1, '전시회', '입장권으로 15000원씀'),
(4, 1, '길거리음식', '길거리음식 사먹느라 32000원씀'),
(5, 2, '세부활동제목5', '세부적인 활동을 적는 란.5'),
(6, 2, '세부활동제목6', '세부적인 활동을 적는 란.6'),
(7, 3, '세부활동제목7', '세부적인 활동을 적는 란.7'),
(8, 3, '세부활동제목8', '세부적인 활동을 적는 란.8'),
(9, 3, '세부활동제목9', '세부적인 활동을 적는 란.9'),
(10, 10, '세부활동제목10', '세부적인 활동을 적는 란.10');
# (3, 3, '세부활동제목3', '세부적인 활동을 적는 란.3');

INSERT INTO tbl_expense (expense_code, activity_code, expense_total_amount) VALUES
(1, 1, 50000),
(2, 2, 25000),
(3, 3, 15000),
(4, 4, 32000),
(5, 5, 28000),
(6, 6, 50000),
(7, 7, 40000),
(8, 8, 23000),
(9, 9, 18000),
(10, 10, 30000);

INSERT INTO tbl_expense_detail (expense_detail_code, expense_code, expense_detail_amount, member_code) VALUES
(1, 1, 0, 1),
(2, 1, 0, 2),
(3, 1, 54000, 3),
(4, 2, 0, 1),
(5, 2, 25000, 2),
(6, 2, 0, 3),
(7, 3, 0, 1),
(8, 3, 0, 2),
(9, 3, 15000, 3),
(10, 4, 16000, 1),
(11, 4, 0, 2),
(12, 4, 16000, 3);

INSERT INTO tbl_travel_country (country_code, country_name) VALUES
(1, '대한민국'),
(2, '일본'),
(3, '베트남'),
(4, '태국'),
(5, '필리핀'),
(6, '싱가포르'),
(7, '말레이시아'),
(8, '인도네시아'),
(9, '몰디브'),
(10, '대만'),
(11, '홍콩'),
(12, '중국'),
(13, '몽골'),
(14, '미국'),
(15, '호주'),
(16, '이탈리아'),
(17, '스페인'),
(18, '프랑스'),
(19, '영국'),
(20, '스위스'),
(21, '체코'),
(22, '헝가리'),
(23, '독일'),
(24, '캐나다');

INSERT INTO tbl_travel_city (city_code, country_code, city_name, city_iata_code) VALUES
-- 대한민국
(NULL, 1, '서울', 'ICN'),
(NULL, 1, '제주', 'CJU'),
(NULL, 1, '부산', 'PUS'),
(NULL, 1, '광주', 'KWJ'),
(NULL, 1, '청주', 'CJJ'),
(NULL, 1, '대구', 'TAE'),
(NULL, 1, '여수', 'RSU'),
(NULL, 1, '양양', 'YNY'),
(NULL, 1, '포항', 'KPO'),
(NULL, 1, '군산', 'KUV'),
-- 일본
(NULL, 2, '도쿄', 'HND'),
(NULL, 2, '오사카', 'KIX'),
(NULL, 2, '후쿠오카', 'FUK'),
(NULL, 2, '오키나와', 'OKA'),
(NULL, 2, '삿포로', 'CTS'),
(NULL, 2, '나고야', 'NGO'),
-- 동남아시아 (베트남, 태국, 필리핀 등)
(NULL, 3, '다낭', 'DAD'),
(NULL, 3, '나트랑', 'CXR'),
(NULL, 3, '푸꾸옥', 'PQC'),
(NULL, 3, '호치민', 'SGN'),
(NULL, 3, '하노이', 'HAN'),
(NULL, 4, '방콕', 'BKK'),
(NULL, 4, '치앙마이', 'CNX'),
(NULL, 4, '푸켓', 'HKT'),
(NULL, 5, '세부', 'CEB'),
(NULL, 5, '보라카이', 'MPH'),
(NULL, 5, '보홀', 'TAG'),
(NULL, 6, '싱가포르', 'SIN'),
(NULL, 7, '코타키나발루', 'BKI'),
(NULL, 8, '발리', 'DPS'),
(NULL, 9, '말레', 'MLE'),
-- 동북아시아 (대만, 홍콩, 중국, 몽골)
(NULL, 10, '타이베이', 'TPE'),
(NULL, 10, '가오슝', 'KHH'),
(NULL, 11, '홍콩', 'HKG'),
(NULL, 12, '베이징', 'PEK'),
(NULL, 12, '상하이', 'PVG'),
(NULL, 13, '울란바토르', 'ULN'),
-- 대양주 (미국, 호주, 뉴질랜드)
(NULL, 14, '괌', 'GUM'),
(NULL, 14, '사이판', 'SPN'),
(NULL, 15, '시드니', 'SYD'),
(NULL, 15, '멜버른', 'MEL'),
(NULL, 16, '오클랜드', 'AKL'),
(NULL, 15, '브리즈번', 'BNE'),
(NULL, 15, '퍼스', 'PER'),
-- 유럽 (이탈리아, 스페인, 프랑스, 영국 등)
(NULL, 16, '로마', 'FCO'),
(NULL, 17, '바르셀로나', 'BCN'),
(NULL, 17, '마드리드', 'MAD'),
(NULL, 18, '파리', 'CDG'),
(NULL, 19, '런던', 'LHR'),
(NULL, 20, '취리히', 'ZRH'),
(NULL, 21, '프라하', 'PRG'),
(NULL, 22, '부다페스트', 'BUD'),
(NULL, 23, '프랑크푸르트', 'FRA'),
-- 미주 (미국, 캐나다)
(NULL, 14, '호놀룰루', 'HNL'),
(NULL, 14, '뉴욕', 'JFK'),
(NULL, 14, '로스앤젤레스', 'LAX'),
(NULL, 14, '라스베가스', 'LAS'),
(NULL, 14, '샌프란시스코', 'SFO'),
(NULL, 14, '시카고', 'ORD'),
(NULL, 14, '시애틀', 'SEA'),
(NULL, 14, '애틀랜타', 'ATL'),
(NULL, 24, '밴쿠버', 'YVR'),
(NULL, 24, '토론토', 'YYZ');

INSERT INTO tbl_population (travel_code, member_code, country_code, population_title, population_description, population_created_at, population_views, population_people, population_onoff) VALUES
(1, 1, 1, 'Korea Adventure', 'Join us for an exciting trip across Korea', '2024-01-01', 100, 5, 'Y'),
(2, 2, 2, 'Japan Discovery', 'Explore the beauty of Japan together', '2024-02-15', 200, 4, 'N'),
(3, 3, 3, 'France Romance', 'Romantic getaway in France', '2024-03-10', 150, 2, 'Y'),
(4, 3, 4, 'USA Road Trip', 'Cross-country adventure in the USA', '2024-04-05', 300, 10, 'N'),
(5, 4, 5, 'Canada Nature Trek', 'Experience the wilderness of Canada', '2024-05-20', 250, 8, 'Y'),
(6, 5, 6, 'Germany History Tour', 'Dive deep into German culture', '2024-06-18', 180, 7, 'N'),
(7, 6, 7, 'Australia Outback', 'Adventure in the Australian outback', '2024-07-25', 90, 3, 'Y'),
(8, 6, 8, 'Brazil Carnival', 'Experience the vibrant Carnival', '2024-08-12', 400, 15, 'N'),
(9, 7, 9, 'Italy Food Tour', 'Gastronomic trip through Italy', '2024-09-03', 270, 6, 'Y'),
(10, 2, 10, 'India Spiritual Journey', 'Discover the spirituality of India', '2024-10-10', 320, 12, 'N');

INSERT INTO tbl_free_board_category (free_board_category_code, free_board_category_name) VALUES
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

INSERT INTO tbl_free_board (free_board_code, free_board_category_code, free_board_title, free_board_content, free_board_created_at, member_code, free_board_isdeleted) VALUES
(1, 1, 'Welcome to the Travel Community', 'A warm welcome to all our new members!', '2024-01-01', 1, 'N'),
(2, 2, 'Packing Tips for Your Next Trip', 'Check out our essential packing guide.', '2024-02-10', 2, 'N'),
(3, 3, 'Upcoming Travel Fair', 'Join us at the biggest travel fair this summer.', '2024-03-05', 3, 'N'),
(4, 4, 'System Maintenance Notice', 'Scheduled maintenance on April 15th.', '2024-04-01', 4, 'N'),
(5, 5, 'Safety Tips While Traveling', 'Important safety tips to remember.', '2024-05-12', 5, 'N'),
(6, 6, 'Summer Sale Announcement', 'Exciting summer discounts available now!', '2024-06-20', 6, 'N'),
(7, 7, 'Share Your Travel Stories', 'We are looking for member stories.', '2024-07-05', 7, 'N'),
(8, 8, 'Limited-Time Travel Deals', 'Book your trip before the deals expire.', '2024-08-18', 8, 'N'),
(9, 9, 'Policy Updates on Bookings', 'Updates to our booking policies.', '2024-09-25', 9, 'N'),
(10, 10, 'General Information', 'Find answers to common questions.', '2024-10-30', 10, 'N');

INSERT INTO tbl_comment (comment_code, free_board_code, member_code, comment_content, comment_created_at, member_nickname) VALUES
(1, 1, 1, 'Great announcement! Looking forward to it.', '2024-01-02', '짱구'),
(2, 2, 2, 'Thanks for the packing tips, very helpful.', '2024-02-11', '철수'),
(3, 3, 3, 'Can\'t wait for the travel fair!', '2024-03-06', '영희'),
(4, 4, 4, 'Noted about the maintenance. Thanks!', '2024-04-02', '맹구'),
(5, 5, 5, 'Good safety tips. Very useful.', '2024-05-13', '유리'),
(6, 6, 6, 'Looking forward to the promotions!', '2024-06-21', '짱수'),
(7, 7, 7, 'I will definitely share my story soon.', '2024-07-06', '수지'),
(8, 8, 8, 'The travel deals are amazing!', '2024-08-19', '흰둥이'),
(9, 9, 9, 'Policy updates are always good to know.', '2024-09-26', '미선씨'),
(10, 10, 10, 'Thanks for the general information.', '2024-10-31', '토란');

INSERT INTO tbl_travel_reports (member_code, report_title, report_content, report_start_date, report_end_date, report_destination, report_created_at, report_isdeleted, report_image_url) VALUES
(1,  '환상적인 제주 여행', '제주의 푸른 바다와 아름다운 자연을 만끽한 3박 4일 여행기입니다. 다양한 맛집도 소개해드릴게요.','2024-04-01', '2024-04-14',
'제주도', '2024-10-01', 'N', 'BackGroundImage.jpg'),

(2, '도쿄의 밤은 낮보다 아름답다',
'도쿄 여행에서 느낀 감동적인 야경과 먹거리를 소개합니다. 쇼핑과 맛집 탐방이 즐거웠던 여행이었습니다.','2024-04-01', '2024-04-14',
'도쿄', '2024-10-02', 'N', 'BackGroundImage.jpg'),

(3, '발리에서의 휴양',
'발리의 해변에서 즐긴 여유로운 하루. 서핑과 스파로 몸과 마음을 힐링했어요.','2024-04-01', '2024-04-14',
'발리', '2024-10-03', 'N', 'BackGroundImage.jpg'),

(4, '뉴욕 브로드웨이 투어',
'뉴욕의 브로드웨이 뮤지컬을 관람하며 문화와 예술을 만끽한 여행기입니다.','2024-04-01', '2024-04-14',
'뉴욕', '2024-10-04', 'N', 'BackGroundImage.jpg'),

(5, '파리에서의 낭만적인 하루',
'에펠탑과 루브르 박물관을 다녀오고, 노트르담 성당 앞에서 찍은 사진도 공유합니다.','2024-04-01', '2024-04-14',
'파리', '2024-10-05', 'N', 'BackGroundImage.jpg'),

(6, '로마에서 만난 이탈리아의 매력',
'콜로세움과 바티칸 투어로 가득 찬 하루, 이탈리아의 매력에 빠졌던 여행이었어요.','2024-04-01', '2024-04-14',
'로마', '2024-10-06', 'N', 'BackGroundImage.jpg'),

(7, '싱가포르의 마리나 베이 탐방',
'마리나 베이 샌즈에서 보는 야경이 정말 인상 깊었습니다. 다양한 관광지도 함께 소개할게요.','2024-04-01', '2024-04-14',
'싱가포르', '2024-10-07', 'N', 'BackGroundImage.jpg'),

(8, '호주 골드코스트 서핑 도전기',
'호주의 해변에서 서핑을 배우며 즐긴 자유로운 여행기입니다.','2024-04-01', '2024-04-14',
'골드코스트', '2024-10-08', 'N', 'BackGroundImage.jpg'),

(9, '스위스 알프스 트레킹',
'스위스 알프스를 트레킹하며 본 경치가 정말 환상적이었어요. 자연과 함께한 시간이 기억에 남습니다.','2024-04-01', '2024-04-14',
'스위스', '2024-10-09', 'N', 'BackGroundImage.jpg'),

(10, '태국 방콕의 숨은 명소 탐방',
'방콕의 잘 알려지지 않은 명소들을 다녀왔습니다. 맛있는 길거리 음식도 함께 소개합니다.','2024-04-01', '2024-04-14',
'방콕', '2024-10-10', 'N', 'BackGroundImage.jpg');


-- 채팅방 테이블 더미 데이터
INSERT INTO tbl_chatroom (chatroom_code, population_code) VALUES
(null, 1),
(null, 2),
(null, 3),
(null, 4),
(null, 5),
(null, 6),
(null, 7),
(null, 8);

-- 메시지 테이블 더미 데이터
INSERT INTO tbl_message (message_code, chatroom_code, member_code, member_name, message_content, message_sent_at, message_type) VALUES
(1, 1, 1, '홍길동', 'Welcome to the General Discussion chat!', '2024-01-05 10:00:00', 'CHAT'),
(2, 1, 3, '박영희', 'Hi everyone! How are you all doing?', '2024-01-05 10:05:00', 'CHAT'),
(3, 1, 2, '김철수', 'Anyone up for a trip to Japan next month?', '2024-02-16 09:30:00', 'CHAT'),
(4, 1, 1, '홍길동', 'Sounds interesting! I might join.', '2024-02-16 09:45:00', 'CHAT'),
(5, 1, 3, '박영희', 'What\'s your favorite street food?', '2024-03-10 12:15:00', 'CHAT'),
(6, 1, 4, '이민호', 'I love tacos! Especially the spicy ones.', '2024-03-10 12:20:00', 'CHAT'),
(7, 1, 2, '김철수', 'Has anyone tried the new VR headset?', '2024-04-20 16:00:00', 'CHAT'),
(8, 1, 1, '홍길동', 'Looking for tips on landscape photography.', '2024-05-01 14:45:00', 'CHAT');

INSERT INTO tbl_member_declare (declare_code, member_code, declare_created_at, declare_content) VALUES
(1, 1, '2024-10-09', '욕을 많이 합니다.'),
(2, 2, '2024-10-19', '예의가 없습니다.'),
(3, 3, '2024-12-09', '약속장소에 늦습니다.');

-- 여행지 저장 테이블 더미 데이터
INSERT INTO tbl_travel_destination_favorite (member_code, api_link, destination_name, destination_photos) VALUES
(1, 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=Paris&key=AIzaSyBdC2C4NxgvxtnU5i2NY7WiREj1o5zQ4X4&pagetoken', '파리', 'AdDdOWpMvDIjfI2n-1HEQ_fgkzsNiynpwua9c9DDQP5dBxiYnLqKaISWgbL033rIvQuxDAqBpbIcA5RyHMTuijkFj3cNdeksjcDKG6UtavX8ZIDUMXvJ_vQwBMGHUBXCcNrGe86LOhz0Kn0MtIeYqGyeOOQPRfROo_j-j9riiWmM9V1tucpr'),
(2, 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=Seoul&key=AIzaSyBdC2C4NxgvxtnU5i2NY7WiREj1o5zQ4X4&pagetoken', '서울', 'AdDdOWoEfjIkVZQajmhvqeQBdmZPDNYQuuKW1xIXoWwCTnB-HFSVHXLoFs2ZIyPT1WDR1uX0WkrnzvdLzWKDyJYAV4CUvqpC-eOr7yh9Tw9mqA3xAJcIL-0QodIdev-XeZPLxY0fCqnLD_FeFcD_OUH2VlHy9u35WJujRrRTJxIyNkKWYwlI'),
(3, 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=tokyo&key=AIzaSyBdC2C4NxgvxtnU5i2NY7WiREj1o5zQ4X4&pagetoken', '도쿄', 'AdDdOWrQKFJUl6N3prsFIQ9MgIrhbcqy5INFy-KbND-KEtC4qTABx6AlgMudVomsb8U2yCS9ONuso4o3EUM9F3Cw_GB2llA_PPLIqMle6Uh8dSgJRDeziei3GU72W7ZCSQaj5fWzixk5URCplrcwRhdKMdGjRz_X--RDIF8qMzc01RvRr0RY'),
(4, 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=tyipei&key=AIzaSyBdC2C4NxgvxtnU5i2NY7WiREj1o5zQ4X4&pagetoken', '타이페이', 'AdDdOWqY6JdeWLyoDVNAlR-1Cf_0G0kjhEwnTrg-Q0LWlcQjuaUIRkaY2HWCyFjhm29T5-Zp61BenoDdKVBqrXiKhN2LpTSFOrzOZJxVdZKsZ1knhHgV-j5E5lHpPwIrRjK_Md1eq-BNmtFBo6daeaGi4TtWaZ20N6aRFNX3uaYjHNsGBhF9'),
(5, 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=london&key=AIzaSyBdC2C4NxgvxtnU5i2NY7WiREj1o5zQ4X4&pagetoken', '런던', 'AdDdOWqvpIEsG8lR2G43x3hFue8McV0OGmcWbWn1NbHlOiWqQXnoINGyuuAAOhbwxob4wDx89ot8N7CT7NjRuawS3_4WWv8iuVpVHHyGIltW9BTaP3uP5FmUCRT4RYbm27vPRDJnlvauta0cv_RMAPjnUNNnUJr2f9eyUtclaO5YcWsusrUd'),
(6, 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=bangkok&key=AIzaSyBdC2C4NxgvxtnU5i2NY7WiREj1o5zQ4X4&pagetoken', '방콕', 'AdDdOWr3Pb4M7pfKXKyTfuSUD3ahdXW9opG0J-HL5FYAZlP5lyNLuGNbWxZkz01BUK__Zd9Nz9BvkAURV0kUbOnJXcaVWw6cgjdNtCE_DoRru3LMHt-vuPgGA9VX9E-l7TLpeaahPuJtJ2UVvY-O8pgjWNFgVxdMVBweiyERyrJW6CgCbQOJ'),
(7, 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=osaka&key=AIzaSyBdC2C4NxgvxtnU5i2NY7WiREj1o5zQ4X4&pagetoken', '오사카', 'AdDdOWpnnqPdzRL73YqDcL6qJ7CUC00cVFYXNcIc_dCHTnd4komyEl4ewWBNsB87-II0xmk0RgRfXt9Qo5put19XDFYkuQGAL_-k0ecLNlygI43_Xu4qQ8Uwwm-QmNRfZIXD_W_omsRGqbfwRm3GGkcSSXbQ3-JHwzHHbrU7pUk0uRB9aL50'),
(8, 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=hongkong&key=AIzaSyBdC2C4NxgvxtnU5i2NY7WiREj1o5zQ4X4&pagetoken', '홍콩', 'AdDdOWrGnvcoho3jRCiMFzNIJ_Bm2RomNZVuigNSbiFmK1vU89nbBogtli2jjsXG_QuDj9hca8YR9wouOs8zt1IwvIVrCn9vQDa9Ay_EfnXlrqQAnDjgNfxMIpeTjs4lLknKCWFvHo5oKO2wCMN6pg_ucKJ0gNRH02cBSgse14TFmuE3p1oL'),
(9, 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=phuquoc&key=AIzaSyBdC2C4NxgvxtnU5i2NY7WiREj1o5zQ4X4&pagetoken', '푸꾸옥', 'AdDdOWqOaWhfGYWbdTI8FhEP1_4qEJ8NTuaGa1f9TaxqrhaGDp6Xp25FYUTCBOEhkOCbBuNfS5yTONnvrQge9QyWauAS_AnnViOn5GKgAxoodUdkAjOUgi7NOo7MdNfYisB0ZQz6MwRUKMXvOASN0Fdu63j_p_N5WcyEKWys7xuk1L8Vkn1m'),
(10, 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=amsterdam&key=AIzaSyBdC2C4NxgvxtnU5i2NY7WiREj1o5zQ4X4&pagetoken', '암스테르담', 'AdDdOWqdbB95qgJ-R3ipw4COAge-vwisOpQQ0QGsrMXI-fYXe6SmdgEotAGsWU3eLvLK2B_Xdh9vY2_ferbv2O-6h_Rx4CUWsEloyNYq5jVknR6x8OuzBZ6tWt1bddlui3C9YCfajdsZeQfzZokqrZ_HcJourVKCIYOyqSMeGmiMfhQdCuVj');

-- 맛집 저장 테이블 더미 데이터
INSERT INTO tbl_restaurant_favorite (member_code, api_link, restaurant_name, restaurant_photos, place_type) VALUES
(1, 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=Myeongdong Restaurant The Sic-ddang&key=AIzaSyBdC2C4NxgvxtnU5i2NY7WiREj1o5zQ4X4','Myeongdong Restaurant The Sic-ddang', 'AdDdOWpTxKkyJJ_fOsXTc-1naqkWyjFD1sLuDxbqYmHyXtSvuv8CfHTdpeCKTCbDKXV1k2QHPzfUSMkYE62MuSvPyfJUGimer3PhT7Sxql6a3uNOyPedSfME1w9Vx1z86R9zGBiqbYLNA-EkBHEFOWsbuXfYVpCUF4PAWQYEuUR2h6r8vtA', 'restaurant'),
(2, 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=The Ninth Gate&key=AIzaSyBdC2C4NxgvxtnU5i2NY7WiREj1o5zQ4X4','The Ninth Gate', 'AdDdOWpkQ0-9rV-JEAAPP9-zbzATA4gNWuMZWBhCvH6mhTjr58z_y4gwKNx30AApN5T-SPRm4dsI_0O1-ANK4xLdpQO4caxmRewpXkwzZzFYI0U4zdsTgMOuJ9ZEFBiBdxFD9VkFN_mNFQDBKdB89_bSeNU7kqLjAOKam6SHkmuhreAo1fl0', 'restaurant'),
(3, 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=Wangbijib Myeongdong Center store&key=AIzaSyBdC2C4NxgvxtnU5i2NY7WiREj1o5zQ4X4','Wangbijib Myeongdong Center store', 'AdDdOWqBt2GF88lt-cm31kMY-QtfGf-VUM0jVOlyXI_x2CYXU1dOJcv0LayquBqyMUSLafyeO2OtmjNF51w2SrTPLkXc0nfJvFfEzfCzc9hY_8hCQLESMswA6v7uPebt-yMDHkpaYHa4NUYHJy49l2jIKd9wEkG3K9gxJxYju3b7NcX_4owf', 'restaurant'),
(4, 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=Seoul Dining&key=AIzaSyBdC2C4NxgvxtnU5i2NY7WiREj1o5zQ4X4','Seoul Dining', 'AdDdOWpzVHBOz7GqCHZVx_mJp0kwCdCyr5m7S-R4EcyJK2DXmUFZZ3VuswS6XLc1ygwHIHZ-cXscVLMt0HRs3NsQqPZynOV4Vdiz2lqhMJGS7Ja--OcHvUNCY8Y-m1Glg-Czn5RnsMqltAZ5wk9j0GTLFnNwe-m1XRSAJD6Zdes3_pSe9FXA', 'restaurant'),
(5, 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=Jyoti Indian Restaurant Chungmuro&key=AIzaSyBdC2C4NxgvxtnU5i2NY7WiREj1o5zQ4X4','Jyoti Indian Restaurant Chungmuro', 'AdDdOWrZ7uEBtGyUK21dEcuhuXAiqoJAXepe-KwCJKAcyCxjoldkx3ChP_SJyRVJcv-Bw5CAETYGyytju7rW3KgsWeVqia7ypBmbgFRo9gl7kwSCxM-jpOOq4uL-qY5C2S6XUXOc9fMPLw2aj6ap45eBjeh4r9GNZwfOJWMa5k4m-lvCrf9T', 'restaurant'),
(6, 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=Daol Charcoal Grilling (Korean BBQ Daol)&key=AIzaSyBdC2C4NxgvxtnU5i2NY7WiREj1o5zQ4X4','Daol Charcoal Grilling (Korean BBQ Daol)', 'AdDdOWqRa3r5uEr8ZzkY7oaS5SElSq78y0PFstLIeIyw8cnWY_hA5PLzOo3gmxlLN6INZKf9trP1Kt3xyizyR9rCOt7oUcQXUBLcqQAr7JkFJdC6dz_r4W2VKGClq7Blh8FoSIcbyxJEPJ4oxYJsaOG-uUPxlS3r-XWv3H2RHMnhU3NlYyYl', 'restaurant'),
(7, 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=이조식당&key=AIzaSyBdC2C4NxgvxtnU5i2NY7WiREj1o5zQ4X4','이조식당', 'AdDdOWoIXJYLwqkmawzav6uBe0crm2m7JYX4x3scVwlEjJ-XXxkwAkaDOFdJm6LXIOEawTLjKAwK9-t5j21mQo8bmehWSsq8a-VuA7P3c70-1yPYC3WGCvJGGbbPqnPoScGU-_vcd9by9LVaKhhqlE4biuLuvv3WjatMANAPODWD3OyhXixw', 'restaurant'),
(8, 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=The Green Table&key=AIzaSyBdC2C4NxgvxtnU5i2NY7WiREj1o5zQ4X4','The Green Table', 'AdDdOWoZ2kq1Xx5cvIPhey6b6va5nZDTpF7l5mffPszYDe6YT6rITC_lJ608lDutG4oDTVrqp-rhpTPNgHcnUkGdycGz-VXvGk4tvOjwTP2qR_EY4K52Ii2fmCKhpP6hecevA3g-ItmyEaRtcT4mbMEY-oywlYCB6AHeIUUI2zKxj10XN_7l', 'restaurant'),
(9, 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=MUGUNGHWA&key=AIzaSyBdC2C4NxgvxtnU5i2NY7WiREj1o5zQ4X4','MUGUNGHWA', 'AdDdOWq-2NX9L3BNpek1bW4Si3KSO7dQPowD2U9K2yAzIVTHYqSIkyAVwcmi_js76uQIsAdtOAFalV8Gj5o1UzQY4q5GmcBuKOzT3zlJjiq-gJ_gix644H9tNx3dpnGLPCTeG8LX_qRIm6p04C-3x2c2aXVT-7wPB5NknkESFJYMCM-UWrfu', 'restaurant'),
(10, 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=Hangong-Gan&key=AIzaSyBdC2C4NxgvxtnU5i2NY7WiREj1o5zQ4X4','Hangong-Gan', 'AdDdOWr-AKExDw6YkOuMq4qVFJLuI2uA8Xax9MdpCVCx-c2udy0d3TJnT6rFSklCdozVqOvvvk7NDQCPRmi3eVshQ_7g3vCHMa4GXLFyFPmOUI0TGefjRfraQBhl-wSqxhyuWpH3LWKa4Bx4WBbz0qg75pT1eSaTO_Nrp4RMNsgmDc8KoWKg', 'restaurant');

INSERT INTO tbl_notice
(notice_name, notice_writer, notice_created_at, notice_views, notice_contents, notice_onoff)
VALUES
    ('공지사항 1', '관리자', '2024-01-01', 150, '공지사항 내용 1입니다.', 'Y'),
    ('공지사항 2', '운영팀', '2024-02-01', 85, '공지사항 내용 2입니다.', 'N'),
    ('공지사항 3', '관리자', '2024-03-05', 200, '공지사항 내용 3입니다.', 'Y'),
    ('공지사항 4', '운영팀', '2024-04-10', 120, '공지사항 내용 4입니다.', 'N'),
    ('공지사항 5', '관리자', '2024-05-15', 95, '공지사항 내용 5입니다.', 'Y'),
    ('공지사항 6', '운영팀', '2024-06-20', 140, '공지사항 내용 6입니다.', 'N'),
    ('공지사항 7', '관리자', '2024-07-25', 175, '공지사항 내용 7입니다.', 'Y'),
    ('공지사항 8', '운영팀', '2024-08-30', 220, '공지사항 내용 8입니다.', 'N'),
    ('공지사항 9', '관리자', '2024-09-10', 60, '공지사항 내용 9입니다.', 'Y'),
    ('공지사항 10', '운영팀', '2024-10-01', 185, '공지사항 내용 10입니다.', 'Y');