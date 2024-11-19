package travelanchor_server.member.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

public class ChatMessageDTO {

    private int messageCode;
    private int chatroomCode;
    private int memberCode;
    private String messageContent;
    private String messageSentAt;

    public ChatMessageDTO() {}

    public ChatMessageDTO(int messageCode, int chatroomCode, int memberCode, String messageContent, String messageSentAt) {
        this.messageCode = messageCode;
        this.chatroomCode = chatroomCode;
        this.memberCode = memberCode;
        this.messageContent = messageContent;
        this.messageSentAt = messageSentAt;
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

    @Override
    public String toString() {
        return "ChatMessageDTO{" +
                "messageCode=" + messageCode +
                ", chatroomCode=" + chatroomCode +
                ", memberCode=" + memberCode +
                ", messageContent='" + messageContent + '\'' +
                ", messageSentAt=" + messageSentAt +
                '}';
    }
}
