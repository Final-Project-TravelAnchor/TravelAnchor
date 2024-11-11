-- 1) 디폴트 데이터베이스 스키마인 mysql로 이동
USE mysql;


-- 2) 데이터베이스 생성(securitydb)
# DROP DATABASE travelanchordb;
CREATE DATABASE travelanchordb;
SHOW DATABASES;


-- 3) 유저 생성 (springsecurity/springsecurity)
# DROP USER 'travel';
CREATE USER 'travel'@'%' IDENTIFIED BY 'travel';
SELECT * FROM user;


-- 4) 유저에게 권한 부여
GRANT ALL PRIVILEGES ON travelanchordb.* TO 'travel'@'%';
SHOW GRANTS FOR 'travel'@'%';


-- 5) SQL을 실행할 타겟 스키마(securitydb)로 이동
USE travelanchordb;