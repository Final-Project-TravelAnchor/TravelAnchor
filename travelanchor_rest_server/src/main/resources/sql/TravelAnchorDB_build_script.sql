# create database if not exists travelanchordb;
#
# create user if not exists 'travel'@'%' identified by 'travel';
# grant all privileges on travelanchordb.* to 'travel'@'%';
#
# use travelanchordb;


-- 권한 테이블
DROP TABLE IF EXISTS tbl_authority CASCADE;
CREATE TABLE IF NOT EXISTS tbl_authority
(
    authority_code INT AUTO_INCREMENT NOT NULL COMMENT '권한코드',
    authority_name VARCHAR(255) NOT NULL COMMENT '권한명',
    authority_desc VARCHAR(4000) NOT NULL COMMENT '권한설명',
    CONSTRAINT pk_authority_code PRIMARY KEY (authority_code)

) ENGINE=InnoDB COMMENT '권한';

-- tbl_member_role(회원별권한)
DROP TABLE IF EXISTS tbl_member_role CASCADE;
CREATE TABLE IF NOT EXISTS tbl_member_role
(
    member_code int auto_increment comment '회원식별코드',
    authority_code int not null comment '권한식별코드',
    constraint pk_member_role primary key (member_code, authority_code)
) ENGINE=InnoDB COMMENT '회원별권한';

-- 회원 테이블
DROP TABLE IF EXISTS tbl_member CASCADE;
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
DROP TABLE IF EXISTS tbl_badge CASCADE;
CREATE TABLE IF NOT EXISTS tbl_badge
(
    badge_code INT AUTO_INCREMENT NOT NULL COMMENT '배지코드',
    badge_name VARCHAR(255) NOT NULL COMMENT '배지이름',
    badge_criteria VARCHAR(255) NOT NULL COMMENT '획득조건',
    badge_create_at DATE NOT NULL COMMENT '생성일자',
    CONSTRAINT pk_badge_code PRIMARY KEY (badge_code)
) ENGINE=InnoDB COMMENT '배지';

-- 배지 획득 테이블
DROP TABLE IF EXISTS tbl_get_badge CASCADE;
CREATE TABLE IF NOT EXISTS tbl_get_badge
(
    badge_code INT NOT NULL COMMENT '배지코드',
    member_code INT NOT NULL COMMENT '회원식별코드'
#     CONSTRAINT fk_badge_code FOREIGN KEY (badge_code) REFERENCES tbl_badge(badge_code),
#     CONSTRAINT fk_member_code FOREIGN KEY (member_code) REFERENCES tbl_member(member_code)
) ENGINE=InnoDB COMMENT '획득배지';

-- 포인트 리워드 테이블
DROP TABLE IF EXISTS tbl_point_reward CASCADE;
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
DROP TABLE IF EXISTS tbl_member_reviews_category CASCADE;
CREATE TABLE IF NOT EXISTS tbl_member_reviews_category
(
    review_category_code INT AUTO_INCREMENT NOT NULL COMMENT '리뷰카테고리코드',
    review_category_level INT COMMENT '카테고리등급',
    review_category_sub_code INT NOT NULL COMMENT '리뷰카테고리서브코드',
    member_review VARCHAR(100) NOT NULL COMMENT '내용',
    CONSTRAINT pk_review_category_code PRIMARY KEY (review_category_code)
) ENGINE=InnoDB COMMENT '후기카테고리';

-- 회원 후기 테이블
DROP TABLE IF EXISTS tbl_member_reviews CASCADE;
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
# DROP TABLE IF EXISTS tbl_member_reviews_text CASCADE;
# CREATE TABLE IF NOT EXISTS tbl_member_reviews_text
# (
#     review_category_code INT NOT NULL COMMENT '리뷰카테고리코드',
#     review_category_sub_code INT NOT NULL COMMENT '리뷰카테고리코드',
#     review_text VARCHAR(100) NOT NULL COMMENT '내용',
#     CONSTRAINT fk_review_category_code1 FOREIGN KEY (review_category_code) REFERENCES tbl_member_reviews_category(review_category_code)
# ) ENGINE=InnoDB COMMENT '후기내용';

-- 여행 일정 테이블
DROP TABLE IF EXISTS tbl_travel_plans CASCADE;
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
DROP TABLE IF EXISTS tbl_travel_day CASCADE;
CREATE TABLE IF NOT EXISTS tbl_travel_day
(
    day_code INT AUTO_INCREMENT NOT NULL COMMENT '일과코드',
    travel_code INT NOT NULL COMMENT '여행코드',
    day_number INT NOT NULL COMMENT '여행차수',
    day_date INT NOT NULL COMMENT '해당 일',
    activity_title VARCHAR(20) NOT NULL COMMENT '세부활동제목',
    activity_detail VARCHAR(100) NOT NULL COMMENT '세부활동',
    CONSTRAINT pk_day_code PRIMARY KEY (day_code)
#     CONSTRAINT fk_travel_code FOREIGN KEY (travel_code) REFERENCES tbl_travel_plans(travel_code)
) ENGINE=InnoDB COMMENT '일정별일과';

-- 활동 정보 테이블
DROP TABLE IF EXISTS tbl_activity CASCADE;
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
DROP TABLE IF EXISTS tbl_expense CASCADE;
CREATE TABLE IF NOT EXISTS tbl_expense
(
    expense_code INT AUTO_INCREMENT NOT NULL COMMENT '활동금액코드',
    activity_code INT NOT NULL COMMENT '활동코드',
    travel_code INT NOT NULL COMMENT '여행일정',
    expense_total_amount INT NOT NULL COMMENT '활동총비용',
    CONSTRAINT pk_expense_code PRIMARY KEY (expense_code)
#     CONSTRAINT fk_activity_code FOREIGN KEY (activity_code) REFERENCES tbl_activity(activity_code)
) ENGINE=InnoDB COMMENT '활동정보';


