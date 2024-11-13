package travelanchor_server.member.dto;

import org.aspectj.weaver.patterns.Declare;

import java.util.Date;

public class DeclareDTO {

    private int declareCode;
    private int memberCode;
    private Date declareCreatedAt;
    private String declareContent;

    public DeclareDTO() {}

    public DeclareDTO(int declareCode, int memberCode, Date declareCreatedAt, String declareContent) {
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
        return "DeclareDTO{" +
                "declareCode=" + declareCode +
                ", memberCode=" + memberCode +
                ", declareCreatedAt=" + declareCreatedAt +
                ", declareContent='" + declareContent + '\'' +
                '}';
    }
}
