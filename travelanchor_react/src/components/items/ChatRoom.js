import React, { useEffect, useState, useRef } from "react";
import { Stomp } from "@stomp/stompjs";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import ProfilePopup from "./ProfilePopup";  // ProfilePopup 임포트

export default function ChatRoom() {
  const { populationCode } = useParams();
  const memberInfo = useLocation().state.data;
  const [messages, setMessages] = useState([]);
  // console.log("ChatRoom messages : ", messages);
  const [inputValue, setInputValue] = useState("");
  const [inputImageValue, setInputImageValue] = useState(null);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const date = new Date();
  const stompClient = useRef(null);
  const messagesEndRef = useRef(null);

  // 입력 필드 변경 핸들러
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // 이미지 파일 선택 핸들러
  const handleInputImageChange = (event) => {
    setInputImageValue(event.target.files[0]);
  };

  // 웹소켓 연결
  const connect = () => {
    const socket = new WebSocket(`ws://${process.env.REACT_APP_RESTAPI_IP}:8080/ws`);
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect({}, () => {
      stompClient.current.subscribe(`/sub/chatroom/${populationCode}`, (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    });
  };

  // 웹소켓 연결 해제
  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.disconnect();
    }
  };

  // 메시지 가져오기
  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/chat/${populationCode}`);
      const result = await response.json();
      setMessages(result.data || []);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  // 이미지 업로드
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await fetch(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/chat/upload/${populationCode}`, {
        method: "POST",
        body: formData,
      });
      const imageUrl = await response.json();
      return imageUrl.data;
    } catch (error) {
      console.error("Image upload failed", error);
      return null;
    }
  };

  // 메시지 전송
  const sendMessage = async () => {
    if (stompClient.current) {
      let type = "CHAT";
      let content = inputValue;

      if (inputImageValue) {
        const imageUrl = await uploadImage(inputImageValue);
        if (imageUrl) {
          content = imageUrl;
          type = "IMAGE";
        } else {
          alert("이미지 업로드에 실패했습니다.");
          return;
        }
      }

      const body = {
        chatroomCode: populationCode,
        memberCode: memberInfo.memberCode, // 사용자 코드 또는 이름
        memberName: memberInfo.memberName,
        messageContent: content,
        messageSentAt: format(date, "yyyy-MM-dd HH:mm:ss"),
        type,
      };

      stompClient.current.send(`/pub/message`, {}, JSON.stringify(body));
      setInputValue("");
      setInputImageValue(null);
    }
  };

  // 엔터 키 이벤트 핸들러
  const onKeyPressHandler = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  // 메시지가 변경될 때마다 자동 스크롤
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // 초기 설정
  useEffect(() => {
    connect();
    fetchMessages();

    return () => disconnect(); // 컴포넌트 언마운트 시 웹소켓 연결 해제
  }, []);

  // 프로필 보기 팝업 열기
  const handleProfileClick = (member) => {
    setSelectedMember(member);
    setShowProfilePopup(true);
  };

  // 프로필 팝업 닫기
  const handleCloseProfilePopup = () => {
    setShowProfilePopup(false);
    setSelectedMember(null);
  };

  return (
    <div className="chat-container">
      {/* 왼쪽 이미지 섹션 */}
      <div className="chat-left">
        <img
          src={`http://${process.env.REACT_APP_RESTAPI_IP}:8080/hot-air-balloon.jpg`}
          alt="chat room image"
          className="left-image"
        />
      </div>
      {/* 채팅창 내용 */}
      <div className="chat-right">
        <div className="messages-section">
          {messages.length > 0 ? (
            messages.map((item, index) => (
              <div
                key={index}
                className={`message ${item.type === "IMAGE" ? "image-message" : "text-message"}`}
              >
                {item.type === "IMAGE" ? (
                  <div>
                    <span
                      style={{ fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => handleProfileClick(item)} // 이름 클릭 시 프로필 팝업 띄우기
                    >
                      {item.memberName + " " + item.messageSentAt.slice(0, 16)}
                    </span>
                    <img
                      src={`http://${process.env.REACT_APP_RESTAPI_IP}:8080/${item.messageContent}`}
                      alt="Chat Image"
                      className="message-image"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div>
                    <span
                      style={{ fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => handleProfileClick(item)} // 이름 클릭 시 프로필 팝업 띄우기
                    >
                      {item.memberName + " " + item.messageSentAt.slice(0, 16)}
                    </span>
                    <br/>
                    <span>{item.messageContent}</span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="no-message">메시지를 보내면 대화가 시작됩니다!</p>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 입력 필드 섹션 */}
        <div className="input-section">
          <button
            onClick={() => document.querySelector("input[type='file']").click()}
            className="image-plus-button"
          >
            +
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={onKeyPressHandler}
            placeholder="메시지를 입력하세요"
            className="input-field"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleInputImageChange}
            className="image-input"
          />
          <button onClick={sendMessage} className="send-button">
            보내기
          </button>
        </div>
      </div>

      {/* 프로필 팝업 표시 */}
      {showProfilePopup && selectedMember && (
        <ProfilePopup member={selectedMember} onClose={handleCloseProfilePopup} />
      )}
    </div>
  );
}