-- 활동 비용 세부 테이블
DROP TABLE IF EXISTS tbl_expense_detail CASCADE;
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
DROP TABLE IF EXISTS tbl_travel_country CASCADE;
CREATE TABLE IF NOT EXISTS tbl_travel_country
(
    country_code INT AUTO_INCREMENT NOT NULL COMMENT '국가코드',
    country_name VARCHAR(20) NOT NULL COMMENT '국가',
    CONSTRAINT pk_country_code PRIMARY KEY (country_code)
) ENGINE=InnoDB COMMENT '국가';

-- 도시 테이블
DROP TABLE IF EXISTS tbl_travel_city CASCADE;
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
DROP TABLE IF EXISTS tbl_population CASCADE;
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
DROP TABLE IF EXISTS tbl_free_board_category CASCADE;
CREATE TABLE IF NOT EXISTS tbl_free_board_category
(
    free_board_category_code INT AUTO_INCREMENT NOT NULL COMMENT '공지사항 카테고리 코드',
    free_board_category_name VARCHAR(100) NOT NULL COMMENT '공지사항 카테고리명',
    CONSTRAINT pk_free_board_category_code PRIMARY KEY (free_board_category_code)
) ENGINE=InnoDB COMMENT '공지사항 카테고리';

-- 공지사항 테이블
DROP TABLE IF EXISTS tbl_free_board CASCADE;
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
DROP TABLE IF EXISTS tbl_comment CASCADE;
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
DROP TABLE IF EXISTS tbl_travel_reports CASCADE;
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
    report_image_url TEXT COMMENT '이미지 URL',
    CONSTRAINT pk_report_code PRIMARY KEY (report_code)
#     CONSTRAINT fk_member_code8 FOREIGN KEY (member_code) REFERENCES tbl_member(member_code)
) ENGINE=InnoDB COMMENT '여행후기';

-- 채팅방 테이블
DROP TABLE IF EXISTS tbl_chatroom CASCADE;
CREATE TABLE IF NOT EXISTS tbl_chatroom
(
    chatroom_code BIGINT AUTO_INCREMENT NOT NULL COMMENT '채팅방코드',
    population_code INT NOT NULL COMMENT '공고코드',
#     chatroom_name VARCHAR(255) NOT NULL COMMENT '채팅방명',
#     chatroom_created_at Timestamp NOT NULL COMMENT '생성일자',
    CONSTRAINT pk_chatroom_code PRIMARY KEY (chatroom_code)
) ENGINE=InnoDB COMMENT '채팅방';

-- 메시지 테이블
DROP TABLE IF EXISTS tbl_message CASCADE;
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

DROP TABLE IF EXISTS tbl_member_declare CASCADE;
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
DROP TABLE IF EXISTS tbl_travel_destination_favorite CASCADE;
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
DROP TABLE IF EXISTS tbl_restaurant_favorite CASCADE;
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

