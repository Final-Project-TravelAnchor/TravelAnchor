package travelanchor_server.member.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.Columns;

import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_message")
public class Message {

    @Id
    @Column(name = "message_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int messageCode;

    @Column(name = "chatroom_code")
    private int chatroomCode;

    @Column(name = "member_code")
    private int memberCode;

    @Column(name = "member_name")
    private String memberName;

    @Column(name = "message_content")
    private String messageContent;

    @Column(name = "message_sent_at")
    private String messageSentAt;

    @Column(name = "message_type")
    private String type;

    public Message(int messageCode, int chatroomCode, int memberCode, String memberName, String messageContent, String messageSentAt, String type) {
        this.messageCode = messageCode;
        this.chatroomCode = chatroomCode;
        this.memberCode = memberCode;
        this.memberName = memberName;
        this.messageContent = messageContent;
        this.messageSentAt = messageSentAt;
        this.type = type;
    }

    public Message() {

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
        return "Message{" +
                "messageCode=" + messageCode +
                ", chatroomCode=" + chatroomCode +
                ", memberCode=" + memberCode +
                ", memberName=" + memberName +
                ", messageContent='" + messageContent + '\'' +
                ", messageSentAt='" + messageSentAt + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}
