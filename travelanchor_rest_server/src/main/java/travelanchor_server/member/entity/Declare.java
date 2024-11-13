package travelanchor_server.member.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.Date;

@Entity
@Table(name = "tbl_member_declare")
public class Declare {

    @Id
    @Column(name = "declare_code")
    private int declareCode;

    @Column(name = "member_code")
    private int memberCode;

    @Column(name = "declare_created_at")
    private Date declareCreatedAt;

    @Column(name = "declare_content")
    private String declareContent;

    public Declare() {}

    public Declare(int declareCode, int memberCode, Date declareCreatedAt, String declareContent) {
        this.declareCode = declareCode;
        this.memberCode = memberCode;
        this.declareCreatedAt = declareCreatedAt;
        this.declareContent = declareContent;
    }

    public int getDeclareCode() {
        return declareCode;
    }

    public void setDeclareCode(int declareCode) {
        this.declareCode = declareCode;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }

    public Date getDeclareCreatedAt() {
        return declareCreatedAt;
    }

    public void setDeclareCreatedAt(Date declareCreatedAt) {
        this.declareCreatedAt = declareCreatedAt;
    }

    public String getDeclareContent() {
        return declareContent;
    }

    public void setDeclareContent(String declareContent) {
        this.declareContent = declareContent;
    }

    @Override
    public String toString() {
        return "Declare{" +
                "declareCode=" + declareCode +
                ", memberCode=" + memberCode +
                ", declareCreatedAt=" + declareCreatedAt +
                ", declareContent='" + declareContent + '\'' +
                '}';
    }
}