DROP TABLE IF EXISTS tbl_notice CASCADE;
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
                                                                                                                                                                                                                                                                 (1, 1, '이지은', '아이유', '010-1234-5678', '2024-01-01', 'user1', '$2a$10$IhDb9e29Zr.dCr7nPUA/0e0WShLAy.g6EEMZVBY7HF4U4GbCM/hem', '1990-05-15', '여', '서울특별시 강남구 역삼로 12길 25, 502호', 1, '06a0060ae2da4dffb9a8a440ba5d9c5e.PNG', 'Y'),
                                                                                                                                                                                                                                                                 (2, 2, '김범수', '10시10분', '010-9876-5432', '2024-02-15', 'user2', '$2a$10$X0HHRqJiasK1lnV84b83guyl6Fuiy72dHz0gRqMWQbpFUG56CPwu6', '1988-08-22', '남', '경기도 수원시 영통구 광교로 230, 3층', 2, 'fcb3e0c8f94940cf99724d26e6020259.PNG', 'Y'),
                                                                                                                                                                                                                                                                 (3, 2, '백지영', '사랑안해', '010-1111-2222', '2024-03-01', 'user3', '$2a$10$RaUrEJIDuNOc73mn.9TNF.t1E/0BiX4NJGuIGNg0oAVlOFset9CPe', '1995-04-10', '여', '서울특별시 마포구 합정동 366-16, 301호', 2, '8e2492fd197e42d5855ffbbb5142b4ed.PNG', 'Y'),
                                                                                                                                                                                                                                                                 (4, 2, '박효신', '눈꽃연금', '010-2222-3333', '2024-03-10', 'user4', '$2a$10$koZtyqOFbMZ/zuHGd1k.R.LAL4fVMfC60MuiVImjCLs7XHNkUu4DK', '1992-07-17', '남', '서울특별시 송파구 잠실로 25, 잠실빌딩 10층', 1, '58b3fd68f6074de2b33d4430fd29244b.PNG', 'Y'),
                                                                                                                                                                                                                                                                 (5, 2, '팜하니', '히터펑순기', '010-3333-4444', '2024-04-20', 'user5', '$2a$10$312n.LuQ2AAPF9LkNTNOHeM9V5USiBqA7B6yeQX6fzyCoBWYuO68y', '1993-02-28', '여', '경상북도 포항시 남구 동빈로 1길 17, 101호', 2, '7580adcf59d04240b7a16f6cf07bd34b.PNG', 'Y'),
                                                                                                                                                                                                                                                                 (6, 2, '이창섭', '전과자', '010-4444-5555', '2024-05-05', 'user6', '$2a$10$aZ5.qhA0dJ0n.PjaV.rOHeO2/H6Ksx1ZJyd5DAKO1kTqYq6hawMfi', '1987-12-11', '남', '대전광역시 유성구 봉명동 125, 유성빌딩 2층', 2, '7b91aee3ddec49a69a9b7d2849493f7f.PNG', 'Y'),
                                                                                                                                                                                                                                                                 (7, 2, '육성재', '육캔두잇', '010-5555-6666', '2024-06-12', 'user7', '$2a$10$5w7VezVF36an5LwgCQAWxeCZfuIO1YrAGy4mZrU0TZVvPH/zLwj8a', '1991-01-25', '남', '부산광역시 해운대구 좌동로 33, 7층', 1, '8a4cd876df574970a565b41e47561080.PNG', 'Y'),
                                                                                                                                                                                                                                                                 (8, 2, '안소희', '어머나', '010-6666-7777', '2024-07-08', 'user8', '$2a$10$140Sv/sKmV/TkD3MN3yzWe4iljEdAwy/79Bl8TYSFobiYCVc.ksAy', '1997-09-10', '여', '울산광역시 남구 삼산로 205, 4층', 2, 'c0a177a658b44f749699f91a23c47d8b.PNG', 'Y'),
                                                                                                                                                                                                                                                                 (9, 2, '권지용', '개추어크래용', '010-7777-8888', '2024-08-16', 'user9', '$2a$10$gQoxt8swFds4eO0Du.lV1ukQLolDiYWabK9uV7AGsmcoRhBzyobYa', '1996-11-01', '여', '서울특별시 강북구 도봉로 189, 3층', 2, '053626c2d16f4814a5e81b842a115dc7.PNG', 'Y'),
                                                                                                                                                                                                                                                                 (10, 2, '박보영', '뽀블리', '010-8888-9999', '2024-09-01', 'user10', '$2a$10$2H5vp7906QZQxicmDCTJeuDuxL4ye/0YthOlVStS5N/KQOYLUiun2', '1994-03-17', '남', '경기도 성남시 분당구 수내로 73, 5층', 1, '323a5df17163482d90a74f8198a4e4c6.PNG', 'Y');


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
                                                                                             (1, 2, 9),
                                                                                             (2, 9, 30),
                                                                                             (3, 8, 20),
                                                                                             (4, 20, 95),
                                                                                             (5, 5, 6),
                                                                                             (6, 7, 17);

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

INSERT INTO tbl_travel_day (day_code, travel_code, day_number, day_date, activity_title, activity_detail) VALUES
                                                                                                              (1, 1, 1, 1, '아침식사', '고기구워먹느라 50000원씀'),
                                                                                                              (2, 1, 2, 2, '카페', '갬성카페가서 커피먹느라 25000원씀'),
                                                                                                              (3, 1, 1, 1, '전시회', '입장권으로 15000원씀'),
                                                                                                              (4, 1, 1, 1, '길거리음식', '길거리음식 사먹느라 32000원씀'),
                                                                                                              (5, 1, 1, 1, '세부활동제목5', '세부적인 활동을 적는 란.5'),
                                                                                                              (6, 1, 1, 1, '세부활동제목6', '세부적인 활동을 적는 란.6'),
                                                                                                              (7, 1, 1, 1, '세부활동제목7', '세부적인 활동을 적는 란.7'),
                                                                                                              (8, 1, 1, 1, '세부활동제목8', '세부적인 활동을 적는 란.8'),
                                                                                                              (9, 1, 1, 1, '세부활동제목9', '세부적인 활동을 적는 란.9'),
                                                                                                              (10, 1, 1, 1, '세부활동제목10', '세부적인 활동을 적는 란.10');

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

INSERT INTO tbl_expense (expense_code, activity_code, travel_code, expense_total_amount) VALUES
                                                                                             (1, 1,1, 50000),
                                                                                             (2, 2,2, 25000),
                                                                                             (3, 3,3, 15000),
                                                                                             (4, 4,4, 32000),
                                                                                             (5, 5,5, 28000),
                                                                                             (6, 6,6, 50000),
                                                                                             (7, 7,7, 40000),
                                                                                             (8, 8,9, 23000),
                                                                                             (9, 9,9, 18000),
                                                                                             (10, 10, 10,  30000);

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
(NULL, 1, '서울', 'SEL'),
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
(NULL, 2, '도쿄', 'TYO'),
(NULL, 2, '오사카', 'OSA'),
(NULL, 2, '후쿠오카', 'FUK'),
(NULL, 2, '오키나와', 'OKA'),
(NULL, 2, '삿포로', 'SPK'),
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
(NULL, 12, '베이징', 'BJS'),
(NULL, 12, '상하이', 'SHA'),
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
(NULL, 16, '로마', 'ROM'),
(NULL, 17, '바르셀로나', 'BCN'),
(NULL, 17, '마드리드', 'MAD'),
(NULL, 18, '파리', 'PAR'),
(NULL, 19, '런던', 'LON'),
(NULL, 20, '취리히', 'ZRH'),
(NULL, 21, '프라하', 'PRG'),
(NULL, 22, '부다페스트', 'BUD'),
(NULL, 23, '프랑크푸르트', 'FRA'),
-- 미주 (미국, 캐나다)
(NULL, 14, '호놀룰루', 'HNL'),
(NULL, 14, '뉴욕', 'NYC'),
(NULL, 14, '로스앤젤레스', 'LAX'),
(NULL, 14, '라스베가스', 'LAS'),
(NULL, 14, '샌프란시스코', 'SFO'),
(NULL, 14, '시카고', 'CHI'),
(NULL, 14, '시애틀', 'SEA'),
(NULL, 14, '애틀랜타', 'ATL'),
(NULL, 24, '밴쿠버', 'YVR'),
(NULL, 24, '토론토', 'YTO');

