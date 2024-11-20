package travelanchor_server.comment.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "tbl_comment")
public class Comment {

    @Id
    @Column(name = "comment_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentCode;

    @Column(name = "free_board_code")
    private int freeBoardCode;

    @Column(name = "member_code")
    private int memberCode;

    @Column(name = "comment_content")
    private String commentContent;

    @Column(name = "comment_created_at")
    private Date commentCreatedAt;

    public Comment() {
    }

    public Comment(int commentCode, int freeBoardCode, int memberCode, String commentContent, Date commentCreatedAt) {
        this.commentCode = commentCode;
        this.freeBoardCode = freeBoardCode;
        this.memberCode = memberCode;
        this.commentContent = commentContent;
        this.commentCreatedAt = commentCreatedAt;
    }

    public int getCommentCode() {
        return commentCode;
    }

    public void setCommentCode(int commentCode) {
        this.commentCode = commentCode;
    }

    public int getFreeBoardCode() {
        return freeBoardCode;
    }

    public void setFreeBoardCode(int freeBoardCode) {
        this.freeBoardCode = freeBoardCode;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }

    public String getCommentContent() {
        return commentContent;
    }

    public void setCommentContent(String commentContent) {
        this.commentContent = commentContent;
    }

    public Date getCommentCreatedAt() {
        return commentCreatedAt;
    }

    public void setCommentCreatedAt(Date commentCreatedAt) {
        this.commentCreatedAt = commentCreatedAt;
    }

    @Override
    public String toString() {
        return "CommentDTO{" +
                "commentCode=" + commentCode +
                ", freeBoardCode=" + freeBoardCode +
                ", memberCode=" + memberCode +
                ", commentContent='" + commentContent + '\'' +
                ", commentCreatedAt=" + commentCreatedAt +
                '}';
    }
}
