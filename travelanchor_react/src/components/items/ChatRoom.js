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
  const [messages, setMessages] = useState([]);
  // 서버의 사진 url을 저장할 변수
  const [ imageUrl, setImageUrl] = useState();
   // 사용자 입력을 저장할 변수
  const [inputValue, setInputValue] = useState('');
  const [inputImageValue, setInputImageValue] = useState('');
   // 입력 필드에 변화가 있을 때마다 inputValue를 업데이트
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputImageChange = (event) => {
    console.log(event.target.files[0]);
    setInputImageValue(event.target.files[0]);
  };


  // console.log("message: " + messages);

   // 웹소켓 연결 설정
  const connect = () => {
    const socket = new WebSocket(`ws://${process.env.REACT_APP_RESTAPI_IP}:8080/ws`);
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, () => {
    stompClient.current.subscribe(`/sub/chatroom/${populationCode}`, (message) => {
    const newMessage = JSON.parse(message.body);

    console.log("newMessage : ", newMessage);

    // if(newMessage.type === "IMAGE") {
    // } else {
        // setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessages((prevMessages) => {
          console.log("prevMessages : ", prevMessages);
          console.log("newMessage : ", newMessage);
          return [...prevMessages, newMessage];
        });
    // }

    // if(newMessage.type === "IMAGE") {

    //   const imageUrl = newMessage.messageContent;

    //   // const isValidImageUrl = (imageUrl) => {
    //   //   try {
    //   //     const parsedUrl = new URL(imageUrl);
    //   //     return (
    //   //       (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") && 
    //   //       /\.(jpeg|jpg|png|gif|bmp|webp|svg)$/.test(parsedUrl.pathname)
    //   //     );
    //   //   } catch (error) {
    //   //     console.error("Invalid image URL:", imageUrl);
    //   //     return false;
    //   //   }
    //   // };

    //   console.log("Image : " , imageUrl);

    //   // if(isValidImageUrl(imageUrl)) {
    //   if(imageUrl) {
    //     // setImageUrl((prevMessages) => {
    //     //   console.log("prevMessages : ", prevMessages);
    //     //   console.log("imageUrl : ", imageUrl);
    //     //   console.log("newMeesage : ", newMessage);
    //     //   return [...prevMessages, newMessage];
    //     // });
    //     setImageUrl(imageUrl);
    //   } else {
    //     console.error("Invalid image URL:", imageUrl);
    //   }
    // } else {
    //   setMessages((prevMessages) => [...prevMessages, newMessage]);
    // }
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
    console.log("useEffect");
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

  const uploadImage = async (inputImageValue) => {
    console.log(`Uploading image : `, inputImageValue);
    const formData = new FormData();
    formData.append('file', inputImageValue);
  
    try {
      const url = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/chat/upload/${populationCode}`;
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      const imageUrl = await response.json(); // 업로드된 이미지 URL 반환
      // console.log("imageUrl : " , imageUrl.data);
      return imageUrl;
    } catch (error) {
      console.error('Image upload failed', error);
      return null;
    }
  };

  const sendImageMessage = async (inputImageValue) => {
    if (stompClient.current && inputImageValue) {
      console.log("inputImageValue : " , inputImageValue);
      const imageUrl = await uploadImage(inputImageValue);

      console.log("imageUrl : " + imageUrl.data);

      if (imageUrl) {
        const body = {
          chatroomCode: populationCode,
          name: "테스트1",
          messageContent: imageUrl.data, // 이미지 URL 전송
          messageSentAt: format(date, 'yyyy-MM-dd HH:mm:ss').toString(),
          type: "IMAGE", // 메시지 타입을 설정
        };

        // setMessages((prevMessages) => [...prevMessages, body]);
        stompClient.current.send(`/pub/message`, {}, JSON.stringify(body));
      }
    }
  };

  const sendImageMessage1 = async (imageFile) => {
    if (stompClient.current && imageFile) {

      const formData = new FormData();
      const chatData = {
        chatroomCode: populationCode,
        name: "테스트1",
        messageContent: imageFile.lastModified + "_" + imageFile.name, // 이미지 URL 전송
        messageSentAt : format(date, 'yyyy-MM-dd HH:mm:ss').toString(),
        type: "IMAGE", // 메시지 타입을 설정
      };

      formData.append("file", imageFile);
      // formData.append('data', new Blob([JSON.stringify(chatData)], { type: "application/json" }));

      try{
        const url = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/chat/upload/${populationCode}`
        const response = await fetch(url, {
          method: 'POST',
          body: formData,
        });

        console.log("response : ", response);
        const imageUrl = await response.text(); // 업로드된 이미지 URL 반환
        console.log("ImageUrl : ", imageUrl);
        // stompClient.current.send(`/pub/message`, {}, JSON.stringify(body));
      } catch (error) {
        console.error('Image upload failed', error);
        return null;
      }
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
      <input
        type="file"
        accept="image/*"
        onChange={
          // if (e.target.files.length > 0) {
          //   console.log("Event : ", e);
          //   sendImageMessage(e.target.files[0]);
          // }
          handleInputImageChange
        }
      />
      <button onClick={() => sendImageMessage(inputImageValue)}>업로드</button>
        </div>
        {/* 메시지 리스트 출력 */}
        {messages.length > 0 && messages.map((item, index) => (
          <div key={index} className="list-item">
            {
            //  const staticImageUrl = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/${encodeURIComponent(item.messageContent)}`;
              item.type === "IMAGE" ? (
              <img 
                src={`http://${process.env.REACT_APP_RESTAPI_IP}:8080/${item.messageContent}`}
                alt="Chat Image" 
                style={{ maxWidth: '30%', maxHeight: '100px' }} 
                loading="lazy"
              />
            ) : (
              <span>{item.messageContent}</span>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}