INSERT INTO tbl_population (travel_code, member_code, country_code, population_title, population_description, population_created_at, population_views, population_people, population_onoff) VALUES
                                                                                                                                                                                                (1, 1, 2, '12/2 도쿄 소도시 투어', '도쿄 근교의 소도시를 여행해보려고 합니다. 조용한 골목과 아기자기한 카페를 함께 탐방할 분들 계신가요?', '2024-12-02', 85, 4, 'Y'),
                                                                                                                                                                                                (2, 2, 18, '12/4 파리 야경 투어', '파리 에펠탑의 멋진 야경을 감상하고 싶습니다. 낭만적인 풍경 속에서 좋은 추억을 함께 만들어 봐요!', '2024-12-04', 110, 5, 'Y'),
                                                                                                                                                                                                (3, 3, 14, '12/6 뉴욕 크리스마스 여행', '뉴욕의 크리스마스 분위기를 제대로 느껴보고 싶어요. 타임스퀘어도 들르고, 센트럴파크도 함께 가보실래요?', '2024-12-06', 140, 3, 'Y'),
                                                                                                                                                                                                (4, 4, 15, '12/8 시드니 오페라하우스 투어', '시드니 오페라하우스 앞에서 멋진 야경을 보고, 근처에서 여유롭게 시간을 보내보아요!', '2024-12-08', 95, 6, 'Y'),
                                                                                                                                                                                                (5, 5, 20, '12/10 스위스 설산 여행', '스위스 알프스의 설산을 보며 힐링하고 싶습니다. 눈썰매도 타고 사진도 많이 찍어볼까요?', '2024-12-10', 100, 4, 'Y'),
                                                                                                                                                                                                (6, 6, 5, '12/12 세부 힐링 바다 여행', '세부의 맑은 바다에서 힐링하고 리조트에서 여유롭게 즐길 수 있는 여행입니다. 함께 하실 분들 환영해요~', '2024-12-12', 120, 5, 'Y'),
                                                                                                                                                                                                (7, 7, 7, '12/15 쿠알라룸푸르 야경 탐방', '쿠알라룸푸르의 멋진 야경을 감상하며 맛있는 음식도 즐길 예정이에요. 함께 하실래요?', '2024-12-15', 115, 6, 'Y'),
                                                                                                                                                                                                (8, 8, 19, '12/18 런던 겨울 거리 여행', '런던의 겨울 감성을 함께 느껴봐요! 따뜻한 홍차 한 잔과 아름다운 거리를 걸어보는 건 어떠세요?', '2024-12-18', 90, 7, 'Y'),
                                                                                                                                                                                                (9, 9, 16, '12/20 로마 고대 유적지 탐방', '로마의 콜로세움과 고대 유적지를 탐방하며 역사의 숨결을 느껴보고 싶습니다. 같이 가시죠!', '2024-12-20', 105, 8, 'Y'),
                                                                                                                                                                                                (10, 10, 23, '12/22 베를린 크리스마스 마켓', '베를린의 크리스마스 마켓에서 따뜻한 간식을 먹고, 예쁜 소품도 구경할 예정입니다. 함께 하실 분 계신가요?', '2024-12-22', 140, 5, 'Y'),
                                                                                                                                                                                                (11, 11, 24, '12/25 밴쿠버 설경 여행', '밴쿠버의 아름다운 설경을 보며 따뜻한 핫초코도 마시고 여유를 즐겨보아요. 관심 있으신 분들 연락 주세요!', '2024-12-25', 160, 6, 'Y'),
                                                                                                                                                                                                (12, 12, 17, '12/28 바르셀로나 감성 투어', '바르셀로나에서 가우디의 건축물을 감상하고, 맛있는 타파스도 즐겨보려고 합니다. 함께 떠나실래요?', '2024-12-28', 120, 5, 'Y'),
                                                                                                                                                                                                (13, 13, 4, '1/2 방콕 야시장 맛집 투어', '방콕의 야시장에서 다양한 스트리트 푸드를 맛보고 싶어요. 먹방 여행 함께 떠나요~!', '2025-01-02', 135, 6, 'Y'),
                                                                                                                                                                                                (14, 14, 9, '1/5 몰디브 스노클링 여행', '몰디브의 맑은 바다에서 스노클링도 하고 아름다운 풍경을 즐길 예정입니다. 같이 가볼까요?', '2025-01-05', 110, 4, 'Y'),
                                                                                                                                                                                                (15, 15, 21, '1/8 프라하 동화 속 여행', '프라하에서 동화 속 주인공처럼 아름다운 거리를 걸으며 추억을 만들어보려고 합니다. 함께 떠나요~', '2025-01-08', 125, 7, 'Y'),
                                                                                                                                                                                                (16, 16, 12, '1/10 상하이 야경 탐방', '상하이의 와이탄 야경은 정말 멋지다던데, 다 함께 가서 예쁜 사진도 많이 찍어봐요!', '2025-01-10', 150, 5, 'Y'),
                                                                                                                                                                                                (17, 17, 6, '1/12 싱가포르 센토사 여행', '싱가포르 센토사에서 놀이기구도 타고 해변에서 여유롭게 시간을 보내려고 합니다. 같이 떠나실 분~?', '2025-01-12', 140, 4, 'Y'),
                                                                                                                                                                                                (18, 18, 10, '1/15 타이베이 핫스팟 탐방', '타이베이에서 맛있는 디저트를 즐기며 핫스팟 명소들을 탐방할 예정입니다. 함께 가실래요?', '2025-01-15', 130, 6, 'Y');

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
                                                                                                                                                                           (1, 2, '런던 여행 필수 아이템', '런던은 날씨 변화가 심하니까 접이식 우산 필수! 그리고 편한 신발도 챙기세요. 런던은 걷는 여행입니다.', '2024-01-01', 1, 'Y'),
                                                                                                                                                                           (2, 6, '겨울 항공권 할인 이벤트', '1월 한정으로 동남아 전 노선 20% 할인 중입니다. 여행 계획 있으신 분들 서두르세요!', '2024-01-10', 2, 'Y'),
                                                                                                                                                                           (3, 7, '런던 브릭 레인 빈티지 쇼핑 꿀팁', '브릭 레인에 가면 빈티지 의류 득템 가능! 아침 일찍 가면 사람이 적고 좋은 아이템 고르기 좋아요.', '2024-02-15', 3, 'Y'),
                                                                                                                                                                           (4, 2, '일본 도쿄 벚꽃 여행 꿀팁', '3~4월에 우에노 공원과 신주쿠 교엔은 꼭 가보세요. 벚꽃 시즌에는 새벽에 가야 한적하게 즐길 수 있어요.', '2024-02-20', 4, 'Y'),
                                                                                                                                                                           (5, 8, '런던 항공권 특가 소식!', '런던 왕복 항공권이 30% 할인 중입니다. 봄 시즌 런던 여행을 계획 중이라면 지금이 찬스!', '2024-03-05', 5, 'Y'),
                                                                                                                                                                           (6, 2, '파리의 숨은 카페 추천', '마레 지구에 있는 작은 카페들 너무 예뻐요. 관광지 카페보다 저렴하고 분위기 최고!', '2024-03-20', 6, 'Y'),
                                                                                                                                                                           (7, 2, '런던 뮤지컬 제대로 즐기기', '런던에서는 뮤지컬을 꼭 봐야 해요! 당일 할인 티켓은 레스터 스퀘어에서 구매 가능. 50% 이상 할인도 많아요.', '2024-04-10', 7, 'Y'),
                                                                                                                                                                           (8, 7, '캐나다 밴프에서의 잊지 못할 하루', '밴프 국립공원의 자연경관, 특히 루이스 호수는 진짜 평생 기억에 남아요. 꼭 한 번 가보세요.', '2024-04-20', 8, 'Y'),
                                                                                                                                                                           (9, 6, '유럽여행 프로모션 정보', '5월 유럽 주요 도시 항공권 특가 중! 런던, 파리, 로마가 포함되어 있으니 얼른 확인하세요.', '2024-05-01', 9, 'Y'),
                                                                                                                                                                           (10, 2, '런던 히든 바 탐방기', '소호에 있는 히든 바들 진짜 매력적이에요. 간판 없는 바를 찾아가는 재미가 쏠쏠!', '2024-05-15', 10, 'Y'),
                                                                                                                                                                           (11, 5, '여행 안전 팁: 여권 관리', '여권 복사본을 항상 준비하고, 분실 시 가장 먼저 대사관에 연락하세요. 여행 중 가장 중요한 문서입니다.', '2024-06-01', 11, 'Y'),
                                                                                                                                                                           (12, 2, '런던 근교 여행 추천 - 브라이튼', '런던에서 기차로 1시간 거리에 있는 브라이튼, 해변도 예쁘고 이색적인 감성 카페도 많아요.', '2024-06-10', 12, 'Y'),
                                                                                                                                                                           (13, 8, '몰디브 리조트 할인 정보', '몰디브 올인클루시브 리조트가 25% 할인 중입니다. 여름휴가 계획 중이라면 지금 예약하세요!', '2024-06-20', 13, 'Y'),
                                                                                                                                                                           (14, 2, '런던 타워 브릿지 야경 꿀팁', '타워 브릿지는 일몰 직후가 베스트 타임! 조명이 켜진 다리를 배경으로 멋진 사진 찍어보세요.', '2024-07-05', 14, 'Y'),
                                                                                                                                                                           (15, 7, '프라하에서의 로맨틱한 하루', '프라하의 구시가 광장에서 시작해서 카를교를 걸으며 하루를 보내면 진짜 로맨틱합니다.', '2024-07-20', 15, 'Y'),
                                                                                                                                                                           (16, 2, '런던 도보 여행 추천 루트', '런던아이에서 시작해서 빅벤, 세인트 제임스 파크, 버킹엄 궁전까지 도보로 완벽한 반나절 코스!', '2024-08-01', 16, 'Y'),
                                                                                                                                                                           (17, 5, '여름철 더위 대처법', '더운 지역에서는 냉수병을 챙기고, 자외선 차단제는 필수로 발라주세요. 특히 장시간 야외 활동 시 주의!', '2024-08-10', 17, 'Y'),
                                                                                                                                                                           (18, 8, '호주 여행 할인 프로모션', '호주 시드니와 멜버른 항공권이 특가로 나왔어요. 특히 10월 출발 항공권이 저렴합니다.', '2024-08-20', 18, 'Y'),
                                                                                                                                                                           (19, 7, '런던에서 있었던 소소한 에피소드', '런던 지하철에서 길을 헤맸는데 현지인이 너무 친절하게 도와줘서 감동했어요. 런던은 따뜻한 도시!', '2024-09-01', 19, 'Y'),
                                                                                                                                                                           (20, 9, '항공사 수화물 규정 변경 공지', '몇몇 항공사가 기내 반입 수화물 크기와 무게 규정을 강화했습니다. 여행 전에 확인하세요.', '2024-09-15', 20, 'Y');

