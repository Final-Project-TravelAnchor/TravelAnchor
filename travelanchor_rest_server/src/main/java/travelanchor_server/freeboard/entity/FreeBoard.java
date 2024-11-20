package travelanchor_server.freeboard.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "tbl_free_board")
public class FreeBoard {

    @Id
    @Column(name = "free_board_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int freeBoardCode;

    @Column(name = "free_board_category_code")
    private int freeBoardCategoryCode;

    @Column(name = "free_board_title")
    private String freeBoardTitle;

    @Column(name = "free_board_content")
    private String freeBoardContent;

    @Column(name = "free_board_created_at")
    private Date freeBoardCreatedAt;

    @Column(name = "member_code")
    private Integer memberCode;

    @Column(name = "free_board_isdeleted")
    private String freeBoardIsdeleted;

    public FreeBoard() {
    }

    public FreeBoard(int freeBoardCode, int freeBoardCategoryCode, String freeBoardTitle, String freeBoardContent, Date freeBoardCreatedAt, Integer memberCode, String freeBoardIsdeleted) {
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
