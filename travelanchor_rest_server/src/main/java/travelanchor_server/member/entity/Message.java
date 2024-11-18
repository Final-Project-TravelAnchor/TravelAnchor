package travelanchor_server.member.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.Columns;

import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_message")
public class Message {

    @Id
    @Column(name = "message_code")
    private int messageCode;

    @Column(name = "chatroom_code")
    private int chatroomCode;

    @Column(name = "member_code")
    private int memberCode;

    @Column(name = "message_content")
    private String messageContent;

    @Column(name = "message_sent_at")
    private LocalDateTime messageSendAt;


    public Message(int messageCode, int chatroomCode, int memberCode, String messageContent, LocalDateTime messageSendAt) {
        this.messageCode = messageCode;
        this.chatroomCode = chatroomCode;
        this.memberCode = memberCode;
        this.messageContent = messageContent;
        this.messageSendAt = messageSendAt;
    }

    public Message() {

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

    public LocalDateTime getMessageSendAt() {
        return messageSendAt;
    }

    public void setMessageSendAt(LocalDateTime messageSendAt) {
        this.messageSendAt = messageSendAt;
    }

    @Override
    public String toString() {
        return "Message{" +
                "messageCode=" + messageCode +
                ", chatroomCode=" + chatroomCode +
                ", memberCode=" + memberCode +
                ", messageContent='" + messageContent + '\'' +
                ", messageSendAt=" + messageSendAt +
                '}';
    }
}