INSERT INTO tbl_comment (comment_code, free_board_code, member_code, comment_content, comment_created_at, member_nickname) VALUES
                                                                                                                               (1, 1, 1, '런던 여행 꿀팁 진짜 도움돼요! 우산 꼭 챙길게요.', '2024-01-02', '아이유'),
                                                                                                                               (2, 1, 2, '런던에 대한 정보가 유용하네요. 좋은 글 감사합니다!', '2024-01-03', '10시10분'),
                                                                                                                               (3, 1, 3, '런던 브릭 레인 빈티지샵 강추합니다.', '2024-01-04', '사랑안해'),
                                                                                                                               (4, 2, 4, '항공권 할인 이벤트라니! 바로 알아봐야겠네요.', '2024-01-11', '눈꽃연금'),
                                                                                                                               (5, 2, 5, '특가 항공권 정보를 찾고 있었는데 정말 감사합니다.', '2024-01-12', '히터펑순기'),
                                                                                                                               (6, 2, 6, '항공권 예약하기 전에 확인할 꿀팁들이 유용하네요.', '2024-01-13', '전과자'),
                                                                                                                               (7, 3, 7, '브릭 레인 진짜 좋아요. 빈티지 옷 득템하러 가야겠어요.', '2024-02-16', '육캔두잇'),
                                                                                                                               (8, 3, 8, '브릭 레인 근처에 예쁜 카페도 많더라고요.', '2024-02-17', '어머나'),
                                                                                                                               (9, 3, 9, '런던에서 가장 힙한 장소 중 하나인 것 같아요.', '2024-02-18', '개추어크래용'),
                                                                                                                               (10, 4, 10, '도쿄 벚꽃 여행 꿀팁 유용하네요. 새벽에 가야겠어요!', '2024-02-21', '뽀블리'),
                                                                                                                               (11, 4, 1, '도쿄는 언제 가도 아름답죠. 벚꽃은 꼭 봐야해요!', '2024-02-22', '아이유'),
                                                                                                                               (12, 4, 2, '도쿄 벚꽃 시즌 호텔 예약 팁도 공유해주세요.', '2024-02-23', '10시10분'),
                                                                                                                               (13, 5, 3, '런던 항공권 특가 소식 너무 좋아요! 곧 예약하러 갑니다.', '2024-03-06', '사랑안해'),
                                                                                                                               (14, 5, 4, '런던 날씨를 고려해서 옷차림도 준비해야겠어요.', '2024-03-07', '눈꽃연금'),
                                                                                                                               (15, 5, 5, '비 오는 날의 런던이 제일 멋진 것 같아요.', '2024-03-08', '히터펑순기'),
                                                                                                                               (16, 6, 6, '마레 지구 카페 가보고 싶네요. 파리 여행 꿀팁 감사합니다!', '2024-03-21', '전과자'),
                                                                                                                               (17, 6, 7, '마레 지구의 골목길이 너무 예쁘더라고요.', '2024-03-22', '육캔두잇'),
                                                                                                                               (18, 6, 8, '파리의 또 다른 히든스팟도 알고 싶어요.', '2024-03-23', '어머나'),
                                                                                                                               (19, 7, 9, '뮤지컬 할인 티켓 정보 대박이에요. 꼭 봐야겠어요!', '2024-04-11', '개추어크래용'),
                                                                                                                               (20, 7, 10, '런던에서 본 뮤지컬 중 최고는 레미제라블이었어요.', '2024-04-12', '뽀블리'),
                                                                                                                               (21, 7, 1, '뮤지컬 추천 감사합니다. 이번 여행 때 꼭 갈게요.', '2024-04-13', '아이유'),
                                                                                                                               (22, 8, 2, '밴프 국립공원 정말 멋있죠. 저도 꼭 가보고 싶어요.', '2024-04-21', '10시10분'),
                                                                                                                               (23, 8, 3, '캐나다 여행 리스트에 추가해야겠어요.', '2024-04-22', '사랑안해'),
                                                                                                                               (24, 8, 4, '밴프에서 가장 추천하는 트레일은 어디인가요?', '2024-04-23', '눈꽃연금'),
                                                                                                                               (25, 9, 5, '유럽 여행 프로모션 덕분에 돈 많이 아낄 수 있겠어요.', '2024-05-02', '히터펑순기'),
                                                                                                                               (26, 9, 6, '항공 프로모션 정보가 정말 알차네요!', '2024-05-03', '전과자'),
                                                                                                                               (27, 9, 7, '유럽은 언제나 좋은 선택이죠. 좋은 정보 감사합니다.', '2024-05-04', '육캔두잇'),
                                                                                                                               (28, 10, 8, '소호 히든 바 너무 재밌을 것 같아요. 간판 없는 바 꼭 가보고 싶네요.', '2024-05-16', '어머나'),
                                                                                                                               (29, 10, 9, '런던 소호는 항상 새로운 발견이 있는 곳 같아요.', '2024-05-17', '개추어크래용'),
                                                                                                                               (30, 10, 10, '소호 히든 바는 현지인에게 물어보는 것도 좋습니다.', '2024-05-18', '뽀블리'),
                                                                                                                               (31, 11, 1, '여권 복사본 준비 꿀팁 감사합니다. 항상 챙겨야겠어요.', '2024-06-02', '아이유'),
                                                                                                                               (32, 11, 2, '여권 잃어버리면 큰일이죠. 미리 준비해야겠어요.', '2024-06-03', '10시10분'),
                                                                                                                               (33, 11, 3, '이거 모르고 여행 갔다가 낭패 본 적 있어요. 감사합니다.', '2024-06-04', '사랑안해'),
                                                                                                                               (34, 12, 4, '브라이튼 너무 가보고 싶어요. 런던 근교 여행 정보 감사합니다.', '2024-06-11', '눈꽃연금'),
                                                                                                                               (35, 12, 5, '브라이튼은 언제 가도 좋은 것 같아요. 특히 여름에요.', '2024-06-12', '히터펑순기'),
                                                                                                                               (36, 12, 6, '브라이튼의 해변에서 하루 종일 있어도 질리지 않아요.', '2024-06-13', '전과자'),
                                                                                                                               (37, 13, 7, '몰디브 리조트 할인이라니... 지금 바로 예약하러 갑니다!', '2024-06-21', '육캔두잇'),
                                                                                                                               (38, 13, 8, '몰디브는 언제나 로망이에요. 좋은 정보 감사합니다.', '2024-06-22', '어머나'),
                                                                                                                               (39, 13, 9, '몰디브에서 가장 추천하는 리조트도 궁금합니다.', '2024-06-23', '개추어크래용'),
                                                                                                                               (40, 14, 10, '타워 브릿지 야경 진짜 예쁘겠네요. 꿀팁 감사합니다!', '2024-07-06', '뽀블리'),
                                                                                                                               (41, 14, 1, '타워 브릿지는 비 오는 날 더 예쁜 것 같아요.', '2024-07-07', '아이유'),
                                                                                                                               (42, 14, 2, '런던의 랜드마크 중 하나죠. 꼭 가보고 싶어요.', '2024-07-08', '10시10분'),
                                                                                                                               (43, 15, 3, '프라하 너무 로맨틱해 보여요. 여행 리스트에 추가합니다!', '2024-07-21', '사랑안해'),
                                                                                                                               (44, 15, 4, '프라하의 밤거리는 마치 그림 같아요.', '2024-07-22', '눈꽃연금'),
                                                                                                                               (45, 15, 5, '프라하 추천 감사합니다. 꼭 가봐야겠어요.', '2024-07-23', '히터펑순기'),
                                                                                                                               (46, 16, 6, '런던 도보 여행 반나절 코스 최고네요. 꼭 해볼게요.', '2024-08-02', '전과자'),
                                                                                                                               (47, 16, 7, '런던의 숨은 명소들을 많이 알고 싶어요.', '2024-08-03', '육캔두잇'),
                                                                                                                               (48, 16, 8, '도보 여행 코스 덕분에 새로운 장소를 발견했어요.', '2024-08-04', '어머나'),
                                                                                                                               (49, 17, 9, '여름 더위 대처법 너무 유용해요. 냉수병 챙길게요!', '2024-08-11', '개추어크래용'),
                                                                                                                               (50, 17, 10, '여름 여행 꿀팁 감사합니다. 이번 여행에 활용할게요.', '2024-08-12', '뽀블리');


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
                                                                                                                                    (1, 1, 1, '이지은', '일반 채팅방에 오신 것을 환영합니다!', '2024-01-05 10:00:00', 'CHAT'),
                                                                                                                                    (2, 1, 3, '백지영', '안녕하세요! 다들 어떻게 지내세요?', '2024-01-05 10:05:00', 'CHAT'),
                                                                                                                                    (3, 1, 2, '김범수', '다음 달에 일본 여행 가실 분 있나요?', '2024-02-16 09:30:00', 'CHAT'),
                                                                                                                                    (4, 1, 1, '이지은', '흥미롭네요! 저도 참여할 수 있을 것 같아요.', '2024-02-16 09:45:00', 'CHAT'),
                                                                                                                                    (5, 1, 3, '백지영', '여러분이 가장 좋아하는 길거리 음식은 뭐예요?', '2024-03-10 12:15:00', 'CHAT'),
                                                                                                                                    (6, 1, 4, '박효신', '저는 타코를 좋아해요! 특히 매운 타코요.', '2024-03-10 12:20:00', 'CHAT'),
                                                                                                                                    (7, 1, 2, '김범수', '새로운 VR 헤드셋 사용해보신 분 있나요?', '2024-04-20 16:00:00', 'CHAT'),
                                                                                                                                    (8, 1, 1, '이지은', '풍경 사진 찍는 팁 좀 알려주세요.', '2024-05-01 14:45:00', 'CHAT'),
                                                                                                                                    (9, 1, 5, '팜하니', '다들 이번 주말에 뭐 하세요?', '2024-05-01 15:00:00', 'CHAT'),
                                                                                                                                    (10, 2, 6, '이창섭', '이번 여행에서 가장 기대되는 순간은 뭐예요?', '2024-05-02 10:30:00', 'CHAT'),
                                                                                                                                    (11, 2, 2, '김범수', '저는 유명한 관광지보다 숨겨진 명소를 찾는 걸 좋아해요.', '2024-05-02 11:00:00', 'CHAT'),
                                                                                                                                    (12, 2, 1, '이지은', '여행 중에 좋은 음식점 아시는 분 있나요?', '2024-05-02 11:30:00', 'CHAT'),
                                                                                                                                    (13, 2, 4, '박효신', '이탈리아에서는 꼭 피자를 먹어봐야 해요!', '2024-05-02 12:00:00', 'CHAT'),
                                                                                                                                    (14, 2, 3, '백지영', '다음에 여행 가면 같이 가고 싶어요!', '2024-05-02 13:15:00', 'CHAT'),
                                                                                                                                    (15, 3, 5, '팜하니', '오늘 날씨가 너무 좋아요. 산책 가실 분?', '2024-05-02 14:30:00', 'CHAT'),
                                                                                                                                    (16, 3, 6, '이창섭', '저는 카페에서 책 읽는 걸 좋아해요.', '2024-05-02 15:00:00', 'CHAT'),
                                                                                                                                    (17, 3, 2, '김범수', '어제 본 영화 정말 감동적이었어요.', '2024-05-02 16:00:00', 'CHAT'),
                                                                                                                                    (18, 3, 1, '이지은', '영화 제목이 뭐였어요?', '2024-05-02 16:15:00', 'CHAT'),
                                                                                                                                    (19, 3, 3, '백지영', '다음 주에 콘서트 보러 갈 사람?', '2024-05-02 17:00:00', 'CHAT'),
                                                                                                                                    (20, 3, 4, '박효신', '어떤 콘서트인가요? 관심 있어요.', '2024-05-02 17:15:00', 'CHAT');

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
    ('2024년 1월 출입국 규정 변경 안내', '관리자', '2024-01-01', 150, '2024년 1월부로 일부 국가의 출입국 규정이 변경되었습니다. 여행 전 반드시 해당 국가의 비자 및 백신 접종 요건을 확인하세요.', 'Y'),
    ('2월 공항 교통편 변경 공지', '운영팀', '2024-02-01', 85, '2월부터 인천공항의 일부 셔틀버스와 주차장 운영시간이 변경됩니다. 자세한 내용은 공항 홈페이지를 참고해 주세요.', 'Y'),
    ('봄 시즌 유럽 여행 주의사항', '관리자', '2024-03-05', 200, '봄철 유럽 주요 도시의 관광객이 증가하면서 숙소와 교통 예약이 어려울 수 있습니다. 미리 예약하시길 권장드립니다.', 'Y'),
    ('4월 일본 벚꽃축제 일정 업데이트', '운영팀', '2024-04-10', 120, '2024년 일본 벚꽃축제 일정이 변경되었습니다. 상세 일정과 명소 정보는 공지사항을 확인해 주세요.', 'Y'),
    ('항공권 가격 변동 알림', '관리자', '2024-05-15', 95, '국내외 항공사의 연료비 상승으로 인해 일부 항공권 가격이 인상되었습니다. 여행 계획에 참고하시기 바랍니다.', 'Y'),
    ('6월 동남아 여행 날씨 정보', '운영팀', '2024-06-20', 140, '6월부터 동남아 지역의 우기가 시작됩니다. 여행 시 우비와 방수 장비를 준비하시고, 여행 일정에 유의하세요.', 'Y'),
    ('여름 시즌 인기 여행지 예약 팁', '관리자', '2024-07-25', 175, '여름 휴가철 주요 여행지 예약 경쟁이 치열합니다. 예약을 서두르시고, 취소 가능 여부를 꼭 확인하세요.', 'Y'),
    ('8월 중동 여행 안전공지', '운영팀', '2024-08-30', 220, '8월 중 일부 중동 국가에서 정세가 불안정할 수 있습니다. 외교부의 안전 공지를 확인하시고 여행을 신중히 계획하세요.', 'Y'),
    ('9월 몰디브 스노클링 시즌 안내', '관리자', '2024-09-10', 60, '9월은 몰디브 스노클링의 최적기입니다. 투명한 바다와 풍부한 해양 생태계를 놓치지 마세요.', 'Y'),
    ('10월 가을 단풍 여행 추천', '운영팀', '2024-10-01', 185, '10월은 단풍이 절정인 시기입니다. 한국과 일본의 가을 여행 명소를 소개합니다. 지금 바로 확인하세요!', 'Y'),
