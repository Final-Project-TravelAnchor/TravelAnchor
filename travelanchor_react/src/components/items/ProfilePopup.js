import React from "react";
import "./ChatRoom.css";

const ProfilePopup = ({ member, onClose }) => {
  return (
    <div className="profile-popup">
      <div className="profile-popup-content">
        <h2 onClick={onClose}>X</h2>
        {/* <button className="close-button" onClick={onClose}>X</button> */}
        <h2>회원정보 : {member.memberName}</h2>
        <p>Member Code: {member.memberCode}</p>
        {/* 여기에 더 추가 필요 */}
      </div>
    </div>
  );
};

export default ProfilePopup;