// import { useState } from "react";
// import './App.css';
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Stomp } from "@stomp/stompjs";
import { useParams } from "react-router-dom";
import { format } from 'date-fns';

export default function ChatRoom(){

  const { populationCode } = useParams();
  const date = new Date();

    const stompClient = useRef(null);
  // 채팅 내용들을 저장할 변수
  const [messages, setMessages] = new useState([]);
   // 사용자 입력을 저장할 변수
  const [inputValue, setInputValue] = useState('');
   // 입력 필드에 변화가 있을 때마다 inputValue를 업데이트
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };


  // console.log("message: " + messages);

   // 웹소켓 연결 설정
  const connect = () => {
    const socket = new WebSocket(`ws://${process.env.REACT_APP_RESTAPI_IP}:8080/ws`);
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, () => {
    stompClient.current.subscribe(`/sub/chatroom/${populationCode}`, (message) => {
    const newMessage = JSON.parse(message.body);

    console.log(newMessage);

    if(newMessage.type === "image") {

    } else {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
      });
    });
  };
  // 웹소켓 연결 해제
  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.disconnect();
    }
  };
  useEffect(() => {
    connect();
    fetchMessages();

    // 컴포넌트 언마운트 시 웹소켓 연결 해제
    return () => disconnect();
  }, []);

  // 기존 채팅 메시지를 서버로부터 가져오는 함수
  const fetchMessages = async () => {
    const result = await fetch(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/chat/${populationCode}`)
      .then(response => response.json())
      .catch(error => console.error('Failed to fetch messages:', error));

    // console.log("REsult: " , result);

    setMessages(result.data);
    
  };

  //메세지 전송
  const sendMessage = () => {
    if (stompClient.current && inputValue) {
      const body = {
        chatroomCode : populationCode,
        name : "테스트1", // 사용자 코드 또는 고유번호 입력하면 될 듯
        messageContent : inputValue,
        // populationCode : populationCode,
        messageSentAt : format(date, 'yyyy-MM-dd HH:mm:ss').toString(),
        type : "CHAT",
      };
      stompClient.current.send(`/pub/message`, {}, JSON.stringify(body));
      setInputValue('');
    }
  };

  const [ selectedFile, setSelectedFile ] = useState(null);

  const fileChange = (e) => {

    console.log("file change : ", e.target);
    setSelectedFile(e.target.files[0]);
    // console.log("File Change: ", e.target.files);
    // const file = e.target.files[0];
    // const formData = new FormData();
    // formData.append('file', file);

    // const config = {
    //   headers: {
    //     'Content-Type':'multipart/form-data'
    //   }
    // };

    // axios.post(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/upload/${populationCode}`, formData, config)
    //  .then(response => {
    //     console.log("File uploaded successfully: ", response);
    //   })
    //  .catch(error => {
    //     console.error("Error while uploading file: ", error);
    //   });
  };

  const fileUpload = async () => {
    if (!selectedFile) {
      alert("파일을 선택하세요!");
      return;
    }
  
    // FormData 객체 생성 및 파일 추가
    const formData = new FormData();
    formData.append("image", selectedFile);
  
    try {
      // 서버에 파일 전송
      const response = await fetch(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/chat/image`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`파일 업로드 실패: ${response.statusText}`);
      }
  
      const data = await response.json(); // JSON 응답 처리
      console.log("서버 응답:", data);
    } catch (error) {
      console.error("파일 업로드 중 오류 발생:", error.message);
    }
  };
  let debounceTimer;

  const onKeyPressHandler = (e) => {
    if (e.key === 'Enter') {
      // 엔터 키를 눌렀을 때 실행할 동작
      // console.log('Enter key pressed');
      // 원하는 전송 동작을 여기서 수행
      sendMessage(); // 예시로 메시지 전송 함수 호출

      debounceTimer = setTimeout(() => {
        debounceTimer = null; // 타이머 리셋
      }, 300);
    }
  };

  return (
    <div>
      <ul>
        <div>
          {/* 입력 필드 */}
       <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={onKeyPressHandler}
      />
      {/* 메시지 전송, 메시지 리스트에 추가 */}
      <button onClick={sendMessage}>입력</button>
      <input type="file" accept="image/*" onChange={fileChange} />
      <button onClick={fileUpload}>업로드</button>
        </div>
        {/* 메시지 리스트 출력 */}
        {messages.length > 0 && messages.map((item, index) => (
          <div key={index} className="list-item">{item.messageContent}</div>
        ))}
      </ul>
    </div>
  );
}