('11월 동남아 인기 여행지 특가 소식', '관리자', '2024-11-05', 140, '11월 한정 동남아 인기 여행지 항공권이 특가로 제공됩니다. 방콕, 발리, 싱가포르 노선이 대상이니 놓치지 마세요.', 'Y'),
('11월 유럽 크리스마스 마켓 여행 팁', '운영팀', '2024-11-15', 115, '11월 말부터 유럽 전역에서 크리스마스 마켓이 열립니다. 프라하와 뮌헨의 마켓이 특히 추천되니 참고하세요.', 'Y'),
('12월 몰디브 겨울 휴양지 정보', '관리자', '2024-12-01', 190, '12월 몰디브는 연말 휴양지로 완벽합니다. 리조트별 겨울 프로모션 정보를 확인하고 예약을 서두르세요.', 'Y'),
('12월 일본 온천 여행 추천 지역', '운영팀', '2024-12-10', 130, '추운 겨울 일본의 온천은 최고의 힐링 코스입니다. 하코네와 벳푸 지역 온천 정보를 확인해 보세요.', 'Y'),
('12월 연말 항공권 예약 마감 임박', '관리자', '2024-12-20', 220, '연말 항공권이 빠르게 매진되고 있습니다. 여행 계획이 있다면 지금 바로 예약하세요!', 'Y');