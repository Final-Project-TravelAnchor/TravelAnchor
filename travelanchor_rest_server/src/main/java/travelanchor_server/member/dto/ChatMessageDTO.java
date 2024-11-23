package travelanchor_server.member.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

public class ChatMessageDTO {

    private int messageCode;
    private int chatroomCode;
    private int memberCode;
    private String memberName;
    private String messageContent;
    private String messageSentAt;

    private String type;

    public ChatMessageDTO() {}

    public ChatMessageDTO(int messageCode, int chatroomCode, int memberCode, String memberName, String messageContent, String messageSentAt, String type) {
        this.messageCode = messageCode;
        this.chatroomCode = chatroomCode;
        this.memberCode = memberCode;
        this.memberName = memberName;
        this.messageContent = messageContent;
        this.messageSentAt = messageSentAt;
        this.type = type;
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public int getMessageCode() {
        return messageCode;
    }

    public void setMessageCode(int messageCode) {
        this.messageCode = messageCode;
    }

    public int getChatroomCode() {
        return chatroomCode;
    }

    public void setChatroomCode(int chatroomCode) {
        this.chatroomCode = chatroomCode;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }

    public String getMessageContent() {
        return messageContent;
    }

    public void setMessageContent(String messageContent) {
        this.messageContent = messageContent;
    }

    public String getMessageSentAt() {
        return messageSentAt;
    }

    public void setMessageSentAt(String messageSentAt) {
        this.messageSentAt = messageSentAt;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "ChatMessageDTO{" +
                "messageCode=" + messageCode +
                ", chatroomCode=" + chatroomCode +
                ", memberCode=" + memberCode +
                ", memberName='" + memberName + '\'' +
                ", messageContent='" + messageContent + '\'' +
                ", messageSentAt='" + messageSentAt + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}
