package travelanchor_server.freeboard.dto;

import java.util.Date;

public class FreeBoardDTO {

    private int freeBoardCode;
    private int freeBoardCategoryCode;
    private String freeBoardTitle;
    private String freeBoardContent;
    private Date freeBoardCreatedAt;
    private Integer memberCode;
    private String freeBoardIsdeleted;

    public FreeBoardDTO() {
    }

    public FreeBoardDTO(int freeBoardCode, int freeBoardCategoryCode, String freeBoardTitle, String freeBoardContent, Date freeBoardCreatedAt, Integer memberCode, String freeBoardIsdeleted) {
        this.freeBoardCode = freeBoardCode;
        this.freeBoardCategoryCode = freeBoardCategoryCode;
        this.freeBoardTitle = freeBoardTitle;
        this.freeBoardContent = freeBoardContent;
        this.freeBoardCreatedAt = freeBoardCreatedAt;
        this.memberCode = memberCode;
        this.freeBoardIsdeleted = freeBoardIsdeleted;
    }

    public int getFreeBoardCode() {
        return freeBoardCode;
    }

    public void setFreeBoardCode(int freeBoardCode) {
        this.freeBoardCode = freeBoardCode;
    }

    public int getFreeBoardCategoryCode() {
        return freeBoardCategoryCode;
    }

    public void setFreeBoardCategoryCode(int freeBoardCategoryCode) {
        this.freeBoardCategoryCode = freeBoardCategoryCode;
    }

    public String getFreeBoardTitle() {
        return freeBoardTitle;
    }

    public void setFreeBoardTitle(String freeBoardTitle) {
        this.freeBoardTitle = freeBoardTitle;
    }

    public String getFreeBoardContent() {
        return freeBoardContent;
    }

    public void setFreeBoardContent(String freeBoardContent) {
        this.freeBoardContent = freeBoardContent;
    }

    public Date getFreeBoardCreatedAt() {
        return freeBoardCreatedAt;
    }

    public void setFreeBoardCreatedAt(Date freeBoardCreatedAt) {
        this.freeBoardCreatedAt = freeBoardCreatedAt;
    }

    public Integer getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(Integer memberCode) {
        this.memberCode = memberCode;
    }

    public String getFreeBoardIsdeleted() {
        return freeBoardIsdeleted;
    }

    public void setFreeBoardIsdeleted(String freeBoardIsdeleted) {
        this.freeBoardIsdeleted = freeBoardIsdeleted;
    }

    @Override
    public String toString() {
        return "FreeBoardDTO{" +
                "freeBoardCode=" + freeBoardCode +
                ", freeBoardCategoryCode=" + freeBoardCategoryCode +
                ", freeBoardTitle='" + freeBoardTitle + '\'' +
                ", freeBoardContent='" + freeBoardContent + '\'' +
                ", freeBoardCreatedAt=" + freeBoardCreatedAt +
                ", memberCode=" + memberCode +
                ", freeBoardIsdeleted='" + freeBoardIsdeleted + '\'' +
                '}';
    }
}
